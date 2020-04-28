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
import { TCalcDateAndToken } from "../../helper/createToken";

export type FORM_TYPE = "SIMPLE" | "WITH_REQUEST";

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
}

type useFormReturn<T> = {
  controller: IFormController<T>;

  formError: string;
  formMessage: string;
  formElementsState: TFormElementsState<T>;
  //setFormState: React.Dispatch<((prevState: IFormState) => IFormState) | IFormState> | null
};
/* 
const formControllerFactory = <T>(
  formType: FORM_TYPE,
  formElements: TFormElementsDescs<T>,
  formModel: IFormModel<T>,
  url?: string,
  sendPostWithJsonResponse?: TSendPostWithJsonResponse,
  calcDateAndToken?: TCalcDateAndToken,
  successMessage?: string
): IFormController<T> => {
  switch (formType) {
    case "WITH_REQUEST":
      if (url === undefined) throw new Error("No url in controller factory...");
      if (sendPostWithJsonResponse === undefined)
        throw new Error("No sendPostWithJsonResponse in controller factory...");
      if (calcDateAndToken === undefined)
        throw new Error("No calcDateAndToken in controller factory...");
      return new FormRequestController<T>(
        formElements,
        formModel,
        url,
        sendPostWithJsonResponse,
        calcDateAndToken,
        successMessage as string
      );
    case "SIMPLE":
      return new FormController(formElements, formModel);

    default:
      throw new Error(`No controller implementation for type ${formType}`);
  }
}; */

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

/* import React, { useState, useRef } from "react";
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
import { TCalcDateAndToken } from "../../helper/createToken";

export type FORM_TYPE = "SIMPLE" | "WITH_REQUEST";

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
}

type useFormReturn<T> = {
  controller: IFormController<T>;

  formError: string;
  formMessage: string;
  formElementsState: TFormElementsState<T>;
  //setFormState: React.Dispatch<((prevState: IFormState) => IFormState) | IFormState> | null
};

const formControllerFactory = <T>(
  formType: FORM_TYPE,
  formElements: TFormElementsDescs<T>,
  formModel: IFormModel<T>,
  url?: string,
  sendPostWithJsonResponse?: TSendPostWithJsonResponse,
  calcDateAndToken?: TCalcDateAndToken,
  successMessage?: string
): IFormController<T> => {
  switch (formType) {
    case "WITH_REQUEST":
      if (url === undefined) throw new Error("No url in controller factory...");
      if (sendPostWithJsonResponse === undefined)
        throw new Error("No sendPostWithJsonResponse in controller factory...");
      if (calcDateAndToken === undefined)
        throw new Error("No calcDateAndToken in controller factory...");
      return new FormRequestController<T>(
        formElements,
        formModel,
        url,
        sendPostWithJsonResponse,
        calcDateAndToken,
        successMessage as string
      );
    case "SIMPLE":
      return new FormController(formElements, formModel);

    default:
      throw new Error(`No controller implementation for type ${formType}`);
  }
};

//, formElementsStateInit: IFormElementState[]
export const useForm = <T>(
  formElements: TFormElementsDescs<T>,
  formType: FORM_TYPE,
  formModel: IFormModel<T>,
  sendPostWithJsonResponse?: TSendPostWithJsonResponse,
  url?: string,
  calcDateAndToken?: TCalcDateAndToken,
  successMessage?: string
): useFormReturn<T> => {
  const controllerRef: React.MutableRefObject<IFormController<
    T
  > | null> = useRef(null);

  const [formState, setFormState] = useState(
    (): IFormState<T> => {
      const controller = formControllerFactory(
        formType,
        formElements,
        formModel,
        url,
        sendPostWithJsonResponse,
        calcDateAndToken,
        successMessage
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
}; */
