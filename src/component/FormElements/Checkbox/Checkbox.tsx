import React from "react";
//import classes from "./Checkbox.module.scss";
import inputClasses from "./../Input/Input.module.scss";
import classes from "./Checkbox.module.scss";
import { FormElementProps } from "../FormElementPropsInterface";

interface CheckboxProps extends FormElementProps {
  checked: boolean;
}

const Checkbox = ({
  elementAttrs,
  labelValue,
  name,
  value,
  onChange,
  checked,
  disabled = false,
}: CheckboxProps) => {
  console.log("Checkbox render ");

  const checkboxWrapperClasses = `${inputClasses.BaseInputWrapper} ${classes.Wrapper}`;

  let checkboxClasses = `${inputClasses.BaseInput} ${classes.Checkbox}`;

  let labelClasses = inputClasses.Label;

  if (disabled === true) {
    //checkboxClasses += ` ${inputClasses["BaseInput--Disabled"]}`;
    labelClasses += ` ${inputClasses["Label--Disabled"]}`;
  }

  return (
    <div className={checkboxWrapperClasses}>
      <label htmlFor={elementAttrs.id} className={labelClasses}>
        {labelValue}
      </label>
      <input
        type="checkbox"
        className={checkboxClasses}
        {...elementAttrs}
        value={value}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
        name={name}
      />
    </div>
  );
};

export default Checkbox;
