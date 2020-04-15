import {
  IFormElementDesc,
  TFormElementsDescs,
  TFormElementsState,
} from "../../component/Form/Form";
import { VALIDATOR_TYPES } from "../../helper/Validation/form_validators";

const commentElementAttrs = {
  type: "text",
  id: "comment123",
  placeholder: "Я бы хотел(а)...",
  rows: 2,
};

export const exampleFormElements: IFormElementDesc[] = [
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
    elementType: "SELECT",
    elementAttrs: {
      id: "choice123",
    },
    labelValue: "Кто круче",
    selectOptions: [
      { value: "Putin", label: "Путин" },
      { value: "Tramp", label: "Трамп" },
    ],
    value: "Tramp",
  },

  {
    elementType: "CHECKBOX",
    elementAttrs: {
      id: "mailing123",
    },
    labelValue: "Подписаться на рассылкую",
    checked: false,
    value: "MAILING",
  },

  {
    elementType: "TEXTAREA",
    resize: true,
    elementAttrs: commentElementAttrs,
    labelValue: "Ваш комментарий",
    value: "",
  },

  //file input
];

type EXAMPLE_FORM_ELEMENTS =
  | "NAME"
  | "PHONE"
  | "EMAIL"
  | "COMMENT"
  | "PHOTO"
  | "CHOICE"
  | "MAILING";

export const exampleFormElementsMap: TFormElementsDescs<EXAMPLE_FORM_ELEMENTS> = new Map();

exampleFormElementsMap.set("NAME", exampleFormElements[0]);
exampleFormElementsMap.set("EMAIL", exampleFormElements[1]);
exampleFormElementsMap.set("PHONE", exampleFormElements[2]);
exampleFormElementsMap.set("CHOICE", exampleFormElements[3]);
exampleFormElementsMap.set("COMMENT", exampleFormElements[5]);
exampleFormElementsMap.set("MAILING", exampleFormElements[4]);

export const exampleFormElementsState: TFormElementsState<EXAMPLE_FORM_ELEMENTS> = new Map();

exampleFormElementsState.set("NAME", {
  value: "",
  errors: [],
});
exampleFormElementsState.set("EMAIL", {
  value: "",
  errors: [],
});
exampleFormElementsState.set("PHONE", {
  value: "",
  errors: [],
});
exampleFormElementsState.set("CHOICE", {
  value: "Tramp",
  errors: [],
});
exampleFormElementsState.set("MAILING", {
  value: "MAILING",
  checked: false,
  errors: [],
});
exampleFormElementsState.set("COMMENT", {
  value: "",
  errors: [],
});
