import React from "react";
import { action } from "@storybook/addon-actions";
//import { withKnobs, object } from "@storybook/addon-knobs/react";
import { exampleMainMenuItems } from "../../data/menu";
import { BrowserRouter } from "react-router-dom";

import MenuTab from "./MenuTab";

export default {
  component: MenuTab,
  title: "MenuTab",
  decorators: [
    (story) => <div style={{ width: "400px", margin: "auto" }}>{story()}</div>,
  ],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const Default = () => (
  <BrowserRouter>
    <MenuTab
      isVisible={true}
      items={exampleMainMenuItems}
      layer={0}
      backgroundColors={["white", "#f7f7f7", "gray"]}
      initHeight={220}
      initTopBottomPadding={20}
      onCloseMenu={action("onCloseMenu")}
    />
  </BrowserRouter>
);
