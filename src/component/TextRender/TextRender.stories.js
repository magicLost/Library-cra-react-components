import React from "react";
import { action } from "@storybook/addon-actions";
//import { withKnobs, object } from "@storybook/addon-knobs/react";
import { textToRenderExample } from "../../data/textRender";
import { BrowserRouter } from "react-router-dom";

import TextRender from "./TextRender";

export default {
  component: TextRender,
  title: "TextRender",
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
  <BrowserRouter>
    <TextRender textToParse={textToRenderExample} />
  </BrowserRouter>
);
