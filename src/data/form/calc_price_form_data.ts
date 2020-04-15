import { ELEMENT_TYPE } from "../../component/Form/Form";
import {
  VALIDATOR_TYPES,
  IFormValidatorOptions,
} from "../../helper/Validation/form_validators";
import { IFormElementDesc } from "./../../component/Form/Form";

import { CALC_FORM_ELEMENTS } from "./../../container/Forms/CalcPrice/Model/CalcPriceModel";

export type Materials = "BANNER" | "BACKLIT" | "PLENKA";
export type Quality = "720dpi" | "1440dpi";
export type Checkboxes = "REZKA" | "SPEED";

export type PriceMultiply = {
  m2: number;
  quality: {
    "720dpi": number;
    "1440dpi": number;
  };
  material: {
    BANNER: number;
    BACKLIT: number;
    PLENKA: number;
  };
  REZKA: number;
  SPEED: number;
};

export const priceMultiply: PriceMultiply = {
  m2: 1300,
  quality: {
    "720dpi": 1,
    "1440dpi": 2,
  },
  material: {
    BANNER: 2,
    BACKLIT: 1.5,
    PLENKA: 1.2,
  },
  REZKA: 1.5,
  SPEED: 2,
};

export const calcPriceElements: IFormElementDesc[] = [
  {
    elementType: "INPUT",
    elementAttrs: {
      type: "text",
      id: "width123",
      placeholder: "100",
    },
    labelValue: "Ширина, см",
    validators: [
      {
        name: VALIDATOR_TYPES.REGEX,
        options: {
          errorMessage: "Недопустимый символ.",
          pattern: /[0-9-]*/,
        },
      },
    ],
    value: "",
  },
  {
    elementType: "INPUT",
    elementAttrs: {
      type: "text",
      id: "height123",
      placeholder: "100",
    },
    labelValue: "Высота, см",
    validators: [
      {
        name: VALIDATOR_TYPES.REGEX,
        options: {
          errorMessage: "Недопустимый символ.",
          pattern: /[0-9-]*/,
        },
      },
    ],
    value: "",
  },
  {
    elementType: "SELECT",
    elementAttrs: {
      id: "quality123",
    },
    labelValue: "Качество печати",
    selectOptions: [
      { value: "720dpi", label: "720dpi" },
      { value: "1440dpi", label: "1440dpi" },
    ],
    value: "720dpi",
  },
  {
    elementType: "SELECT",
    elementAttrs: {
      id: "material123",
    },
    labelValue: "Вид материала",
    selectOptions: [
      { value: "BANNER", label: "Баннер" },
      { value: "BACKLIT", label: "Бэклит" },
      { value: "PLENKA", label: "Пленка" },
    ],
    value: "BANNER",
  },
  {
    elementType: "CHECKBOX",
    elementAttrs: {
      id: "rezka123",
    },
    labelValue: "Резка пленки в край",
    checked: false,
    value: "REZKA_V_KRAI",
  },
  {
    elementType: "CHECKBOX",
    elementAttrs: {
      id: "speed123",
    },
    labelValue: "Срочная печать",
    checked: false,
    value: "SPEED",
  },
];

export const calcPriceElementsMap = new Map<
  CALC_FORM_ELEMENTS,
  IFormElementDesc
>();

calcPriceElementsMap.set("WIDTH", calcPriceElements[0]);
calcPriceElementsMap.set("HEIGHT", calcPriceElements[1]);
calcPriceElementsMap.set("QUALITY", calcPriceElements[2]);
calcPriceElementsMap.set("MATERIAL", calcPriceElements[3]);
calcPriceElementsMap.set("REZKA_V_KRAI", calcPriceElements[4]);
calcPriceElementsMap.set("SPEED", calcPriceElements[5]);
