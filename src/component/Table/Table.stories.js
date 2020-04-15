import React from "react";
import { action } from "@storybook/addon-actions";
//import { withKnobs, object } from "@storybook/addon-knobs/react";
import { exampleTableData } from "../../data/table";

import Table from "./Table";

export default {
  component: Table,
  title: "Table",
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

export const Default = () => <Table table={exampleTableData} />;
