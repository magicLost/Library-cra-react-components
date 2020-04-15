import React, { useEffect } from "react";
import classes from "./ControlsFeature.module.scss";
import { CFConfig, CFItem } from "./types";
import { useControlsFeature } from "./../../hooks/ControlsFeature/controlsFeature";
import pathToIcons from "./../../static/icons/ICONS.svg";
import { getDegrees, getTranslateByCircle } from "./Model/CalcDegrees";

interface ControlsFeatureProps {
  items: CFItem[];
  itemClickHandler: (index: number) => void | undefined;
  config: CFConfig;
}

const ControlsFeature = ({
  items,
  itemClickHandler,
  config,
}: ControlsFeatureProps) => {
  const {
    controller,
    isShowItems,
    title,
    mainItemText,
    mainItemRef,
  } = useControlsFeature(items, itemClickHandler, classes, config);

  //useEffect(() => { console.log("useEffect ", title, isShowItems, mainItemText)}, [title, isShowItems, mainItemText]);

  const getBgStyle = () => {
    if (isShowItems)
      return {
        transform: "scale(10.5, 10.5)",
        opacity: 1,
      };

    return undefined;
  };

  const getTitle = () => {
    let finalTitleStyle: any = undefined;

    if (isShowItems && config.isShowTitle) {
      finalTitleStyle = { ...controller.cfClasses.titleStyle };

      if (title !== "") {
        finalTitleStyle.opacity = 1;
        //title = this.state.title;
      }

      return (
        <div style={finalTitleStyle} className={classes.Title}>
          <p>{title}</p>
        </div>
      );
    }

    return null;
  };

  const getMainItem = () => {
    let mainItemContent = <span></span>;
    let className = classes.ItemMain;
    //let onTouchMove = config.isShowTitle ? controller.onMainItemTouchMove : undefined;

    if (config.isMainItemText === true) {
      mainItemContent = <span>{mainItemText}</span>;
      className = classes.ItemMainText;
    } else {
      mainItemContent = (
        <svg className={classes.Svg} width="5" height={"5"}>
          <use xlinkHref={pathToIcons + "#more"} />
        </svg>
      );
    }

    return (
      <div
        className={className}
        onMouseDown={controller.onMainItemMouseDown}
        onTouchStart={controller.onMainItemTouchStart}
        onTouchEnd={controller.onMainItemTouchEnd}
        ref={mainItemRef}
        style={config.mainItemStyle}
      >
        {mainItemContent}
      </div>
    );
  };

  const getItems = () => {
    let itemClass: string = classes.Item;
    let style: any = undefined;

    let onMouseEnter: null | ((event: any) => void | undefined) = null;
    let onMouseLeave: null | ((event: any) => void | undefined) = null;

    if (config.type === "TEXT") {
      itemClass = classes.ItemText;
    }

    if (isShowItems && config.isShowTitle) {
      onMouseEnter = controller.onItemMouseEnter;
      onMouseLeave = controller.onItemMouseLeave;
    }

    return items.map((value, index: number) => {
      //Todo: make scale - 0
      console.log(`Controls feature items value `, value);
      if (isShowItems) {
        //index, ttype, fformType, itemsLength, degreesAll, itemsLengthForDegreesCalc, degreesMarga
        let degrees = getDegrees(
          index,
          config.type,
          config.formType,
          items.length,
          controller.cfClasses.degreesAll,
          controller.cfClasses.itemsLengthForDegreesCalc,
          controller.cfClasses.degreesMarga
        );

        //radius, degrees
        let translate = getTranslateByCircle(
          controller.cfClasses.radius,
          degrees
        );

        //console.log("translate ", translate);

        translate += " scale(1, 1)";

        style = { transform: translate, opacity: 1 };
        //style.boxShadow = "0 10px 18px rgba(0,0,0,0.25), 0 6px 6px rgba(0,0,0,0.22)";
        style.boxShadow =
          "0 1px 5px 0 rgba(0,0,0,0.2), 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12)";

        //console.log(style);
      }

      if (config.type === "TEXT") {
        return getTextItem(itemClass, value, index, style);
      } else {
        return getSvgItem(itemClass, value, index, style);
      }
    });
  };

  const getTextItem = (
    itemClass: string,
    value: CFItem,
    index: number,
    style: any
  ) => (
    <div
      key={itemClass + index}
      className={itemClass}
      data-feature-name={value.title}
      data-feature-index={index}
      onMouseUp={controller.onItemMouseUp}
      onMouseEnter={controller.onItemMouseEnter}
      onMouseLeave={controller.onItemMouseLeave}
      style={style}
    >
      <p
        data-feature-name={value.title}
        data-feature-index={index}
        className={classes.Label}
      >
        {value.title}
      </p>
    </div>
  );

  const getSvgItem = (
    itemClass: string,
    value: CFItem,
    index: number,
    style: any
  ) => (
    <div
      key={itemClass + index}
      className={itemClass}
      data-feature-name={value.title}
      data-feature-index={index}
      onMouseUp={controller.onItemMouseUp}
      onMouseEnter={controller.onItemMouseEnter}
      onMouseLeave={controller.onItemMouseLeave}
      style={style}
    >
      <svg
        className={classes.ItemSvg}
        width="5"
        height={"5"}
        data-feature-name={value.title}
        data-feature-index={index}
      >
        <use
          data-feature-index={index}
          data-feature-name={value.title}
          xlinkHref={pathToIcons + value.href}
        />
      </svg>
    </div>
  );

  /* RENDER */
  const titleElement = getTitle();
  const bgStyle = getBgStyle();
  const mainItem = getMainItem();
  const itemsElements = getItems();

  console.log("render ControlFeature ");

  return (
    <div
      onContextMenu={(event) => event.preventDefault()}
      className={classes.ControlsFeature}
      style={config.mainDivStyle}
    >
      {titleElement}

      <div className={classes.ItemBG} style={bgStyle}>
        <div className={controller.cfClasses.topLeftBgClasses}> </div>
        <div className={controller.cfClasses.topRightBgClasses}> </div>
        <div className={controller.cfClasses.bottomLeftBgClasses}> </div>
        <div className={controller.cfClasses.bottomRightBgClasses}> </div>
      </div>

      {itemsElements}

      {mainItem}
    </div>
  );
};

export default ControlsFeature;
