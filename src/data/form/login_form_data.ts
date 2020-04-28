import {
  VALIDATOR_TYPES,
  IFormValidatorOptions,
} from "../../helper/Validation/form_validators";
import {
  IFormElementDesc,
  TFormElementsDescs,
  ELEMENT_TYPE,
} from "../../component/Form/Form";
//import {element_type} from "../component/Form/Form";
//import {validatorTypes} from "../helper/Validation/Validators";

export type LOGIN_FORM_ELEMENTS = "EMAIL" | "PASSWORD";

export const loginElements: IFormElementDesc[] = [
  {
    elementType: "INPUT",
    elementAttrs: {
      type: "EMAIL",
      id: "email123",
      placeholder: "example@mail.ru",
    },
    labelValue: "Email address",
    validators: [
      {
        name: VALIDATOR_TYPES.LENGTH,
        options: {
          errorMessage: "What??? It's to loooooong.",
          max: 255,
        },
      },
    ],
    value: "",
  },

  {
    elementType: "INPUT",
    elementAttrs: {
      type: "password",
      id: "password123",
      placeholder: "*********",
    },
    labelValue: "Password",
    validators: [
      {
        name: VALIDATOR_TYPES.LENGTH,
        options: {
          errorMessage: "Минимум семь цифр.",
          min: 7,
          max: 255,
        },
      },
    ],
    value: "",
  },
];

export const loginElementsMap: TFormElementsDescs<LOGIN_FORM_ELEMENTS> = new Map();

loginElementsMap.set("EMAIL", loginElements[0]);
loginElementsMap.set("PASSWORD", loginElements[1]);
