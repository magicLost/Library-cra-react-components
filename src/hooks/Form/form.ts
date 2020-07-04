import React, { useState, useRef } from "react";
//import axios from 'axios';
//import { inputChangeAC, clearStateAC, setFormErrorAC } from './formAC';
import { TFormElementsDescs } from "../../component/Form/Form";
//import { IFormElementDesc } from "../../data/form/feedback_forms_data";

import {
  IFormController,
  FormController,
} from "../../container/Forms/FormController";

import { TSendPostWithJsonResponse } from "../../container/Forms/FormRequestController";
import FormRequestController from "../../container/Forms/FormRequestController";
import { IFormModel } from "../../container/Forms/interfaces";

export interface IFormElementState {
  //name: FORM_ELEMENTS | CALC_PRICE_ELEMENTS_NAMES;
  value: string;
  errors: string[];
  file?: File;
  checked?: boolean;
}

export type TFormElementsState<T> = Map<T, IFormElementState>;

export interface IFormState<T> {
  //formController: IFormController,

  formError: string;
  formMessage: string;
  formElementsState: TFormElementsState<T>;
  isLoading?: boolean; //for compatibility with NFormRequestController
}

type useFormReturn<T> = {
  controller: IFormController<T>;

  formError: string;
  formMessage: string;
  formElementsState: TFormElementsState<T>;
  //setFormState: React.Dispatch<((prevState: IFormState) => IFormState) | IFormState> | null
};

//, formElementsStateInit: IFormElementState[]
export const useForm = <T>(
  formElements: TFormElementsDescs<T>,
  formModel: IFormModel<T>
): useFormReturn<T> => {
  const controllerRef: React.MutableRefObject<IFormController<
    T
  > | null> = useRef(null);

  const [formState, setFormState] = useState(
    (): IFormState<T> => {
      const controller = new FormController(formElements, formModel);

      const formElementsState = controller.model.getFormElementsInitState(
        formElements
      );

      controllerRef.current = controller;

      return {
        formError: "",
        formMessage: "",
        formElementsState: formElementsState,
      };
    }
  );

  if (controllerRef.current === null) throw new Error("No controller");

  controllerRef.current.setFormState = setFormState;

  return {
    controller: controllerRef.current,
    formError: formState.formError,
    formMessage: formState.formMessage,
    formElementsState: formState.formElementsState,
    //setFormState: setFormState
  };
};

export const useRequestForm = <T, RESPONSE_DATA_TYPE>(
  formElements: TFormElementsDescs<T>,
  formModel: IFormModel<T>,
  sendPostWithJsonResponse: TSendPostWithJsonResponse,
  url: string,
  successMessage: string,
  onSuccess?: (data: RESPONSE_DATA_TYPE) => void | undefined
): useFormReturn<T> => {
  const controllerRef: React.MutableRefObject<IFormController<
    T
  > | null> = useRef(null);

  const [formState, setFormState] = useState(
    (): IFormState<T> => {
      const controller = new FormRequestController<T, RESPONSE_DATA_TYPE>(
        formElements,
        formModel,
        url,
        sendPostWithJsonResponse,
        successMessage,
        onSuccess
      );

      const formElementsState = controller.model.getFormElementsInitState(
        formElements
      );

      controllerRef.current = controller;

      return {
        formError: "",
        formMessage: "",
        formElementsState: formElementsState,
      };
    }
  );

  if (controllerRef.current === null) throw new Error("No controller");

  controllerRef.current.setFormState = setFormState;

  return {
    controller: controllerRef.current,
    formError: formState.formError,
    formMessage: formState.formMessage,
    formElementsState: formState.formElementsState,
    //setFormState: setFormState
  };
};

export interface IFormRequest {
  isRequestSuccess: boolean;
  isRequestError: boolean;
  isRequestLoading: boolean;
}

export const useFormRequest = () => {
  const initState: IFormRequest = {
    isRequestSuccess: false,
    isRequestError: false,
    isRequestLoading: false,
  };

  const [requestState, setRequestState] = useState(initState);

  return {
    isRequestLoading: requestState.isRequestLoading,
    isRequestSuccess: requestState.isRequestSuccess,
    setRequestState: setRequestState,
  };
};
