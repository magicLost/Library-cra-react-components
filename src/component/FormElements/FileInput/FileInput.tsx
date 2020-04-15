import React from "react";
//import classes from "./FileInput.module.scss";
import inputClasses from "./../Input/Input.module.scss";
import classes from "./../../../CommonClasses.module.scss";

import { FormElementProps } from "../FormElementPropsInterface";

interface FileInputProps extends FormElementProps {
  error: string;
}

const FileInput = ({
  elementAttrs,
  value,
  name,
  labelValue,
  error,
  onChange,
  disabled = false
}: FileInputProps) => {
  let fileInputClasses = `${inputClasses.BaseInput} ${classes.HundredPersentWidth}`;

  if (error) fileInputClasses += inputClasses["BaseInput--Error"];

  return (
    <div className={inputClasses.BaseInputWrapper}>
      <label className={inputClasses.Label} htmlFor={elementAttrs.id}>
        {labelValue}
      </label>

      <input
        className={fileInputClasses}
        type="file"
        {...elementAttrs}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />

      {error && (
        <div className={inputClasses.Error}>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default FileInput;
