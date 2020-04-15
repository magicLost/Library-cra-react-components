import React from "react";
import classes from "./CallMeButton.module.scss";
import icons from "./../../static/icons/ICONS.svg";

interface CallMeButtonProps {
  clickHandler: (event: any) => void | undefined;
}

const CallMeButton = ({ clickHandler }: CallMeButtonProps) => {

  console.log("RENDER CallMeButton");

  return (
    <button 
      className={classes.CallMeButton} 
      onClick={clickHandler}
      aria-label={"Показать форму заказа звонка"}
    >
      <svg className={classes.CallMeButtonSvg} width="50" height={"50"}>
        <use xlinkHref={icons + "#callMe"} />
      </svg>
    </button>
  );
};

export default React.memo(CallMeButton);
