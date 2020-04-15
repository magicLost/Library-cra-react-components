import React from "react";
import { action } from "@storybook/addon-actions";
//import { withKnobs, object } from "@storybook/addon-knobs/react";
import {
  exampleFormElementsMap,
  exampleFormElementsState,
} from "../../data/form/form";

import Form from "./Form";

export default {
  component: Form,
  title: "From",
  decorators: [
    (story) => (
      <div style={{ width: "400px", margin: "auto", padding: "20px" }}>
        {story()}
      </div>
    ),
  ],
  //decorators: [withKnobs],
  // Our exports that end in "Data" are not stories.
  excludeStories: /.*Data$/,
};

export const Default = () => (
  <Form
    formError={""}
    formMessage={""}
    formElementsState={exampleFormElementsState}
    elementsDescs={exampleFormElementsMap}
    submitButtonLabel={"Отправить"}
    onChange={action("onChange")}
    onClear={action("onClear")}
    onSubmit={(event) => {
      event.preventDefault();
      console.log("onSubmit");
    }}
    isLoading={false}
  />
);

export const Loading = () => (
  <Form
    formError={""}
    formMessage={""}
    formElementsState={exampleFormElementsState}
    elementsDescs={exampleFormElementsMap}
    submitButtonLabel={"Отправить"}
    onChange={action("onChange")}
    onClear={action("onClear")}
    onSubmit={(event) => {
      event.preventDefault();
      console.log("onSubmit");
    }}
    isLoading={true}
  />
);
