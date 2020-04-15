import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
//import { withKnobs, object } from "@storybook/addon-knobs/react";
import Checkbox from "./Checkbox";

export default {
  component: Checkbox,
  title: "FormElements/Checkbox",
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
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      elementAttrs={{ id: "hello1234" }}
      labelValue={"Super checkbox"}
      name={"checkbox"}
      value={"checkbox_value"}
      onChange={() => setChecked(!checked)}
      checked={checked}
      disabled={false}
    />
  );
};
