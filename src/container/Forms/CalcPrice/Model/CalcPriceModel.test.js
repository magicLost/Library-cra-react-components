import CalcPriceModel from "./CalcPriceModel";
import {
  Materials,
  Quality,
  PriceMultiply,
  priceMultiply,
} from "../../../../data/form/calc_price_form_data";

describe("CalcPriceModel", () => {
  describe("calcAndGetFormMessage", () => {
    const formData = new FormData();
    formData.append("WIDTH", "210");
    formData.append("HEIGHT", "224");
    formData.append("QUALITY", "1440dpi");
    formData.append("MATERIAL", "BACKLIT");
    formData.append("REZKA_V_KRAI", "");
    formData.append("SPEED", "");

    test("", () => {
      const model = new CalcPriceModel({}, priceMultiply);

      const result = model.calcAndGetFormMessage(formData);

      expect(result).toEqual("Примерная стоимость - 18346 руб.");
    });

    test("", () => {
      formData.set("REZKA_V_KRAI", "REZKA");

      formData.set("SPEED", "SPEED");

      const model = new CalcPriceModel({}, priceMultiply);

      const result = model.calcAndGetFormMessage(formData);

      expect(result).toEqual("Примерная стоимость - 55037 руб.");
    });
  });
});
