import React from "react";
//import classes from './ResetButton.module.scss';

import { BUTTON_TYPE, getButtonClasses } from "../../UI/Button/Button";

interface ResetButtonProps {
  label: string;
  type: BUTTON_TYPE;
  style?: React.CSSProperties;
  disabled?: boolean;
}

const ResetButton = ({ label, type, disabled, style }: ResetButtonProps) => {
  let buttonClasses = getButtonClasses(type);

  return (
    <input
      type="reset"
      name="reset"
      value={label}
      disabled={disabled}
      className={buttonClasses}
      style={style}
    />
  );
};

export default ResetButton;
