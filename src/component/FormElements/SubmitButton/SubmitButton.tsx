import React, { CSSProperties } from "react";
//import classes from './SubmitButton.module.scss';
import { BUTTON_TYPE, getButtonClasses } from "../../UI/Button/Button";

interface SubmitButtonProps {
  label: string;
  type: BUTTON_TYPE;
  style?: CSSProperties;
  disabled?: boolean;
  isLoading?: boolean;
}

const SubmitButton = ({
  label,
  type,
  disabled,
  isLoading,
  style
}: SubmitButtonProps) => {
  let buttonClasses = getButtonClasses(type);

  const btnLabel = isLoading ? "...Подождите" : label;

  return (
    <input
      type="submit"
      name="submit"
      value={btnLabel}
      disabled={disabled}
      className={buttonClasses}
      style={style}
    />
  );
};

export default SubmitButton;
