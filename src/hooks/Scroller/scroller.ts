import { useState, useRef, useEffect } from "react";
import { ScrollerState } from "./types";
import ScrollerController from "../../container/Scroller/Controller/ScrollerController";
import CalcTranslateX from "../../container/Scroller/Model/CalcTranslateX";
import IdentifyEvent from "../../container/Scroller/Model/IdentifyEvent";
import ShowContentHelper from "../../container/Scroller/Model/ShowContentHelper";

export const useScroller = (items: any[]) => {
  const controllerRef: React.MutableRefObject<ScrollerController | null> = useRef(
    null
  );

  const [state, setState] = useState(() => {
    controllerRef.current = new ScrollerController(
      new CalcTranslateX(),
      new IdentifyEvent(),
      new ShowContentHelper()
    );

    const initState: ScrollerState = {
      translateX: 0,
      isNeedScroller: false,

      numberOfActiveItems: 0
    };

    return initState;
  });

  if (controllerRef.current === null) throw new Error("No controller");


  useEffect(() => {

    if (controllerRef.current === null) throw new Error("No controller");

    const controller = controllerRef.current;

    //ADD TOUCH MOVE HANDLER WITH OPTIONS
    if(controller.containerRef === null || controller.containerRef.current === null) throw new Error("No list ref");

    controller.containerRef.current.addEventListener('touchmove', controller.onTouchMove, {passive: false});

    //ADD WINDOW RESIZE HANDLER
    window.addEventListener(
      "resize",
      controller.onWindowResize,
      false
    );

    return () => {
      if (controllerRef.current === null) throw new Error("No controller");

      const controller = controllerRef.current;

      //REMOVE TOUCH MOVE HANDLER WITH OPTIONS
      if(controller.containerRef === null || controller.containerRef.current === null) throw new Error("No list ref");

      controller.containerRef.current.removeEventListener('touchmove', controller.onTouchMove, false);

      //ADD WINDOW RESIZE HANDLER
      window.removeEventListener(
        "resize",
        controller.onWindowResize,
        false
      );
    };
  }, []);

  useEffect(() => {
    if (controllerRef.current === null) throw new Error("No controller");

    //console.log("controller.containerRef", controllerRef.current.containerRef);
    //console.log("controller.listRef", controllerRef.current.listRef);
    //console.log("controller.itemRef", controllerRef.current.itemRef);

    controllerRef.current.numberOfItems = items.length;
    controllerRef.current.init();
  }, [items]);

  controllerRef.current.containerRef = useRef(null);
  controllerRef.current.listRef = useRef(null);
  controllerRef.current.itemRef = useRef(null);

  controllerRef.current.setState = setState;

  return {
    controller: controllerRef.current,
    translateX: state.translateX,
    isNeedScroller: state.isNeedScroller,
    numberOfActiveItems: state.numberOfActiveItems
  };
};
