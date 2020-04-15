import React from "react";
import { Link } from "react-router-dom";
import classes from "./MenuItem.module.scss";
import { MenuItem } from "./../../data/menu";

/* export const backgroundColorsByLayer = [
    "#ffffff", 
    "#f7f7f7",
    "#e5e5e5",
]; */

export const getBottomTopPaddingByLayer = (
  layer: number,
  initPadding: number
): number => {
  return initPadding - layer * 3;
};

interface MenuItemProps {
  layer: number;
  initTopBottomPadding: number;
  backgroundColors: string[];
  itemDesc: MenuItem;
  onCloseMenu: (event: any) => void | undefined;
}

const menuItem = ({
  layer,
  initTopBottomPadding,
  backgroundColors,
  itemDesc,
  onCloseMenu,
}: MenuItemProps) => {
  //calc padding-top, padding-bottom
  const topBottomPadding = getBottomTopPaddingByLayer(
    layer,
    initTopBottomPadding
  );
  //get background
  const backgroundColor = backgroundColors[layer];

  const style: React.CSSProperties = {
    backgroundColor: backgroundColor,
    paddingTop: topBottomPadding + "px",
    paddingBottom: topBottomPadding + "px",
  };

  return (
    <Link
      onClick={onCloseMenu}
      className={classes.Link}
      style={style}
      to={itemDesc.href as string}
    >
      {itemDesc.title}
    </Link>
  );
};

export default menuItem;
