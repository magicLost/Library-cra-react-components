import React from "react";
import classes from "./Form.module.scss";
//import Button from "../UI/Button/Button";
import SubmitButton from "../FormElements/SubmitButton/SubmitButton";
import ResetButton from "../FormElements/ResetButton/ResetButton";

//import { TFormElementsDescs } from "../../data/feedback_forms_data";
//import { IFormElementState, TFormElementsState } from "../../hooks/Form/form";
//import { IFormController } from "./../../container/Forms/FormController";
import Input from "../FormElements/Input/Input";
import Textarea from "../FormElements/Textarea/Textarea";
import Checkbox from "../FormElements/Checkbox/Checkbox";
import Select, { Option } from "../FormElements/Select/Select";
import {
  VALIDATOR_TYPES,
  IFormValidatorOptions,
} from "../../helper/Validation/form_validators";

/* FORM ELEMENTS DESCRIPTION DECLARATION */

export interface IValidatorDesc {
  name: VALIDATOR_TYPES;
  options: IFormValidatorOptions;
}

export interface TElementAttrs {
  type?: string;
  id: string;
  placeholder?: string;
}

export interface IFormElementDesc {
  elementType: ELEMENT_TYPE;
  elementAttrs: TElementAttrs;
  selectOptions?: Option[];
  labelValue: string;
  validators?: IValidatorDesc[];
  value: string;
  checked?: boolean;
  resize?: boolean;
}

export type FORM_ELEMENTS = "NAME" | "PHONE" | "EMAIL" | "COMMENT" | "PHOTO";

export type TFormElementsDescs<T> = Map<T, IFormElementDesc>;

/* END  */

/* FORM ELEMENT STATE DECLARATION */

export interface IFormElementState {
  //name: FORM_ELEMENTS | CALC_PRICE_ELEMENTS_NAMES;
  value: string;
  errors: string[];
  file?: File;
  checked?: boolean;
}

export type TFormElementsState<T> = Map<T, IFormElementState>;

export type ELEMENT_TYPE =
  | "INPUT"
  | "TEXTAREA"
  | "FILE_INPUT"
  | "SELECT"
  | "CHECKBOX";

/* END */

interface FormProps<T> {
  formError: string;
  formMessage: string;
  onSubmit: (event: any) => void;
  onClear: (event: any) => void;
  onChange: (event: any) => void;
  elementsDescs: TFormElementsDescs<T>;
  formElementsState: TFormElementsState<T>;
  //children: {};

  submitButtonLabel: string;

  //isSuccess?: boolean;
  //onSuccess?: (event: {}) => void;
  isLoading?: boolean;
}

export function renderElements<T>(
  formElementsDescs: TFormElementsDescs<T>,
  formElementsState: TFormElementsState<T>,
  onChange: (event: any) => void,
  isLoading: boolean
) {
  const elements: JSX.Element[] = [];

  formElementsDescs.forEach((elemDesc, key, map) => {
    let state = undefined;
    switch (elemDesc.elementType) {
      case "INPUT":
        state = formElementsState.get(key) as IFormElementState;
        //console.log("FORM STATE", key, formElementsState);
        //console.log("STATE", state);

        elements.push(
          <Input
            key={classes.Test + key}
            elementAttrs={elemDesc.elementAttrs}
            disabled={isLoading}
            onChange={onChange}
            value={state.value}
            name={key as any}
            labelValue={elemDesc.labelValue}
            error={state.errors.length > 0 ? state.errors[0] : ""}
          />
        );
        break;
      case "TEXTAREA":
        state = formElementsState.get(key) as IFormElementState;

        elements.push(
          <Textarea
            key={classes.Test + key}
            elementAttrs={elemDesc.elementAttrs}
            disabled={isLoading}
            onChange={onChange}
            name={key as any}
            value={state.value}
            labelValue={elemDesc.labelValue}
            error={state.errors.length > 0 ? state.errors[0] : ""}
            isResize={true}
          />
        );
        break;
      case "SELECT":
        state = formElementsState.get(key) as IFormElementState;

        elements.push(
          <Select
            key={classes.Test + key}
            elementAttrs={elemDesc.elementAttrs}
            name={key as any}
            disabled={isLoading}
            options={elemDesc.selectOptions as Option[]}
            onChange={onChange}
            value={state.value}
            labelValue={elemDesc.labelValue}
          />
        );
        break;
      case "CHECKBOX":
        state = formElementsState.get(key) as IFormElementState;

        elements.push(
          <Checkbox
            key={classes.Test + key}
            elementAttrs={elemDesc.elementAttrs}
            name={key as any}
            disabled={isLoading}
            onChange={onChange}
            checked={state.checked as boolean}
            value={elemDesc.value}
            labelValue={elemDesc.labelValue}
          />
        );
        break;

      default:
        throw new Error(`No implementation for type ${elemDesc.elementType}`);
    }
  });

  return elements;
}

