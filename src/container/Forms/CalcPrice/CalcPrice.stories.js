import React from "react";
import { action } from "@storybook/addon-actions";
//import { withKnobs, object } from "@storybook/addon-knobs/react";
import CalcPrice from "./CalcPrice";
import Form from "../../../component/Form/Form";

export default {
  component: CalcPrice,
  title: "Forms/CalcPrice",
  decorators: [
    (story) => (
      <div
        style={{
          //backgroundColor: "rgba(0,0,0,0.05)",
          //borderRadius: "5px",
          width: "700px",
          //height: "300px",
          margin: "20px auto",
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

export const Default = () => {
  return <CalcPrice Form={Form} />;
};
