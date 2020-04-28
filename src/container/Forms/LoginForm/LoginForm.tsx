import React from "react";
import classes from "./LoginForm.module.scss";
//import { IHiddenField } from "../interfaces";
import { useRequestForm, useFormRequest } from "../../../hooks/Form/form";
//import FeedbackController from "./FeedbackController/FeedbackController";

import Form, {
  TFormElementsDescs,
  TFormElementsState,
} from "../../../component/Form/Form";
import FormRequestController, {
  TSendPostWithJsonResponse,
} from "../FormRequestController";
//import { IFormModel } from "../interfaces";
//import { TCalcDateAndToken } from "../../../helper/createToken";

import FormValidatorChain from "../../../helper/Validation/FormValidatorChain";
import LoginFormModel, {
  LOGIN_FORM_ELEMENTS,
} from "./LoginFormModel/LoginFormModel";

import { loginElementsMap } from "./../../../data/form/login_form_data";

interface LoginFormProps<RESPONSE_DATA_TYPE> {
  url: string;
  sendPostWithJsonResponse: TSendPostWithJsonResponse;
  successMessage: string;
  onSuccess?: (data: RESPONSE_DATA_TYPE) => void | undefined;
  getToken: () => string;
}

function LoginForm<RESPONSE_DATA_TYPE>({
  url,
  sendPostWithJsonResponse,
  successMessage,
  onSuccess,
  getToken,
}: LoginFormProps<RESPONSE_DATA_TYPE>) {
  const {
    controller,
    formError,
    formMessage,
    formElementsState,
  } = useRequestForm<LOGIN_FORM_ELEMENTS, RESPONSE_DATA_TYPE>(
    loginElementsMap,
    new LoginFormModel(new FormValidatorChain(), getToken),
    sendPostWithJsonResponse,
    url,
    successMessage,
    onSuccess
  );

  const {
    isRequestLoading,
    isRequestSuccess,
    setRequestState,
  } = useFormRequest();

  (controller as FormRequestController<
    LOGIN_FORM_ELEMENTS,
    RESPONSE_DATA_TYPE
  >).setRequestState = setRequestState;

  console.log("[RENDER] login form");

  return (
    <div className={classes.LoginForm}>
      <Form
        formError={formError}
        formMessage={formMessage}
        formElementsState={formElementsState}
        elementsDescs={loginElementsMap}
        submitButtonLabel={"Отправить"}
        onChange={controller.onChange}
        onClear={controller.onClear}
        onSubmit={controller.onSubmit}
        isLoading={isRequestLoading}
      />
    </div>
  );
}

export default LoginForm;
