import React from "react";
import { action } from "@storybook/addon-actions";
//import { withKnobs, object } from "@storybook/addon-knobs/react";
import { exampleSocial } from "../../../data/listSvg";

import ListSvg from "./ListSvg";

export default {
  component: ListSvg,
  title: "ListSvg/ListSvg",
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
  <ListSvg
    title={"Мы в социальных сетях"}
    items={exampleSocial}
    typeSvg={"SOCIAL"}
  />
);
