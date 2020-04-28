import { TFormElementsState } from "./../../../../hooks/Form/form";
//import { IFeedbackModel } from "react-components-lib-lost/container/Forms/interfaces";
import FormModel from "./../../FormModel";
//import { IFormValidatorChain } from "react-components-lib-lost/helper/Validation/FormValidatorChain";

export type LOGIN_FORM_ELEMENTS = "EMAIL" | "PASSWORD";

class LoginFormModel extends FormModel<LOGIN_FORM_ELEMENTS> {
  validateOnSubmit(
    stateFormElements: TFormElementsState<LOGIN_FORM_ELEMENTS>
  ): string {
    let email = "";
    let password = "";

    stateFormElements.forEach((elemDesc, key, map) => {
      switch (key) {
        case "EMAIL":
          email = elemDesc.value;
          break;
        case "PASSWORD":
          password = elemDesc.value;
          break;
      }
    });

    if (email === "") {
      return "Укажите ваш электронный адрес.";
    }

    if (password === "") {
      return "Введите пароль.";
    }

    return "";
  }

  calcAndGetFormMessage(formData: FormData) {
    throw new Error("Do not use this...");
    return "";
  }
}

export default LoginFormModel;
