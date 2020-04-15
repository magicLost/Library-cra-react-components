import { IFormModel, IFeedbackModel } from "./interfaces";
import {
  IValidatorDesc,
  IFormElementDesc,
  TFormElementsDescs,
} from "../../component/Form/Form";
import {
  IFormElementState,
  IFormState,
  TFormElementsState,
} from "../../hooks/Form/form";

export interface IFormController<T> {
  formElements: TFormElementsDescs<T>;
  model: IFormModel<T>;

  setFormState: React.Dispatch<
    ((prevState: IFormState<T>) => IFormState<T>) | IFormState<T>
  > | null;

  onClear: (event: any) => void | undefined;
  onSubmit: (event: any) => void | undefined;
  onChange: (event: any) => void | undefined;
}

export abstract class AFormController<T> implements IFormController<T> {
  formElements: TFormElementsDescs<T>;
  model: IFormModel<T>;

  setFormState: React.Dispatch<
    ((prevState: IFormState<T>) => IFormState<T>) | IFormState<T>
  > | null = null;

  constructor(formElements: TFormElementsDescs<T>, model: IFormModel<T>) {
    this.formElements = formElements;
    this.model = model;
  }

  abstract onClear: (event: any) => void | undefined;
  abstract onSubmit: (event: any) => void | undefined;
  abstract onChange: (event: any) => void | undefined;

  protected abstract onSubmitHandler(): void | undefined;
  protected onChangeHandler(target: any): void | undefined {
    if (this.setFormState === null) throw new Error("No setFormState...");

    this.setFormState((prevState: IFormState<T>) => {
      const newFormElementsState = this.model.validateOnChangeAndReturnModifyState(
        target,
        this.formElements,
        prevState.formElementsState
      );

      return {
        formError: "",
        formMessage: "",
        formElementsState: newFormElementsState,
      };
    });
  }

  protected onClearHandler(): void | undefined {
    if (this.setFormState === null) throw new Error("No setFormState...");

    this.setFormState((prevState: IFormState<T>) => {
      const formElementsState = this.model.getFormElementsInitState(
        this.formElements
      );

      return {
        formError: "",
        formMessage: "",
        formElementsState: formElementsState,
      };
    });
  }
}

export class FormController<T> extends AFormController<T> {
  constructor(formElements: TFormElementsDescs<T>, model: IFormModel<T>) {
    super(formElements, model);
  }

  onClear = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    //console.log("onClear");

    this.onClearHandler();
  };

  onChange = (event: any) => {
    //event.preventDefault();
    event.stopPropagation();

    //console.log("onChange", event.target);

    this.onChangeHandler(event.target);
  };

  onSubmit = (event: any): void | undefined => {
    event.preventDefault();
    event.stopPropagation();

    //console.log("Submit");

    this.onSubmitHandler();
  };

  protected onSubmitHandler(): void | undefined {
    if (this.setFormState === null) throw new Error("No setFormState...");

    this.setFormState((prevState: IFormState<T>) => {
      if (
        this.model.hasInputsError(
          prevState.formElementsState,
          prevState.formError
        )
      )
        return prevState;

      const formError = this.model.validateOnSubmit(
        prevState.formElementsState
      );

      if (!formError) {
        const formData = this.model.getFormData(prevState.formElementsState);

        const message = this.model.calcAndGetFormMessage(formData);

        return {
          formError: "",
          formMessage: message,
          formElementsState: prevState.formElementsState,
        };
      } else {
        return {
          formError: formError,
          formMessage: "",
          formElementsState: prevState.formElementsState,
        };
      }
    });
  }
}
