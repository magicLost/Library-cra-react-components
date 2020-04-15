import { useState, useRef, useEffect, MutableRefObject } from "react";
import {
  CFConfig,
  IControlsFeatureController,
} from "./../../container/ControlsFeature/types";
import { CFState } from "./types";

import { CFItem } from "./../../container/ControlsFeature/types";
import ControlsFeatureController from "../../container/ControlsFeature/Controller/ControlsFeatureController";
import ControlsFeatureClasses from "../../container/ControlsFeature/Model/ControlsFeatureClasses";

export const useControlsFeature = (
  items: CFItem[],
  itemClickHandler: (event: any) => void | undefined,
  classes: any,
  config: CFConfig
) => {
  const controllerRef: MutableRefObject<IControlsFeatureController | null> = useRef(
    null
  );

  const [state, setState] = useState(
    (): CFState => {
      const cfClasses = new ControlsFeatureClasses(
        items.length,
        classes,
        config
      );

      //const controller: IControlsFeatureController = new ControlsFeatureController(items, cfClasses, itemClickHandler);
      controllerRef.current = new ControlsFeatureController(
        items,
        cfClasses,
        itemClickHandler
      );

      return {
        //controller: controller,
        isShowItems: false,
        title: "",
        mainItemText: items[1].title,
      };
    }
  );

  if (controllerRef.current === null) throw new Error("No controller");

  useEffect(() => {
    if (controllerRef.current === null) throw new Error("No controller");

    const controller = controllerRef.current;

    //ADD TOUCH MOVE HANDLER WITH OPTIONS
    if (
      controller.mainItemRef === null ||
      controller.mainItemRef.current === null
    )
      throw new Error("No main item ref");

    controller.mainItemRef.current.addEventListener(
      "touchmove",
      controller.onMainItemTouchMove,
      { passive: false }
    );

    return () => {
      if (controllerRef.current === null) throw new Error("No controller");

      const controller = controllerRef.current;

      //REMOVE TOUCH MOVE HANDLER WITH OPTIONS
      if (
        controller.mainItemRef === null ||
        controller.mainItemRef.current === null
      )
        throw new Error("No main item ref");

      controller.mainItemRef.current.removeEventListener(
        "touchmove",
        controller.onMainItemTouchMove,
        false
      );
    };
  }, []);

  controllerRef.current.setState = setState;
  controllerRef.current.mainItemRef = useRef(null);

  return {
    controller: controllerRef.current,
    isShowItems: state.isShowItems,
    title: state.title,
    mainItemText: state.mainItemText,
    mainItemRef: controllerRef.current.mainItemRef,
  };
};
