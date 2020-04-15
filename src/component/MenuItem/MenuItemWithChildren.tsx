import React, { useState, CSSProperties } from "react";
import classes from "./MenuItem.module.scss";
import { MenuItem } from "./../../data/menu";
import MenuTab from "../MenuTab/MenuTab";
import { getBottomTopPaddingByLayer } from "./MenuItem";

interface MenuItemWithChildrenProps {
  layer: number;
  initTopBottomPadding: number;
  backgroundColors: string[];
  initHeight: number; //220
  itemDesc: MenuItem;
  onCloseMenu: (event: any) => void | undefined;
}

const MenuItemWithChildren = ({
  layer,
  initTopBottomPadding,
  backgroundColors,
  initHeight,
  itemDesc,
  onCloseMenu,
}: MenuItemWithChildrenProps) => {
  const [isVisible, setIsVisible] = useState(false);

  //calc padding-top, padding-bottom
  const topBottomPadding = getBottomTopPaddingByLayer(
    layer,
    initTopBottomPadding
  );
  //get background

  const backgroundColor = backgroundColors[layer];

  //console.log("layer - " + layer + " BGcolor = " + backgroundColor);

  const style: CSSProperties = {
    backgroundColor: backgroundColor,
    paddingTop: topBottomPadding + "px",
    paddingBottom: topBottomPadding + "px",
  };

  const onClick = (event: any) => {
    setIsVisible((isVisible) => !isVisible);
  };

  return (
    <>
      <button className={classes.Link} style={style} onClick={onClick}>
        {itemDesc.title}
      </button>

      <MenuTab
        isVisible={isVisible}
        items={itemDesc.items as MenuItem[]}
        layer={layer + 1}
        backgroundColors={backgroundColors}
        initHeight={initHeight}
        initTopBottomPadding={initTopBottomPadding}
        onCloseMenu={onCloseMenu}
      />
    </>
  );
};

export default MenuItemWithChildren;
