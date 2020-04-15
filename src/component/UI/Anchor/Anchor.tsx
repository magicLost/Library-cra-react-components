import React, { CSSProperties } from "react";
import { Link } from "react-router-dom";
import classes from "./../Button/Button.module.scss";
import { BUTTON_TYPE, getButtonClasses } from "./../Button/Button";

interface AnchorProps {
  href: string;
  label: string;
  type: BUTTON_TYPE;
  ariaLabel: string;
  isReactRouter?: boolean;
  style?: CSSProperties;
}

const Anchor = ({
  href,
  label,
  type,
  ariaLabel,
  style,
  isReactRouter = true,
}: AnchorProps) => {
  let buttonClasses = getButtonClasses(type);

  if (isReactRouter) {
    return (
      <Link
        to={href}
        className={buttonClasses}
        style={style}
        aria-label={ariaLabel}
      >
        <span className={classes.Label}>{label}</span>
      </Link>
    );
  } else {
    return (
      <a
        href={href}
        className={buttonClasses}
        style={style}
        aria-label={ariaLabel}
      >
        <span className={classes.Label}>{label}</span>
      </a>
    );
  }
};

export default Anchor;

/* 
return (
    <Link
      to={href} 
      className={buttonClasses} 
      style={style}
      aria-label={ariaLabel}
    >
      <span className={classes.Label}>{label}</span>
    </Link>
  );
*/
