import React from "react";
import { action } from "@storybook/addon-actions";
//import { withKnobs, object } from "@storybook/addon-knobs/react";

import ControlsFeature from "./ControlsFeature";
//import { useCarouselOpacity } from "../../../hooks/Carousel/carousel";
import { exampleItemsControls } from "../../data/controlsFeature";

export default {
  component: ControlsFeature,
  title: "ControlsFeature",
  decorators: [
    (story) => (
      <div
        style={{
          //backgroundColor: "rgba(0,0,0,0.05)",
          //borderRadius: "5px",
          width: "700px",
          height: "300px",
          margin: "270px auto",
          //padding: "20px",
        }}
      >
        {story()}
      </div>
    ),
  ],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const withSvg = () => {
  return (
    <ControlsFeature
      itemClickHandler={action("ControlsFeature-itemClickHandler")}
      items={exampleItemsControls}
      config={{
        type: "SVG",
        formType: "CIRCLE",
        isShowTitle: true,
        isMainItemText: false,
        mainDivStyle: { top: "-40px" },
        mainItemStyle: { backgroundColor: "#fafafa" },
      }}
    />
  );
};

export const text = () => {
  return (
    <ControlsFeature
      itemClickHandler={action("ControlsFeature-itemClickHandler")}
      items={[
        { title: "Супер" },
        { title: "Супер-пупер" },
        { title: "Не очень" },
        { title: "Хреновый" },
        { title: "Ваще гамно" },
      ]}
      config={{
        type: "TEXT",
        formType: "CIRCLE",
        isShowTitle: false,
        isMainItemText: true,
        mainDivStyle: { top: "-40px" },
        mainItemStyle: { backgroundColor: "white" },
      }}
    />
  );
};
