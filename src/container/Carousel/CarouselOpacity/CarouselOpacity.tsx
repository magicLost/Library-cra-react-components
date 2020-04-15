import React, { useMemo, CSSProperties } from "react";
import classes from "./CarouselOpacity.module.scss";
//import {CarouselAction} from "../../../../hooks/Carousels/RCarousel/rcarousel";
import { ICarouselController } from "../CarouselController";

export type GetItemStyle = (index: number) => CSSProperties | undefined;
export type GetItems = (
  itemClass: string,
  getItemStyle: GetItemStyle,
  //isTranslated: boolean,
  //opacity: number,
  activeIndex: number
) => JSX.Element[];

interface CarouselOpacityProps {
  items: any[];
  getItems: GetItems;
  activeIndex: number;
  opacity: number;
  isTranslated: boolean;
  //dispatch: React.Dispatch<CarouselAction>
  controller: ICarouselController;
}

const CarouselOpacity = ({
  items,
  getItems,
  activeIndex,
  opacity,
  isTranslated,
  controller,
}: CarouselOpacityProps) => {
  /* RENDER */

  const getItemStyle = (index: number) => {
    let style = undefined;

    if (activeIndex === index) {
      if (isTranslated) {
        style = {
          //transitionProperty: 'opacity',
          opacity: opacity >= 0.5 ? opacity : 0.5,
        };
      } else {
        style = {
          transitionProperty: "opacity",
          transitionDuration: "0.5s",
          opacity: opacity,
        };
      }
    }

    return style;
  };

  console.log("render RCarouselOpacity");

  const itemsElements: JSX.Element[] = getItems(
    classes.Item,
    getItemStyle,
    activeIndex
  );

  return (
    <div
      className={classes.CarouselOpacity}
      ref={controller.containerRef}
      onMouseDown={controller.onMouseDown}
      onTouchStart={controller.onTouchStart}
      onTouchMove={controller.onTouchMove}
      onTouchEnd={controller.onTouchEnd}
    >
      <ul className={classes.ItemsList}>
        {itemsElements}
        {/*                 { useMemo(() => getItems(classes.Item, getItemStyle, isTranslated, opacity, activeIndex), [activeIndex, items, opacity, isTranslated]) }
         */}
      </ul>
    </div>
  );
};

export default CarouselOpacity;
