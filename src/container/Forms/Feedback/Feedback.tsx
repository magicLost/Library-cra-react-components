import React from "react";
//import classes from "./Feedback.module.scss";

import { IHiddenField } from "./../interfaces";
import { useForm, useFormRequest } from "../../../hooks/Form/form";
//import FeedbackController from "./FeedbackController/FeedbackController";
import {
  feedbackElementsMap,
  callMeElementsMap,
} from "../../../data/form/feedback_forms_data";
import Form, {
  TFormElementsDescs,
  TFormElementsState,
} from "../../../component/Form/Form";
import FormRequestController, {
  TSendPostWithJsonResponse,
} from "../FormRequestController";
import { IFormModel } from "./../interfaces";
import { TCalcDateAndToken } from "./../../../helper/createToken";
import FeedbackModel, {
  FEEDBACK_FORM_ELEMENTS,
} from "./FeedbackModel/FeedbackModel";
import FormValidatorChain from "../../../helper/Validation/FormValidatorChain";

interface FeedbackProps {
  url: string;
  //successOkButtonClickHandler: (event: any) => void;
  isCallMe: boolean;
  //formModel: IFormModel<FEEDBACK_FORM_ELEMENTS>;
  sendPostWithJsonResponse: TSendPostWithJsonResponse;
  //formElementsMap: TFormElementsDescs<FEEDBACK_FORM_ELEMENTS>;
  calcDateAndToken: TCalcDateAndToken;
  hiddenFields?: IHiddenField[];
}

function Feedback({
  url,
  //successOkButtonClickHandler,
  isCallMe,
  //formModel,
  sendPostWithJsonResponse,
  //formElementsMap,
  calcDateAndToken,
  hiddenFields,
}: FeedbackProps) {
  const formElementsMap = isCallMe ? callMeElementsMap : feedbackElementsMap;

  const { controller, formError, formMessage, formElementsState } = useForm<
    FEEDBACK_FORM_ELEMENTS
  >(
    formElementsMap,
    "WITH_REQUEST",
    new FeedbackModel(new FormValidatorChain(), isCallMe),
    sendPostWithJsonResponse,
    url,
    calcDateAndToken
  );

  const {
    isRequestLoading,
    isRequestSuccess,
    setRequestState,
  } = useFormRequest();

  (controller as FormRequestController<
    FEEDBACK_FORM_ELEMENTS
  >).hiddenFields = hiddenFields;
  (controller as FormRequestController<
    FEEDBACK_FORM_ELEMENTS
  >).setRequestState = setRequestState;

  console.log("[Render] feedback form");

  return (
    <>
      <Form
        formError={formError}
        formMessage={formMessage}
        formElementsState={formElementsState}
        elementsDescs={formElementsMap}
        submitButtonLabel={"Отправить"}
        onChange={controller.onChange}
        onClear={controller.onClear}
        onSubmit={controller.onSubmit}
        isLoading={isRequestLoading}
      />
    </>
  );
}

export default Feedback;

/* import React from "react";
//import classes from "./Feedback.module.scss";

import { IHiddenField } from "./../interfaces";
import { useForm, useFormRequest } from "../../../hooks/Form/form";
import FeedbackController from "./FeedbackController/FeedbackController";
import {
  feedbackElementsMap,
  callMeElementsMap,
} from "../../../data/form/feedback_forms_data";
import Form from "../../../component/Form/Form";
import { TSendPostWithJsonResponse } from "./FeedbackController/FeedbackController";

interface FeedbackProps {
  url: string;
  //successOkButtonClickHandler: (event: any) => void;
  isCallMe: boolean;
  sendPostWithJsonResponse: TSendPostWithJsonResponse;
  hiddenFields?: IHiddenField[];
}

const Feedback = ({
  url,
  //successOkButtonClickHandler,
  isCallMe,
  sendPostWithJsonResponse,
  hiddenFields,
}: FeedbackProps) => {
  const formElementsMap = isCallMe ? callMeElementsMap : feedbackElementsMap;

  const { controller, formError, formMessage, formElementsState } = useForm(
    url,
    formElementsMap,
    isCallMe ? "CALL_ME" : "FEEDBACK",
    sendPostWithJsonResponse
  );

  const {
    isRequestLoading,
    isRequestSuccess,
    setRequestState,
  } = useFormRequest();

  (controller as FeedbackController).hiddenFields = hiddenFields;
  (controller as FeedbackController).setRequestState = setRequestState;

  console.log("[Render] feedback form");

  return (
    <>
      <Form
        formError={formError}
        formMessage={formMessage}
        formElementsState={formElementsState}
        elementsDescs={formElementsMap}
        submitButtonLabel={"Отправить"}
        onChange={controller.onChange}
        onClear={controller.onClear}
        onSubmit={controller.onSubmit}
        isLoading={isRequestLoading}
      />
    </>
  );
};

export default Feedback;
 */
