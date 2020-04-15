import { CFState } from "../../hooks/ControlsFeature/types";
import ControlsFeatureClasses from "./Model/ControlsFeatureClasses";

export type CFItem = {
  title: string;
  href?: string;
  viewBox?: string;
};

export type CFType = "TEXT" | "SVG";
export type CFFormType =
  | "CIRCLE"
  | "TOP_HALF_CIRCLE"
  | "BOTTOM_HALF_CIRCLE"
  | "RIGHT_HALF_CIRCLE"
  | "LEFT_HALF_CIRCLE"
  | "TOP_RIGHT_QUARTER"
  | "TOP_LEFT_QUARTER"
  | "BOTTOM_RIGHT_QUARTER"
  | "BOTTOM_LEFT_QUARTER";

export type CFConfig = {
  type: CFType;
  formType: CFFormType;
  isShowTitle: boolean;
  isMainItemText: boolean;
  mainDivStyle: object;
  mainItemStyle: object;
};

export type CFTitleStyle = {
  top: string;
  left: string;
  transformOrigin?: string;
  transform?: string;
};

export interface IControlsFeatureController {
  items: CFItem[];

  cfClasses: ControlsFeatureClasses;

  mainItemRef: React.RefObject<HTMLDivElement> | null = null;

  setState: React.Dispatch<((prevState: CFState) => CFState) | CFState> | null;

  itemClickHandler: (event: any) => undefined | void;

  /* LISTENERS */
  onMainItemMouseDown: (event: any) => undefined | void;

  onMainItemTouchStart: (event: any) => undefined | void;
  onMainItemTouchMove: (event: any) => undefined | void;
  onMainItemTouchEnd: (event: any) => undefined | void;

  onItemMouseUp: (event: any) => undefined | void;

  onItemMouseEnter: (event: any) => undefined | void;
  onItemMouseLeave: (event: any) => undefined | void;

  onWindowMouseUp: (event: any) => undefined | void;
}

export interface ICFClasses {
  classes: any;
  config: CFConfig;

  itemsLength: number;
  itemsLengthForDegreesCalc: number;

  radius: number;
  degreesAll: number;
  degreesMarga: number;
  topRightBgClasses: string;
  topLeftBgClasses: string;
  bottomRightBgClasses: string;
  bottomLeftBgClasses: string;
  hiddenBgClass: string;

  titleStyle: CFTitleStyle;

  init: () => void | undefined;
}
