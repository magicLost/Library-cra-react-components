import { ICFClasses, CFConfig, CFTitleStyle } from "./../types";

class ControlsFeatureClasses implements ICFClasses {
  classes: any;
  config: CFConfig;

  itemsLength = 0;
  itemsLengthForDegreesCalc = 0;

  radius = 100;
  degreesAll = 90;
  degreesMarga = 270;
  topRightBgClasses = " ";
  topLeftBgClasses = " ";
  bottomRightBgClasses = " ";
  bottomLeftBgClasses = "";
  hiddenBgClass = "";

  titleStyle: CFTitleStyle = {
    top: "0",
    left: "-210px",
    transformOrigin: "top left",
    transform: "rotate(45deg)"
  };

  constructor(itemsLength: number, classes: any, config: CFConfig) {
    this.classes = classes;
    this.config = config;

    this.topRightBgClasses = classes.TopRight;
    this.topLeftBgClasses = classes.TopLeft;
    this.bottomRightBgClasses = classes.BottomRight;
    this.bottomLeftBgClasses = classes.BottomLeft;
    this.hiddenBgClass = classes.Hidden;

    this.itemsLength = itemsLength;
    this.itemsLengthForDegreesCalc = this.itemsLength - 1;

    this.init();
  }

  init = () => {
    switch (this.config.formType) {
      case "CIRCLE":
        this.degreesAll = 360;
        this.itemsLengthForDegreesCalc = this.itemsLength;
        this.titleStyle = { top: "-160px", left: "-150px" };

        break;

      case "TOP_HALF_CIRCLE":
        this.degreesAll = 180;
        this.degreesMarga = 90;
        this.bottomLeftBgClasses += " " + this.hiddenBgClass;
        this.bottomRightBgClasses += " " + this.hiddenBgClass;
        this.titleStyle = { top: "-160px", left: "-150px" };

        break;

      case "BOTTOM_HALF_CIRCLE":
        this.degreesAll = 180;
        this.degreesMarga = 270;
        this.topLeftBgClasses += " " + this.hiddenBgClass;
        this.topRightBgClasses += " " + this.hiddenBgClass;
        this.titleStyle = { top: "150px", left: "-150px" };

        break;

      case "RIGHT_HALF_CIRCLE":
        this.degreesAll = 180;
        this.degreesMarga = 0;
        this.bottomLeftBgClasses += " " + this.hiddenBgClass;
        this.topLeftBgClasses += " " + this.hiddenBgClass;

        this.titleStyle = {
          top: "-170px",
          left: "120px",
          transformOrigin: "top left",
          transform: "rotate(60deg)"
        };

        break;

      case "LEFT_HALF_CIRCLE":
        this.degreesAll = 180;
        this.degreesMarga = 180;
        this.topRightBgClasses += " " + this.hiddenBgClass;
        this.bottomRightBgClasses += " " + this.hiddenBgClass;

        this.titleStyle = {
          top: "-170px",
          left: "-410px",
          transformOrigin: "top right",
          transform: "rotate(-60deg)"
        };

        break;

      case "TOP_RIGHT_QUARTER":
        this.degreesAll = 90;
        this.degreesMarga = 90;
        this.topLeftBgClasses += " " + this.hiddenBgClass;
        this.bottomRightBgClasses += " " + this.hiddenBgClass;
        this.bottomLeftBgClasses += " " + this.hiddenBgClass;

        this.titleStyle = {
          top: "-235px",
          left: "30px",
          transformOrigin: "top left",
          transform: "rotate(45deg)"
        };

        break;

      case "TOP_LEFT_QUARTER":
        this.degreesAll = 90;
        this.degreesMarga = 180;
        this.topRightBgClasses += " " + this.hiddenBgClass;
        this.bottomRightBgClasses += " " + this.hiddenBgClass;
        this.bottomLeftBgClasses += " " + this.hiddenBgClass;

        this.titleStyle = {
          top: "-30px",
          left: "-235px",
          transformOrigin: "top left",
          transform: "rotate(-45deg)"
        };

        break;

      case "BOTTOM_RIGHT_QUARTER":
        this.degreesAll = 90;
        this.degreesMarga = 0;
        this.topRightBgClasses += " " + this.hiddenBgClass;
        this.topLeftBgClasses += " " + this.hiddenBgClass;
        this.bottomLeftBgClasses += " " + this.hiddenBgClass;

        this.titleStyle = {
          top: "210px",
          left: "0",
          transformOrigin: "top left",
          transform: "rotate(-45deg)"
        };

        break;

      case "BOTTOM_LEFT_QUARTER":
        this.degreesAll = 90;
        this.degreesMarga = 270;
        this.topRightBgClasses += " " + this.hiddenBgClass;
        this.topLeftBgClasses += " " + this.hiddenBgClass;
        this.bottomRightBgClasses += " " + this.hiddenBgClass;

        this.titleStyle = {
          top: "0",
          left: "-210px",
          transformOrigin: "top left",
          transform: "rotate(45deg)"
        };

        break;

      default:
        throw new Error("Unknown form type == " + this.config.formType);
    }
  };
}

export default ControlsFeatureClasses;
