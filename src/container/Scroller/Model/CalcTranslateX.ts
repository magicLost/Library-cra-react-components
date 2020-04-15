import { clamp } from "utils-library-lost/MathF/MathF";

class CalcTranslateX {
  isYScroll = false;
  isFirstMove = true;

  numberOfItems = 0;

  listWidth = 0;
  itemWidth = 0;

  swipeDist = 0;

  //translateXDifferencial = 0;

  minTranslateOffset = 0;
  maxTranslateOffset = 0;

  //checkClickTranslateX = 0;
  //offsetX = 0;

  pageXStart = 0;
  pageYStart = 0;
  prevPageX = 0;
  pageX = 0;

  translateX = 0;

  setValues = (
    listRef: React.RefObject<HTMLElement>,
    itemRef: React.RefObject<HTMLElement>,
    numberOfItems: number
  ) => {
    this.numberOfItems = numberOfItems;

    if (listRef.current === null || itemRef.current === null)
      throw new Error("No listRef or itemRef");

    this.listWidth = Math.round(listRef.current.getBoundingClientRect().width);
    this.itemWidth = Math.round(itemRef.current.getBoundingClientRect().width);

    this.setTranslateOffsets();

    console.log("this.listWidth ", this.listWidth);
    console.log("this.itemWidth ", this.itemWidth);

    console.log("this.minTranslateOffset ", this.minTranslateOffset);
    console.log("this.maxTranslateOffset ", this.maxTranslateOffset);

    console.log("this.numberOfItems ", this.numberOfItems);

    this.swipeDist = Math.round((this.itemWidth * this.numberOfItems) / 10);

    /* console.log("minTranslateOffset = " + this.minTranslateOffset);
         console.log("maxTranslateOffset = " + this.maxTranslateOffset);
         console.log("listWidth = " + this.listWidth);
         console.log("itemWidth = " + this.itemWidth); */
  };

  onPointerDown = (
    pageX: number,
    pageY: number,
    listRef: React.RefObject<HTMLElement>,
    containerRef: React.RefObject<HTMLDivElement>
  ) => {
    this.pageXStart = pageX;
    this.pageYStart = pageY;
    this.prevPageX = pageX;

    if (listRef.current === null || containerRef.current === null)
      throw new Error("No listRef or containerRef");

    //(containerRef.current.getBoundingClientRect() as DOMRect).x
    const offsetX = Math.abs(containerRef.current.getBoundingClientRect().left);
    //(listRef.current.getBoundingClientRect() as DOMRect).x - offsetX;
    this.translateX = listRef.current.getBoundingClientRect().left - offsetX;

    /* console.log("DOWN ", listRef.current.getBoundingClientRect());
    console.log("DOWN ", containerRef.current);
    console.log("DOWN ", containerRef.current.getBoundingClientRect());
    console.log("DOWN ", offsetX);
    console.log("DOWN ", this.translateX); */
  };

  onPointerMove = (pageX: number, pageY: number) => {
    if (this.isFirstMove) {
      this.isYScroll = this.isYScrollFunc(pageX, pageY);

      this.isFirstMove = false;
    }
  };

  onPointerUp = () => {
    this.isFirstMove = true;
    this.isYScroll = false;
  };

  setTranslateOffsets = () => {
    this.maxTranslateOffset = 0;
    this.minTranslateOffset = Math.round(
      this.listWidth - this.itemWidth * this.numberOfItems
    );
  };

  isOutsideOffset = (translateX: number) => {
    return (
      translateX > this.maxTranslateOffset ||
      translateX < this.minTranslateOffset
    );
  };

  calcTranslateXOnMove = (stateTranslateX: number, pageX: number) => {
    let translateX = 0;

    //console.log("[calcTranslateXOnMove] ", stateTranslateX, pageX);

    if (stateTranslateX > this.maxTranslateOffset) {
      if (pageX > this.prevPageX) {
        translateX += 0.3;
      } else {
        //translateX -= 0.3;
        translateX = pageX - this.prevPageX;
      }
    } else if (stateTranslateX < this.minTranslateOffset) {
      if (pageX > this.prevPageX) {
        //translateX += 0.3;
        translateX = pageX - this.prevPageX;
      } else {
        translateX -= 0.3;
      }
    } else {
      translateX = pageX - this.prevPageX;
    }

    //console.log("[calcTranslateXOnMove] ", translateX);

    this.prevPageX = pageX;

    translateX = this.translateX + translateX;
    translateX = clamp(
      translateX,
      this.minTranslateOffset - 50,
      this.maxTranslateOffset + 50
    );

    //console.log("[calcTranslateXOnMove] ", translateX);

    this.translateX = translateX;
  };

  calcTranslateXOnSwipe = (speed: number) => {
    let translateX = this.swipeDist * speed;

    translateX = this.translateX + translateX;
    translateX = clamp(
      translateX,
      this.minTranslateOffset,
      this.maxTranslateOffset
    );

    this.translateX = translateX;
  };

  isNeedScroller = () => {
    return this.itemWidth * this.numberOfItems - this.listWidth > 0;
  };

  isYScrollFunc = (pageX: number, pageY: number) => {
    const distX = Math.abs(pageX - this.pageXStart);
    const distY = Math.abs(pageY - this.pageYStart);

    //console.log("distX ", distX);
    //console.log("distY ", distY);

    //console.log(event);

    return distY > distX;
  };
}

export default CalcTranslateX;
