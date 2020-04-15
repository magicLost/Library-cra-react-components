import React from "react";
import { action } from "@storybook/addon-actions";
//import { withKnobs, object } from "@storybook/addon-knobs/react";

import Modal from "./Modal";

export default {
  component: Modal,
  title: "Modal",
  /* decorators: [
    (story) => (
      <div style={{ width: "400px", margin: "auto", padding: "10px" }}>
        {story()}
      </div>
    ),
  ], */
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const Default = () => (
  <Modal show={true} onClose={action("onClose")} type={"CENTER"}>
    <div style={{ width: "100%", height: "400px" }}>
      <h3 style={{ textAlign: "center" }}>Modal, mother fukka....</h3>
    </div>
  </Modal>
);

export const LeftTab = () => (
  <Modal show={true} onClose={action("onClose")} type={"LEFT_TAB"}>
    <div style={{ width: "100%", height: "400px" }}>
      <h3 style={{ textAlign: "center" }}>Modal, mother fukka....</h3>
    </div>
  </Modal>
);