function Form<T>({
  elementsDescs,
  formElementsState,
  formError,
  formMessage,

  onSubmit,
  onClear,
  onChange,
  //children,
  submitButtonLabel = "Отправить",
  isLoading = false,
}: FormProps<T>) {
  /* const onKeyUp = (event: any) => {

  }; */

  const elements = renderElements<T>(
    elementsDescs,
    formElementsState,
    onChange,
    isLoading
  );

  console.log("RENDER Form", formMessage, formError, isLoading);
  return (
    <form
      action={"#"}
      className={classes.Form}
      onSubmit={onSubmit}
      onReset={onClear}
    >
      {elements}

      <div className={classes.Message}>
        {formError && (
          <div className={classes.FormError}>
            <p>{formError}</p>
          </div>
        )}

        {formMessage && (
          <div className={classes.FormMessage}>
            <p>{formMessage}</p>
          </div>
        )}
      </div>

      <div className={classes.Buttons}>
        <ResetButton
          label={"Очистить"}
          type={"OUTLINED"}
          style={{
            color: "rgba(0, 0, 0, 0.3)",
            borderColor: "rgba(0, 0, 0, 0.3)",
          }}
          disabled={isLoading}
        />

        <SubmitButton
          label={submitButtonLabel}
          type={"OUTLINED"}
          style={{
            color: "rgba(178, 243, 141, 0.85)",
            borderColor: "rgba(178, 243, 141, 0.85)",
          }}
          disabled={isLoading}
          isLoading={isLoading}
        />
      </div>
    </form>
  );
}

export default React.memo(Form);

/* import React, { useMemo } from "react";
import classes from "./Form.module.scss";
import Button from "../UI/Button/Button";

export type ELEMENT_TYPE =
  | "INPUT"
  | "TEXTAREA"
  | "FILE_INPUT"
  | "SELECT"
  | "CHECKBOX";

interface FormProps {
  formError: string;
  formMessage: string;
  onSubmit: (event: {}) => void;
  onClear: (event: {}) => void;
  children: {};

  submitButtonLabel: string;

  isSuccess?: boolean;
  onSuccess?: (event: {}) => void;
  isLoading?: boolean;
}

const Form = ({
  formError,
  formMessage,
  onSubmit,
  onClear,
  children,
  submitButtonLabel = "Отправить",
  isLoading = false,
  isSuccess = false,
  onSuccess = undefined
}: FormProps) => {
  return (
    <div className={classes.Wrapper}>
      <div className={classes.Form}>
        <form action={"#"} className={classes.FormElements} onSubmit={onSubmit}>
          {children}

          {formError && (
            <div className={classes.FormError}>
              <p>{formError}</p>
            </div>
          )}

          {formMessage && (
            <div className={classes.FormMessage}>
              <p>{formMessage}</p>
            </div>
          )}

          <div className={classes.Buttons}>
            {useMemo(
              () => (
                <Button
                  label={"Очистить"}
                  type={"OUTLINED"}
                  onClick={onClear}
                  style={{
                    color: "rgba(0, 0, 0, 0.3)",
                    borderColor: "rgba(0, 0, 0, 0.3)"
                  }}
                  disabled={isLoading}
                  isLoading={false}
                />
              ),
              [isLoading]
            )}

            {useMemo(() => {
              if (isSuccess) return null;

              return (
                <Button
                  label={submitButtonLabel}
                  type={"OUTLINED"}
                  onClick={onSubmit}
                  style={{
                    color: "rgba(178, 243, 141, 0.85)",
                    borderColor: "rgba(178, 243, 141, 0.85)"
                  }}
                  disabled={isLoading}
                  isLoading={isLoading}
                />
              );
            }, [isLoading, isSuccess])}

            {useMemo(() => {
              if (!isSuccess) return null;

              return (
                <Button
                  label={"Ок"}
                  type={"OUTLINED"}
                  onClick={onSuccess}
                  style={{
                    color: "rgba(178, 243, 141, 0.85)",
                    borderColor: "rgba(178, 243, 141, 0.85)"
                  }}
                  disabled={false}
                  isLoading={false}
                />
              );
            }, [isSuccess])}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
 */
