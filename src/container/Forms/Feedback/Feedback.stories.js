import React from "react";
import { action } from "@storybook/addon-actions";
//import { withKnobs, object } from "@storybook/addon-knobs/react";
import { sendPostWithJsonResponse } from "utils-library-lost/Fetch/Fetch";
import Feedback from "./Feedback";
import Form from "../../../component/Form/Form";

export default {
  component: Feedback,
  title: "Forms/Feedback",
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
  return (
    <Feedback
      url={`http://localhost:3000/test/form/fail`}
      sendPostWithJsonResponse={sendPostWithJsonResponse}
      hiddenFields={[]}
      isCallMe={false}
      successMessage={"Все ОК!!!"}
      getToken={() => "token"}
      Form={Form}
    />
  );
};

export const CallMe = () => {
  return (
    <Feedback
      url={`http://localhost:3000/test/form/success`}
      sendPostWithJsonResponse={sendPostWithJsonResponse}
      hiddenFields={[]}
      isCallMe={true}
      successMessage={"Все ОК!!!"}
      getToken={() => "token"}
      Form={Form}
    />
  );
};
