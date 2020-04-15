import { useReducer, useRef, useEffect } from "react";
import { ICarouselController } from "../../container/Carousel/CarouselController";
import CarouselTranslateController from "../../container/Carousel/CarouselTranslate/Controller/CarouselTranslateController";
import CalcTranslateX from "../../container/Carousel/CalcTranslateX";
import CarouselOpacityController from "../../container/Carousel/CarouselOpacity/Controller/CarouselOpacityController";
import CastTranslateXToOpacity from "../../container/Carousel/CarouselOpacity/Model/CastTranslateXToOpacity";

/* DECLARE ACTIONS */
export type CarouselActions =
  | "POINTER_DOWN"
  | "POINTER_MOVE"
  | "POINTER_UP"
  | "INCREASE_INDEX"
  | "DECREASE_INDEX"
  | "SET_INDEX";

export type CarouselAction = {
  type: CarouselActions;
  //[name: string]: any;
  pageX?: number;
  pageY?: number;
  index?: number;
  //itemsLength?: number;
};

/* DECLARE STATE */
export interface CarouselState {
  //translateX: number;
  activeIndex: number;

  isTranslated: boolean;
}

export interface CarouselTranslateState extends CarouselState {
  translateX: number;
}

export interface CarouselOpacityState extends CarouselState {
  opacity: number;
}

export const initState: CarouselState = {
  //translateX: 0,
  activeIndex: 0,

  isTranslated: false,
};

export const useCarouselTranslate = (itemsLength: number) => {
  const controllerRef: React.MutableRefObject<ICarouselController | null> = useRef(
    null
  );
  const isInitRef: React.MutableRefObject<boolean> = useRef(false);

  if (isInitRef.current === false) {
    controllerRef.current = new CarouselTranslateController(
      new CalcTranslateX(),
      itemsLength
    );
    isInitRef.current = true;
  }

  if (controllerRef.current === null) throw new Error("No controller");

  const [state, dispatch] = useReducer(
    controllerRef.current.reducer,
    undefined,
    (): CarouselTranslateState => {
      const initState: CarouselTranslateState = {
        translateX: 0,

        activeIndex: 0,

        isTranslated: false,
      };

      return initState;
    }
  );

  controllerRef.current.dispatch = dispatch;
  controllerRef.current.containerRef = useRef(null);

  useEffect(() => {
    const controller = controllerRef.current;

    if (controller === null) throw new Error("No controller");

    //console.log(controller);
    if (!controller.containerRef || !controller.containerRef.current)
      throw new Error("No container ref");

    //console.log("Add event touchmove", controller.containerRef.current);
    controller.containerRef.current.addEventListener(
      "touchmove",
      controller.onTouchMove,
      { passive: false }
    );

    return () => {
      const controller = controllerRef.current;
      if (controller === null) throw new Error("No controller");

      if (!controller.containerRef || !controller.containerRef.current)
        throw new Error("No container ref");

      controller.containerRef.current.removeEventListener(
        "touchmove",
        controller.onTouchMove
      );
    };
  }, []);

  return {
    controller: controllerRef.current,
    translateX: (state as CarouselTranslateState).translateX,
    isTranslated: state.isTranslated,
    activeIndex: state.activeIndex,
  };
};

export const useCarouselOpacity = (itemsLength: number) => {
  const controllerRef: React.MutableRefObject<ICarouselController | null> = useRef(
    null
  );
  const isInitRef: React.MutableRefObject<boolean> = useRef(false);

  if (isInitRef.current === false) {
    controllerRef.current = new CarouselOpacityController(
      new CalcTranslateX(),
      new CastTranslateXToOpacity(),
      itemsLength
    );
    isInitRef.current = true;
  }

  if (controllerRef.current === null) throw new Error("No controller");

  const [state, dispatch] = useReducer(
    controllerRef.current.reducer,
    undefined,
    (): CarouselOpacityState => {
      const initState: CarouselOpacityState = {
        opacity: 1,

        activeIndex: 0,

        isTranslated: false,
      };

      return initState;
    }
  );

  controllerRef.current.dispatch = dispatch;
  controllerRef.current.itemsLength = itemsLength;
  controllerRef.current.containerRef = useRef(null);

  useEffect(() => {
    const controller = controllerRef.current;

    if (controller === null) throw new Error("No controller");

    if (!controller.containerRef || !controller.containerRef.current)
      throw new Error("No container ref");

    //console.log("Add event touchmove", controller.containerRef.current);
    controller.containerRef.current.addEventListener(
      "touchmove",
      controller.onTouchMove,
      { passive: false }
    );

    return () => {
      const controller = controllerRef.current;
      if (controller === null) throw new Error("No controller");

      if (!controller.containerRef || !controller.containerRef.current)
        throw new Error("No container ref");

      controller.containerRef.current.removeEventListener(
        "touchmove",
        controller.onTouchMove
      );
    };
  }, []);

  return {
    controller: controllerRef.current,
    opacity: (state as CarouselOpacityState).opacity,
    isTranslated: state.isTranslated,
    activeIndex: state.activeIndex,
  };
};
