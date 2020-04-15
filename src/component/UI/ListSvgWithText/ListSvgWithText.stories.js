import React from "react";
import { action } from "@storybook/addon-actions";
//import { withKnobs, object } from "@storybook/addon-knobs/react";
import { exampleContacts } from "../../../data/listSvg";

import ListSvgWithText from "./ListSvgWithText";

export default {
  component: ListSvgWithText,
  title: "ListSvg/ListSvgWithText",
  decorators: [
    (story) => <div style={{ width: "500px", margin: "auto" }}>{story()}</div>,
  ],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const Default = () => (
  <ListSvgWithText title={"Наши контакты"} items={exampleContacts} />
);
