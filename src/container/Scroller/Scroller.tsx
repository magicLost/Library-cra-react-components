import React, { CSSProperties, useMemo } from "react";
import classes from "./Scroller.module.scss";
import { useScroller } from "../../hooks/Scroller/scroller";
//import {EVENT_TYPE} from "./Model/IdentifyEvent";

export type GetScrollerItems = (
  itemClass: string,
  onItemClick: (target: any) => void | undefined,
  numberOfActiveItems: number,
  itemRef: React.RefObject<HTMLLIElement> | null,
  isIntersect: boolean
) => JSX.Element[];

interface ScrollerProps {
  items: any[];
  //type: string;
  isIntersect: boolean;
  itemClickHandler?: (target: any) => void | undefined;

  getItems: GetScrollerItems;
}

const Scroller = ({
  items,
  itemClickHandler,
  isIntersect,
  getItems,
}: ScrollerProps) => {
  const {
    controller,
    translateX,
    isNeedScroller,
    numberOfActiveItems,
  } = useScroller(items);

  const onItemClick = (event: any) => {
    //console.log("onItemClick ");
    if (itemClickHandler === undefined) throw new Error("Bad itemClickHandler");
    if (controller.itemRef === null) throw new Error("No item ref");

    const target = event.target;
    //console.log("itemClickHandler start", state.eventType, state.isNeedScroller);

    if (isNeedScroller) {
      if (controller.eventType === "CLICK") {
        //console.log("itemClickHandler eval", state.eventType);
        itemClickHandler(target);
      }
    } else {
      itemClickHandler(target);
    }
  };

  //console.log("scroller render", controller.itemRef);

  /*RENDER*/

  let finalListStyle: CSSProperties = {
    ...controller.listStyle,
    transform: "translateX(" + translateX + "px)",
  };
  let mouseDownHandler: ((event: any) => void | undefined) | undefined =
    controller.onMouseDown;
  let touchStartHandler: ((event: any) => void | undefined) | undefined =
    controller.onTouchStart;
  //let touchMoveHandler: ((event: any) => void | undefined) | undefined =
  //controller.onTouchMove;
  let touchEndHandler: ((event: any) => void | undefined) | undefined =
    controller.onTouchEnd;

  if (!isNeedScroller) {
    finalListStyle = { justifyContent: "center" };

    mouseDownHandler = undefined;
    touchStartHandler = undefined;
    //touchMoveHandler = undefined;
    touchEndHandler = undefined;
  }

  return (
    <div
      className={classes.Scroller}
      ref={controller.containerRef}
      onMouseDown={mouseDownHandler}
      onTouchStart={touchStartHandler}
      onTouchEnd={touchEndHandler}
    >
      <ul
        ref={controller.listRef}
        className={classes.ItemsList}
        style={finalListStyle}
      >
        {useMemo(
          () =>
            getItems(
              classes.Item,
              onItemClick,
              numberOfActiveItems,
              controller.itemRef,
              isIntersect
            ),
          [items, isNeedScroller, isIntersect, numberOfActiveItems]
        )}
      </ul>
    </div>
  );
};

export default Scroller;
