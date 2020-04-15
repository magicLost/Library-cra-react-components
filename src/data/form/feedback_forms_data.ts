import { ELEMENT_TYPE } from "../../component/Form/Form";
import {
  VALIDATOR_TYPES,
  IFormValidatorOptions,
} from "../../helper/Validation/form_validators";
import { Option } from "../../component/FormElements/Select/Select";
//import { CALC_PRICE_ELEMENTS_NAMES } from "./calc_price_form_data";
import { FEEDBACK_FORM_ELEMENTS } from "./../../container/Forms/Feedback/FeedbackModel/FeedbackModel";
import {
  IValidatorDesc,
  TElementAttrs,
  IFormElementDesc,
  TFormElementsDescs,
} from "./../../component/Form/Form";

//import {element_type} from "../component/Form/Form";
//import {validatorTypes} from "../helper/Validation/Validators";

/* export type FORM_TYPE =
  | "CALL_ME"
  | "FEEDBACK"
  | "WANNA_THE_SAME"
  | "CALC_PRICE";

export interface IValidatorDesc {
  name: VALIDATOR_TYPES;
  options: IFormValidatorOptions;
}

export type TElementAttrs = {
  type?: string;
  id: string;
  placeholder?: string;
};

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

export type TFormElementsDescs = Map<
  FORM_ELEMENTS | CALC_PRICE_ELEMENTS_NAMES,
  IFormElementDesc
>;

export type FORM_ELEMENTS = "NAME" | "PHONE" | "EMAIL" | "COMMENT" | "PHOTO";
 */
const commentElementAttrs = {
  type: "text",
  id: "comment123",
  placeholder: "Я бы хотел(а)...",
  rows: 2,
};

export const feedbackElements: IFormElementDesc[] = [
  {
    elementType: "INPUT",
    elementAttrs: {
      type: "text",
      id: "name123",
      placeholder: "Олимпиада",
    },
    labelValue: "Ваше имя",
    validators: [
      {
        name: VALIDATOR_TYPES.REGEX,
        options: {
          errorMessage: "Недопустимый символ.",
          pattern: /[a-zA-ZА-Яа-я 0-9-]*/,
        },
      },
      {
        name: VALIDATOR_TYPES.LENGTH,
        options: {
          errorMessage: "Имя должно содержать от двух до 100 символов.",
          min: 2,
          max: 100,
        },
      },
    ],
    value: "",
  },

  {
    elementType: "INPUT",
    elementAttrs: {
      type: "EMAIL",
      id: "email123",
      placeholder: "example@mail.ru",
    },
    labelValue: "Ваш электронный адрес",
    value: "",
  },

  {
    elementType: "INPUT",
    elementAttrs: {
      type: "text",
      id: "phone123",
      placeholder: "921-586-34-23",
    },
    labelValue: "Ваш номер телефона",
    validators: [
      {
        name: VALIDATOR_TYPES.REGEX,
        options: {
          errorMessage: "Недопустимый символ.",
          pattern: /[+0-9][0-9()-]*/,
        },
      },
      {
        name: VALIDATOR_TYPES.LENGTH,
        options: {
          errorMessage: "Минимум семь цифр.",
          min: 7,
          max: 40,
        },
      },
    ],
    value: "",
  },

  {
    elementType: "TEXTAREA",
    resize: true,
    elementAttrs: commentElementAttrs,
    labelValue: "Ваш комментарий",
    value: "",
  },
];

export const callMeElements: IFormElementDesc[] = [
  {
    elementType: "INPUT",
    elementAttrs: {
      type: "text",
      id: "name123",
      placeholder: "Олимпиада",
    },
    labelValue: "Ваше имя",
    validators: [
      {
        name: VALIDATOR_TYPES.REGEX,
        options: {
          errorMessage: "Недопустимый символ.",
          pattern: /[a-zA-ZА-Яа-я 0-9-]*/,
        },
      },
      {
        name: VALIDATOR_TYPES.LENGTH,
        options: {
          errorMessage: "Имя должно содержать от двух до 100 символов.",
          min: 2,
          max: 100,
        },
      },
    ],
    value: "",
  },

  {
    elementType: "INPUT",
    elementAttrs: {
      type: "text",
      id: "phone123",
      placeholder: "921-586-34-23",
    },
    labelValue: "Ваш номер телефона",
    validators: [
      {
        name: VALIDATOR_TYPES.REGEX,
        options: {
          errorMessage: "Недопустимый символ.",
          pattern: /[+0-9][0-9()-]*/,
        },
      },
      {
        name: VALIDATOR_TYPES.LENGTH,
        options: {
          errorMessage: "Минимум семь цифр.",
          min: 7,
          max: 40,
        },
      },
    ],
    value: "",
  },
];

export const feedbackElementsMap: TFormElementsDescs<FEEDBACK_FORM_ELEMENTS> = new Map();

feedbackElementsMap.set("NAME", feedbackElements[0]);
feedbackElementsMap.set("EMAIL", feedbackElements[1]);
feedbackElementsMap.set("PHONE", feedbackElements[2]);
feedbackElementsMap.set("COMMENT", feedbackElements[3]);

export const callMeElementsMap: TFormElementsDescs<FEEDBACK_FORM_ELEMENTS> = new Map();

callMeElementsMap.set("NAME", callMeElements[0]);
callMeElementsMap.set("PHONE", callMeElements[1]);
