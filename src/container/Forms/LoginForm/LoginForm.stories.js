import React from "react";
import { action } from "@storybook/addon-actions";
//import { withKnobs, object } from "@storybook/addon-knobs/react";
import { sendPostWithJsonResponse } from "utils-library-lost/Fetch/Fetch";
import LoginForm from "./LoginForm";

export default {
  component: LoginForm,
  title: "Forms/LoginForm",
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
    <LoginForm
      url={`http://localhost:3000/api/v1/users/login`}
      sendPostWithJsonResponse={sendPostWithJsonResponse}
      successMessage={"Все пучком."}
      onSuccess={(user) => {
        console.log(user);
      }}
      getToken={() => "token"}
    />
  );
};
