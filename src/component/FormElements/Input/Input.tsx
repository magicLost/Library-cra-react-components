import React from "react";
import commonClasses from "./../../../CommonClasses.module.scss";
import classes from "./Input.module.scss";
import { FormElementProps } from "../FormElementPropsInterface";

interface InputProps extends FormElementProps {
  error: string;
}

/* classes - base input classes */
export const getInputAndLabelClasses = (
  disabled: boolean,
  classes: any,
  commonClasses: any,
  error?: string
): string[] => {
  let inputClasses = `${classes.BaseInput} ${commonClasses.HundredPersentWidth}`;
  let labelClasses = classes.Label;

  if (disabled === true) {
    inputClasses += ` ${classes["BaseInput--Disabled"]}`;
    labelClasses += ` ${classes["Label--Disabled"]}`;

    return [inputClasses, labelClasses];
  }

  if (error) {
    inputClasses += ` ${classes["BaseInput--Error"]}`;
  }

  return [inputClasses, labelClasses];
};

const Input = ({
  elementAttrs,
  value,
  labelValue,
  error,
  name,
  onChange,
  disabled = false,
}: InputProps) => {
  const [inputClasses, labelClasses] = getInputAndLabelClasses(
    disabled,
    classes,
    commonClasses,
    error
  );
  //let inputClass = `${classes.BaseInput} ${commonClasses.HundredPersentWidth}`;
  let errorElement = null;

  if (error) {
    //inputClass += ` ${classes["BaseInput--Error"]}`;
    errorElement = (
      <div className={classes.Error}>
        <p>{error}</p>
      </div>
    );
  }

  //console.log("REnder input", name);

  return (
    <div className={classes.BaseInputWrapper}>
      <label htmlFor={elementAttrs.id} className={labelClasses}>
        {labelValue}
      </label>

      <input
        className={inputClasses}
        {...elementAttrs}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />

      {errorElement}
    </div>
  );
};

export default Input;
