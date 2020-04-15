import React from "react";
import classes from "./CloseButton.module.scss";

interface CloseButtonProps {
  onClick: (event: any) => void | undefined;
  ariaLabel: string;
}

const CloseButton = ({ onClick, ariaLabel }: CloseButtonProps) => {
  return (
    <button
      className={classes.CloseButton}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <span className={classes.LeftRight}></span>
      <span className={classes.RightLeft}></span>
      {/* <label className={classes.Label}>close</label> */}
    </button>
  );
};

export default CloseButton;
