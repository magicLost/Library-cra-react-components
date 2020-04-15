import React from "react";
//import classes from "./Select.module.scss";
import classes from "./../Input/Input.module.scss";
import commonClasses from "./../../../CommonClasses.module.scss";
import { FormElementProps } from "../FormElementPropsInterface";
import { getInputAndLabelClasses } from "../Input/Input";

export type Option = { value: string; label: string };

interface SelectProps extends FormElementProps {
  options: Option[];
}

const Select = ({
  elementAttrs,
  labelValue,
  options,
  name,
  value,
  onChange,
  disabled = false,
}: SelectProps) => {
  const getOptions = (options: Option[]) => {
    return options.map((option, index) => {
      //let selected = (value !== '') ? option.value === value : option.selected;

      return (
        <option value={option.value} key={option.value + index}>
          {option.label}
        </option>
      );
    });
  };

  const optionsElements = getOptions(options);
  /* let selectClasses = `${classes.BaseInput} ${commonClasses.HundredPersentWidth}`;
  let labelClasses = classes.Label;
  if (disabled === true) {
    selectClasses += ` ${classes["BaseInput--Disabled"]}`;
    labelClasses += ` ${classes["Label--Disabled"]}`;
  } */
  const [selectClasses, labelClasses] = getInputAndLabelClasses(
    disabled,
    classes,
    commonClasses
  );

  return (
    <div className={classes.BaseInputWrapper}>
      <label htmlFor={elementAttrs.id} className={labelClasses}>
        {labelValue}
      </label>

      <select
        className={selectClasses}
        {...elementAttrs}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      >
        {optionsElements}
      </select>
    </div>
  );
};

export default Select;
