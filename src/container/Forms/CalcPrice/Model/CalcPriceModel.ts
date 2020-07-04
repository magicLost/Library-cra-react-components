import {
  IFormElementState,
  TFormElementsState,
} from "../../../../hooks/Form/form";
//import { IFeedbackModel } from "./../../interfaces";
import {
  Materials,
  Quality,
  PriceMultiply,
} from "../../../../data/form/calc_price_form_data";
import FormModel from "../../FormModel";

//import { IFormElementDesc } from "../../../../data/feedback_forms_data";
//import { ELEMENT_TYPE } from "../../../../component/Form/Form";

import { IFormValidatorChain } from "./../../../../helper/Validation/FormValidatorChain";

export type INPUT_DATA = {
  [name: string]: number;
};

export type CALC_FORM_ELEMENTS =
  | "WIDTH"
  | "HEIGHT"
  | "QUALITY"
  | "MATERIAL"
  | "REZKA_V_KRAI"
  | "SPEED";

class CalcPriceModel<CALC_FORM_ELEMENTS> extends FormModel<CALC_FORM_ELEMENTS> {
  priceMultiply: PriceMultiply;

  constructor(
    validatorChain: IFormValidatorChain,
    priceMultiply: PriceMultiply
  ) {
    super(validatorChain, () => "");
    this.priceMultiply = priceMultiply;
  }

  validateOnSubmit(
    stateFormElements: TFormElementsState<CALC_FORM_ELEMENTS>
  ): string {
    let width = "";
    let height = "";

    stateFormElements.forEach((elemDesc, key, map) => {
      switch (key) {
        case "WIDTH" as any:
          width = elemDesc.value;
          break;
        case "HEIGHT" as any:
          height = elemDesc.value;
          break;
      }
    });

    if (width === "" || height === "") {
      return "Укажите размеры, пожалуйста.";
    }

    return "";
  }

  calcAndGetFormMessage(formData: FormData): string {
    //const data = this.getData(stateFormElements);

    console.log("calcAndGetFormMessage", formData.get("REZKA_V_KRAI"));
    console.log("calcAndGetFormMessage", formData.get("SPEED"));

    let result = 0;

    result =
      (((formData.get("WIDTH") as any) * (formData.get("HEIGHT") as any)) /
        10000) *
      this.priceMultiply.m2;

    result *= this.priceMultiply.material[
      formData.get("MATERIAL") as Materials
    ];

    result *= this.priceMultiply.quality[formData.get("QUALITY") as Quality];

    if (formData.get("REZKA_V_KRAI") !== "") result *= this.priceMultiply.REZKA;

    if (formData.get("SPEED") !== "") result *= this.priceMultiply.SPEED;

    if (!result) return "Не удалось посчитать...";

    return `Примерная стоимость - ${Math.round(result)} руб.`;
  }

  /* getData(stateFormElements: TFormElementsState<CALC_FORM_ELEMENTS>) {
    let width: number = 0;
    let height: number = 0;
    let quality: Quality = "720dpi";
    let material: Materials = "BACKLIT";
    let rezka: string = "";
    let speed: string = "";

    stateFormElements.forEach((elemDesc, key, map) => {
      switch (key) {
        case "WIDTH":
          width = parseInt(elemDesc.value);
          break;
        case "HEIGHT":
          height = parseInt(elemDesc.value);
          break;
        case "QUALITY":
          quality = elemDesc.value as Quality;
          break;
        case "MATERIAL":
          material = elemDesc.value as Materials;
          break;
        case "REZKA_V_KRAI":
          rezka = elemDesc.checked ? "REZKA" : "";
          break;
        case "SPEED":
          speed = elemDesc.checked ? "SPEED" : "";
          break;

        default:
          throw new Error(`What the name ${key}`);
      }
    });

    return {
      width: width,
      height: height,
      quality: quality,
      material: material,
      rezka: rezka,
      speed: speed
    };
  } */
}

export default CalcPriceModel;
