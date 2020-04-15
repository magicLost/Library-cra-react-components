import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from "@testing-library/react";
import { configure } from "@testing-library/dom";
import "../Carousel/Carousel/CarouselOpacity/node_modules/@testing-library/jest-dom/extend-expect";

import ControlsFeature from "./ControlsFeature";
import classes from "./ControlsFeature.module.scss";

describe("ControlsFeature", () => {
  let _render = null;

  describe("Render and props test", () => {
    beforeEach(() => {
      _render = render(<ControlsFeature />);
    });

    afterEach(cleanup);

    describe("", () => {
      test("", () => {});
    });
  });
});
