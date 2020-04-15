import React from "react";
import { action } from "@storybook/addon-actions";
//import { withKnobs, object } from "@storybook/addon-knobs/react";

import Scroller from "./Scroller";

export default {
  component: Scroller,
  title: "Scroller",
  decorators: [
    (story) => (
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.05)",
          borderRadius: "5px",
          width: "600px",
          margin: "20px auto",
          padding: "10px",
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

const getScrollerItems = (
  itemClass,
  onItemClick,
  numberOfActiveItems,
  itemRef,
  isIntersect
) => {
  console.log("get scroller items");
  return [0, 1, 2, 3, 4, 5, 6, 7].map((value, index) => {
    return (
      <li
        key={"itemClass" + index}
        className={itemClass}
        ref={index === 0 ? itemRef : undefined}
        data-index={index}
      >
        <div
          style={{
            backgroundColor: "white",
            boxShadow:
              "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
            borderRadius: "5px",
            width: "150px",
            height: "100px",
          }}
          data-index={index}
        >
          <div
            style={{ width: "100%", height: "100%" }}
            data-index={index}
            onClick={onItemClick}
          >
            <h4 style={{ textAlign: "center" }}>{value}</h4>
          </div>
        </div>
      </li>
    );
  });
};

const getTwoScrollerItems = (
  itemClass,
  onItemClick,
  numberOfActiveItems,
  itemRef,
  isIntersect
) => {
  console.log("get scroller items");
  return [0, 1].map((value, index) => {
    return (
      <li
        key={"itemClass" + index}
        className={itemClass}
        ref={index === 0 ? itemRef : undefined}
        data-index={index}
      >
        <div
          style={{
            backgroundColor: "white",
            boxShadow:
              "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
            borderRadius: "5px",
            width: "150px",
            height: "100px",
          }}
          data-index={index}
        >
          <div
            style={{ width: "100%", height: "100%" }}
            data-index={index}
            onClick={onItemClick}
          >
            <h4 style={{ textAlign: "center" }}>{value}</h4>
          </div>
        </div>
      </li>
    );
  });
};

export const Default = () => (
  <Scroller
    items={[0, 1, 2, 3, 4, 5, 6, 7]}
    getItems={getScrollerItems}
    itemClickHandler={action("itemClickHandler")}
    isIntersect={true}
  />
);

export const NoScroll = () => (
  <Scroller
    items={[0, 1]}
    getItems={getTwoScrollerItems}
    itemClickHandler={action("itemClickHandler")}
    isIntersect={true}
  />
);
