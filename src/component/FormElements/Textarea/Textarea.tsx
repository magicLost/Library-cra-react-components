import React, { useState, CSSProperties } from "react";
import classes from "./Textarea.module.scss";
import inputClasses from "./../Input/Input.module.scss";
import commonClasses from "./../../../CommonClasses.module.scss";
import { FormElementProps } from "../FormElementPropsInterface";
import { getInputAndLabelClasses } from "../Input/Input";

interface TextareaProps extends FormElementProps {
  error: string;
  isResize: boolean;
}

interface TextareaUseState {
  height: string;
}

const Textarea = ({
  elementAttrs,
  value,
  labelValue,
  error,
  name,
  onChange,
  isResize,
  disabled = false,
}: TextareaProps) => {
  const [style, setStyle] = useState<TextareaUseState | undefined>(undefined);

  const onKeyUp = (event: any) => {
    event.stopPropagation();

    const target = event.target;

    if (target.scrollHeight > target.clientHeight) {
      //this.setState({style: { height: target.scrollHeight + 10 + "px"}});
      setStyle({ height: target.scrollHeight + 10 + "px" });
      //target.style.height = target.scrollHeight + 10 + "px";
    }
  };

  //let textareaClass = `${inputClasses.BaseInput} ${classes.Textarea} ${commonClasses.HundredPersentWidth}`;

  let [textareaClasses, labelClasses] = getInputAndLabelClasses(
    disabled,
    inputClasses,
    commonClasses,
    error
  );
  textareaClasses += ` ${classes.Textarea}`;

  let textAreaStyle: CSSProperties | undefined = isResize ? style : undefined;
  let keyUpHandler = isResize ? onKeyUp : undefined;
  let errorElement: JSX.Element | null = null;

  if (error) {
    //textareaClass += ` ${inputClasses["BaseInput--Error"]}`;
    errorElement = (
      <div className={inputClasses.Error}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className={classes["TextareaWrapper"]}>
      <label htmlFor={elementAttrs.id} className={labelClasses}>
        {labelValue}
      </label>

      <textarea
        style={textAreaStyle}
        onKeyUp={keyUpHandler}
        className={textareaClasses}
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

export default Textarea;
