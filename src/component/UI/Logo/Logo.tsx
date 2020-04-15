import React from "react";
import classes from "./Logo.module.scss";
//import icons from "../../../static/icons/ICONS.svg";
//import { Link } from "react-router-dom";

interface LogoProps {
  isHomepage: boolean;
  pathToIcon: string;
  viewBox: string;
}

const Logo = ({ isHomepage, pathToIcon, viewBox }: LogoProps) => {
  console.log("render Logo");

  if (isHomepage) {
    return (
      <div className={classes.Logo}>
        <svg className={classes.Svg} width="5" height={"5"} viewBox={viewBox}>
          <use xlinkHref={pathToIcon} />
        </svg>
      </div>
    );
  } else {
    return (
      <a
        aria-label={"Перейти на домашнюю страницу"}
        className={classes.Logo}
        href={"/"}
      >
        <svg className={classes.Svg} width="5" height={"5"} viewBox={viewBox}>
          <use xlinkHref={pathToIcon} />
        </svg>
      </a>
    );
  }
};

export default Logo;
