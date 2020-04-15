import {
  IValidatorDesc,
  IFormElementDesc,
  TFormElementsDescs,
} from "../../component/Form/Form";
import {
  IFormElementState,
  TFormElementsState,
  IFormState,
} from "../../hooks/Form/form";
import { IFormValidatorChain } from "./../../helper/Validation/FormValidatorChain";

export type ActionCreator<T, U> = (state: T, action: U) => T;

export interface IHiddenField {
  name: string;
  value: string;
}

export interface IFormModel<T> {
  validatorChain: IFormValidatorChain;

  validateOnSubmit(stateFormElements: TFormElementsState<T>): string;

  getFormData(
    stateFormElements: TFormElementsState<T>,
    hiddenFields?: IHiddenField[]
  ): FormData;

  validateOnChangeAndReturnModifyState(
    target: any,
    formElements: TFormElementsDescs<T>,
    stateFormElements: TFormElementsState<T>
  ): TFormElementsState<T>;

  hasInputsError(
    stateFormElements: TFormElementsState<T>,
    formError: string
  ): boolean;

  getFormElementsInitState(
    formElements: TFormElementsDescs<T>
  ): TFormElementsState<T>;

  calcAndGetFormMessage(formData: FormData): string;

  /* getValidatorsDesc(
    name: string,
    formElements: TFormElementsDescs
  ): IValidatorDesc[] | undefined; */
}

export interface IFeedbackModel<T> extends IFormModel<T> {
  createToken(stateFormElements: TFormElementsState<T>): string;
  calcDateAndToken(): { date: string; token: string };
}
