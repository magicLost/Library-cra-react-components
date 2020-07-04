import React, { useMemo, useRef } from "react";
//import classes from "./CalcPrice.module.scss";

import {
  TFormElementsDescs,
  TFormElementsState,
  IFormProps,
} from "../../../component/Form/Form";
import {
  calcPriceElementsMap,
  priceMultiply,
} from "./../../../data/form/calc_price_form_data";
import { useForm } from "../../../hooks/Form/form";
import CalcPriceModel, { CALC_FORM_ELEMENTS } from "./Model/CalcPriceModel";
import FormValidatorChain from "../../../helper/Validation/FormValidatorChain";

interface CalcPriceProps<T> {
  Form: React.FC<IFormProps<T>>;
}

function CalcPrice({ Form }: CalcPriceProps<CALC_FORM_ELEMENTS>) {
  const { controller, formError, formMessage, formElementsState } = useForm(
    calcPriceElementsMap,
    new CalcPriceModel(new FormValidatorChain(), priceMultiply)
  );

  console.log("CalcPrice render");

  return (
    <>
      <Form
        formError={formError}
        formMessage={formMessage}
        formElementsState={formElementsState}
        elementsDescs={calcPriceElementsMap}
        submitButtonLabel={"Рассчитать"}
        onChange={controller.onChange}
        onClear={controller.onClear}
        onSubmit={controller.onSubmit}
        isLoading={false}
      />
    </>
  );
}

export default CalcPrice;
