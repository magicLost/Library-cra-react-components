import React from "react";
//import axios from "axios";

import { IHiddenField, IFormModel } from "./interfaces";
import { IFormState } from "../../hooks/Form/form";
import {
  //IFormElementDesc,
  TFormElementsDescs,
} from "../../component/Form/Form";
import { IRequestState } from "../../hooks/request";
//import FeedbackModel from "./Feedback/FeedbackModel/FeedbackModel";
import { AFormController } from "./FormController";
//import { TSendPostWithJsonResponse } from "./Feedback/FeedbackController/FeedbackController";
import { TCalcDateAndToken } from "../../helper/createToken";
import { IJsonResponse } from "../../types";

/* interface InputChangeAction {
    type: FORM_ACTION,
    formElementState: IFormElementState
} */

/* type Result = "SUCCESS" | "ERROR";

interface ResponseData{

    result: Result;
    error?: string;

} */

export type TSendPostWithJsonResponse = <T>(
  url: string,
  formData: FormData
) => Promise<T>;

class FormRequestController<T> extends AFormController<T> {
  successMessage = "Все супер!!!";
  url = "";
  hiddenFields?: IHiddenField[];
  sendPostWithJsonResponse: TSendPostWithJsonResponse;
  calcDateAndToken: TCalcDateAndToken;
  setRequestState: React.Dispatch<
    ((prevState: IRequestState) => IRequestState) | IRequestState
  > | null = null;

  constructor(
    formElements: TFormElementsDescs<T>,
    model: IFormModel<T>,
    url: string,
    sendPostWithJsonResponse: TSendPostWithJsonResponse,
    calcDateAndToken: TCalcDateAndToken,
    successMessage: string
  ) {
    super(formElements, model);
    this.sendPostWithJsonResponse = sendPostWithJsonResponse;
    this.calcDateAndToken = calcDateAndToken;
    this.url = url;
    this.successMessage = successMessage;
  }

  onClear = (event: any) => {
    event.preventDefault();
    event.stopPropagation();

    //console.log("onClear");

    this.onClearHandler();

    if (this.setRequestState === null) throw new Error("No setRequestState...");

    this.setRequestState((prevState: IRequestState) => {
      return {
        isRequestSuccess: false,
        isRequestError: false,
        isRequestLoading: false,
      };
    });
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
        const formData = this.model.getFormData(
          prevState.formElementsState,
          this.hiddenFields
        );

        /* const token = (<IFeedbackModel>this.model).createToken(
          prevState.formElementsState
        );

        formData.append("_token", token); */

        const { date, token } = this.calcDateAndToken();

        formData.append("DATE", date);
        formData.append("_token", token);

        this.postRequest(formData);
      } else {
        return {
          formError: formError,
          formMessage: "",
          formElementsState: prevState.formElementsState,
        };
      }

      return prevState;
    });
  }

  protected onSuccess = () => {
    if (this.setFormState === null) throw new Error("No setFormState...");

    if (this.setRequestState === null) throw new Error("No setRequestState...");

    this.setFormState((prevState: IFormState<T>) => {
      return {
        ...prevState,
        formError: "",
        formMessage: this.successMessage,
      };
    });

    this.setRequestState({
      isRequestSuccess: true,
      isRequestError: false,
      isRequestLoading: false,
    });
  };

  protected onFail = (result: IJsonResponse<any>) => {
    if (this.setFormState === null) throw new Error("No setFormState...");

    if (this.setRequestState === null) throw new Error("No setRequestState...");

    this.setFormState((prevState: IFormState<T>) => {
      return {
        ...prevState,
        formError: result.error.message,
        formMessage: "",
      };
    });

    this.setRequestState({
      isRequestSuccess: false,
      isRequestError: false,
      isRequestLoading: false,
    });
  };

  protected onWrongStatus = () => {
    if (this.setFormState === null) throw new Error("No setFormState...");

    if (this.setRequestState === null) throw new Error("No setRequestState...");

    this.setFormState((prevState: IFormState<T>) => {
      return {
        ...prevState,
        formError: "Что-то не сработало...",
        formMessage: "",
      };
    });

    this.setRequestState({
      isRequestSuccess: false,
      isRequestError: true,
      isRequestLoading: false,
    });
  };

  protected onServerError = () => {
    if (this.setRequestState === null) throw new Error("No setRequestState...");
    if (this.setFormState === null) throw new Error("No setFormState...");

    this.setFormState((prevState: IFormState<T>) => {
      return {
        ...prevState,
        formError: "Сервер не хочет отвечать.",
        formMessage: "",
      };
    });

    this.setRequestState({
      isRequestSuccess: false,
      isRequestError: true,
      isRequestLoading: false,
    });
  };

  protected beforeRequest = () => {
    if (this.setFormState === null) throw new Error("No setFormState...");

    if (this.setRequestState === null) throw new Error("No setRequestState...");

    this.setFormState((prevState: IFormState<T>) => {
      if (prevState.formError !== "") return { ...prevState, formError: "" };

      return prevState;
    });

    this.setRequestState({
      isRequestSuccess: false,
      isRequestError: false,
      isRequestLoading: true,
    });
  };

  protected async postRequest(formData: FormData): Promise<any> {
    this.beforeRequest();

    try {
      const data = await this.sendPostWithJsonResponse<IJsonResponse<any>>(
        this.url,
        formData
      );

      //console.log("DATA", data);

      if (data.status && data.status === "SUCCESS") {
        //console.log(data);

        this.onSuccess();
      } else if (data.status && data.status === "FAIL") {
        //console.log(data);

        this.onFail(data);
      } else {
        this.onWrongStatus();
      }
    } catch (error) {
      //console.log("[SERVER ERROR] ", error);
      this.onServerError();
    }
    /* .then((data) => {
        console.log("SUCCESS", data);
        if (data.status && data.status === "SUCCESS") {
          console.log(data);

          this.onSuccess();
        } /* else if (data.status && data.status === "fail") {
          console.log(data);

          this.onFail(data);
        }  else {
          this.onWrongStatus();
        }
      })
      .catch((error) => {
        console.log("[SERVER ERROR] ", error);
        this.onServerError();
      }); */
  }
}

export default FormRequestController;
