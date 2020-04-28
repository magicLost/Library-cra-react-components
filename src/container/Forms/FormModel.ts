import { IHiddenField, IFormModel } from "./interfaces";
import { IFormElementState, TFormElementsState } from "../../hooks/Form/form";
import {
  IValidatorDesc,
  IFormElementDesc,
  TFormElementsDescs,
} from "../../component/Form/Form";
import { IFormValidatorChain } from "./../../helper/Validation/FormValidatorChain";
//import { ELEMENT_TYPE } from "../../component/Form/Form";
//import {ELEMENT_TYPE} from "./../../component/Form/Form";

export default abstract class FormModel<T> implements IFormModel<T> {
  validatorChain: IFormValidatorChain;
  getToken?: () => string;

  constructor(validatorChain: IFormValidatorChain, getToken: () => string) {
    this.validatorChain = validatorChain;
    this.getToken = getToken;
  }

  abstract calcAndGetFormMessage(formData: FormData): string;

  abstract validateOnSubmit(stateFormElements: TFormElementsState<T>): string;

  getFormElementsInitState(
    formElements: TFormElementsDescs<T>
  ): TFormElementsState<T> {
    const formElementsState: TFormElementsState<T> = new Map();

    formElements.forEach((elemDesc, key, map) => {
      switch (elemDesc.elementType) {
        case "INPUT":
          formElementsState.set(key, { value: "", errors: [] });
          break;
        case "TEXTAREA":
          formElementsState.set(key, { value: "", errors: [] });
          break;
        case "SELECT":
          formElementsState.set(key, {
            value: elemDesc.value,
            errors: [],
          });
          break;
        case "FILE_INPUT":
          formElementsState.set(key, { value: "", errors: [] });
          break;
        case "CHECKBOX":
          formElementsState.set(key, {
            value: elemDesc.value,
            checked: elemDesc.checked,
            errors: [],
          });
          break;

        default:
          throw new Error(`No implementation for type ${elemDesc.elementType}`);
      }
    });

    return formElementsState;
  }

  getFormData(
    stateFormElements: TFormElementsState<T>,
    hiddenFields: IHiddenField[]
  ): FormData {
    const formData = new FormData();

    /* for (let element of stateFormElements) {
      let value = element.file !== undefined ? element.file : element.value;
      formData.append(element.name, value);
    } */

    stateFormElements.forEach((elemState, key, map) => {
      console.log("stateFormElements", elemState);
      let value: File | string = "";

      if (elemState.file !== undefined) {
        value = elemState.file;
      } else if (elemState.checked !== undefined) {
        value = elemState.checked === true ? elemState.value : "";
        console.log("value", value, elemState);
      } else {
        value = elemState.value;
      }

      console.log("FORM DATA APPEND", key, value);
      formData.append(key as any, value);
    });

    if (hiddenFields !== undefined && hiddenFields.length > 0) {
      for (let field of hiddenFields) {
        formData.append(field.name, field.value);
      }
    }

    return formData;
  }

  hasInputsError(
    stateFormElements: TFormElementsState<T>,
    formError: string
  ): boolean {
    // if(formError !== '')
    //  return true;

    /* for (let element of stateFormElements) {
      if (element.errors.length !== 0) return true;
    } */
    let isError = false;

    stateFormElements.forEach((elemState, key, map) => {
      if (elemState.errors.length !== 0) isError = true;
    });

    return isError;
  }

  //validators: IValidatorDesc[] | undefined
  validateOnChangeAndReturnModifyState(
    target: any,
    formElements: TFormElementsDescs<T>,
    stateFormElements: TFormElementsState<T>
  ): TFormElementsState<T> {
    if (target.name === undefined || target.value === undefined)
      throw new Error("No name or value on target");

    //console.log("validateOnChange", target.type, target.checked);

    let formElementStateDesc: IFormElementState = {
      value: "",
      errors: [],
    };

    switch (target.type) {
      case "select":
        formElementStateDesc = this.selectValidation(target);
        break;
      case "checkbox":
        formElementStateDesc = this.checkboxValidation(target);
        break;
      case "file":
        formElementStateDesc = this.inputFileValidation(target, formElements);
        break;

      default:
        formElementStateDesc = this.inputValidation(target, formElements);
        break;
    }

    stateFormElements.set(target.name, formElementStateDesc);

    return new Map(stateFormElements);
  }

  protected checkboxValidation = (target: any): IFormElementState => {
    /* console.log("CHECKBOX_VALIDATION", {
      //name: target.name,
      value: target.value,
      checked: target.checked,
      errors: [],
    }); */
    return {
      //name: target.name,
      value: target.value,
      checked: target.checked,
      errors: [],
    };
  };

  protected selectValidation = (target: any): IFormElementState => {
    return {
      //name: target.name,
      value: target.value,
      errors: [],
    };
  };

  protected inputFileValidation = (
    target: any,
    formElements: TFormElementsDescs<T>
  ): IFormElementState => {
    const name = target.name;
    const value = target.value;
    const fileList: FileList = target.files;

    //create new data without errors
    const data: IFormElementState = {
      //name: name,
      value: value,
      file: fileList[0],
      errors: [],
    };

    //if value empty we return no error
    if (value === "") return data;

    return this.validateAndReturnDataWithErrors(formElements, data, name);
  };

  protected inputValidation = (
    target: any,
    formElements: TFormElementsDescs<T>
  ): IFormElementState => {
    const name = target.name;
    const value = target.value;

    //create new data without errors
    const data: IFormElementState = {
      //name: name,
      value: value,
      errors: [],
    };

    //if value empty we return no error
    if (value === "") return data;

    return this.validateAndReturnDataWithErrors(formElements, data, name);
  };

  protected validateAndReturnDataWithErrors = (
    formElements: TFormElementsDescs<T>,
    data: IFormElementState,
    name: T
  ): IFormElementState => {
    //let errors: string[] = [];

    let validators: IValidatorDesc[] | undefined = undefined;

    formElements.forEach((value, key, map) => {
      if (key === name) validators = value.validators;
    });

    if (validators !== undefined) {
      if (data.file) {
        if (!this.validatorChain.isValid(data.file, validators)) {
          data.errors = this.validatorChain.getErrorMessages();
        }
      } else {
        if (!this.validatorChain.isValid(data.value, validators)) {
          data.errors = this.validatorChain.getErrorMessages();
        }
      }
    }

    return data;
  };
}
