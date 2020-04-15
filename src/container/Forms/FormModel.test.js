import FormModel from "./FormModel";
import FormValidatorChain from "../../helper/Validation/FormValidatorChain";
import { feedbackElementsMap } from "../../data/feedback_forms_data";
import { calcPriceElementsMap } from "../../data/calc_price_form_data";

const validatorChain = new FormValidatorChain();
validatorChain.getErrorMessages = jest.fn();
validatorChain.isValid = jest.fn();

/* export interface IFormElementState {
  //name: FORM_ELEMENTS | CALC_PRICE_ELEMENTS_NAMES;
  value: string;
  errors: string[];
  file?: File;
  checked?: boolean;
} */

const formElementsState = new Map([
  ["NAME", { value: "Nikki", errors: [] }],
  ["PHONE", { value: "123-34-34", errors: [] }],
  ["PHOTO", { value: "fileName", file: new File([], "file.txt"), errors: [] }]
]);

const hiddenFields = [
  { name: "hello", value: 345 },
  { name: "bye", value: 25 }
];

const formModel = new FormModel(validatorChain);

describe("FormModel", () => {
  beforeEach(() => {
    validatorChain.getErrorMessages.mockClear();
    validatorChain.isValid.mockClear();
  });

  describe("getFormData", () => {
    test("Must return FormData with values", () => {
      const result = formModel.getFormData(formElementsState, hiddenFields);

      expect(result).toBeInstanceOf(FormData);
      expect(result.has("PHOTO")).toEqual(true);
      expect(result.get("NAME")).toEqual("Nikki");
      expect(result.get("hello")).toEqual("345");
      expect(result.get("bye")).toEqual("25");
    });
  });

  describe("validateAndReturnDataWithErrors", () => {
    test("Text input with valid data", () => {
      let name = "NAME";

      formModel.validatorChain.isValid.mockReturnValue(true);

      const data = {
        value: "Nikki",
        //file: fileList[0],
        errors: []
      };

      const result = formModel.validateAndReturnDataWithErrors(
        feedbackElementsMap,
        data,
        name
      );
      //(formElements: TFormElementsDescs,
      //data: IFormElementState)

      expect(formModel.validatorChain.isValid).toHaveBeenNthCalledWith(
        1,
        data.value,
        feedbackElementsMap.get("NAME").validators
      );

      expect(validatorChain.getErrorMessages).toHaveBeenCalledTimes(0);
      expect(result).toEqual(data);
    });

    test("Text input with invalid data", () => {
      let name = "NAME";

      formModel.validatorChain.isValid.mockReturnValue(false);
      validatorChain.getErrorMessages.mockReturnValue(["Error 1", "Errro 2"]);

      const data = {
        value: "Nikki",
        //file: fileList[0],
        errors: []
      };

      const result = formModel.validateAndReturnDataWithErrors(
        feedbackElementsMap,
        data,
        name
      );
      //(formElements: TFormElementsDescs,
      //data: IFormElementState)

      expect(formModel.validatorChain.isValid).toHaveBeenNthCalledWith(
        1,
        data.value,
        feedbackElementsMap.get("NAME").validators
      );

      expect(validatorChain.getErrorMessages).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        value: "Nikki",
        //file: fileList[0],
        errors: ["Error 1", "Errro 2"]
      });
    });

    test("File input with valid data", () => {
      let name = "NAME";

      formModel.validatorChain.isValid.mockReturnValue(true);

      const data = {
        value: "Nikki",
        file: "File",
        errors: []
      };

      const result = formModel.validateAndReturnDataWithErrors(
        feedbackElementsMap,
        data,
        name
      );
      //(formElements: TFormElementsDescs,
      //data: IFormElementState)

      expect(formModel.validatorChain.isValid).toHaveBeenNthCalledWith(
        1,
        data.file,
        feedbackElementsMap.get("NAME").validators
      );

      expect(validatorChain.getErrorMessages).toHaveBeenCalledTimes(0);
      expect(result).toEqual(data);
    });
  });

  describe("getFormElementsInitState", () => {
    test("REturn init state", () => {
      const formDesc = new Map(calcPriceElementsMap);

      formDesc.set("PHOTO", {
        elementType: "FILE_INPUT",
        elementAttrs: {
          type: "text",
          id: "name123"
        },
        labelValue: "Ваше имя",
        value: ""
      });

      const result = formModel.getFormElementsInitState(formDesc);

      expect(result.has("WIDTH")).toEqual(true);
      expect(result.has("HEIGHT")).toEqual(true);
      expect(result.has("QUALITY")).toEqual(true);
      expect(result.has("MATERIAL")).toEqual(true);
      expect(result.has("REZKA_V_KRAI")).toEqual(true);
      expect(result.has("SPEED")).toEqual(true);
      expect(result.get("SPEED").checked).toEqual(false);
      expect(result.get("QUALITY").value).toEqual("720dpi");
    });
  });

  describe("validateOnChangeAndReturnModifyState", () => {
    test("", () => {
      /*  target: any,
    formElements: TFormElementsDescs,
    stateFormElements: TFormElementsState */
      formModel.selectValidation = jest.fn();
      formModel.checkboxValidation = jest.fn();
      formModel.inputFileValidation = jest.fn();
      formModel.inputValidation = jest.fn();

      formModel.checkboxValidation.mockReturnValue({
        value: "Sia",
        errors: []
      });

      formModel.inputValidation.mockReturnValue({
        value: "Lia",
        errors: ["Bad"]
      });

      const target = { name: "NAME", value: "Sia", type: "checkbox" };
      const target2 = { name: "NAME", value: "Sia", type: "text" };

      const formElementsState = new Map();
      formElementsState.set("NAME", { value: "Hello", errors: [] });
      formElementsState.set("PHONE", { value: "1234567", errors: [] });

      const result = formModel.validateOnChangeAndReturnModifyState(
        target,
        feedbackElementsMap,
        formElementsState
      );

      expect(formModel.checkboxValidation).toHaveBeenNthCalledWith(1, target);
      expect(result.get("NAME")).toEqual({ value: "Sia", errors: [] });

      const result2 = formModel.validateOnChangeAndReturnModifyState(
        target2,
        feedbackElementsMap,
        formElementsState
      );

      expect(formModel.inputValidation).toHaveBeenNthCalledWith(
        1,
        target2,
        feedbackElementsMap
      );
      expect(result2.get("NAME")).toEqual({ value: "Lia", errors: ["Bad"] });
    });
  });
});
