import { sinDegrees, cosDegrees } from "utils-library-lost/MathF/MathF";

import { CFType, CFFormType } from "../types";

export const getTranslateByCircle = (
  radius: number,
  degrees: number
): string => {
  let x: number, y: number;

  /*const center = { x: 0, y: 0};
    x = center.x + radius * MathF.sinDegrees(degrees);
    y = center.y + radius * MathF.cosDegrees(degrees);*/

  x = radius * sinDegrees(degrees);
  y = radius * cosDegrees(degrees);

  return "translate(" + x + "px, " + y + "px)";
};

export const getDegrees = (
  index: number,
  type: CFType,
  formType: CFFormType,
  itemsLength: number,
  degreesAll: number,
  itemsLengthForDegreesCalc: number,
  degreesMarga: number
): number => {
  //console.log("degreesAll == " )

  //console.log("degrees == " + (index * (this.degreesAll / this.itemsLength - 1) + this.degreesMarga));

  if (type === "TEXT" && formType === "BOTTOM_HALF_CIRCLE" && itemsLength < 4) {
    if (index === 0) {
      return (
        index * (degreesAll / itemsLengthForDegreesCalc) + degreesMarga + 20
      );
    }

    if (index === itemsLength - 1) {
      return (
        index * (degreesAll / itemsLengthForDegreesCalc) + degreesMarga - 20
      );
    }
  }

  return index * (degreesAll / itemsLengthForDegreesCalc) + degreesMarga;
};
