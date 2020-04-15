import React from "react";
import { action } from "@storybook/addon-actions";
//import { withKnobs, object } from "@storybook/addon-knobs/react";

import CarouselOpacity from "./CarouselOpacity";
import { useCarouselOpacity } from "../../../hooks/Carousel/carousel";

export default {
  component: CarouselOpacity,
  title: "Carousel/CarouselOpacity",
  decorators: [
    (story) => (
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.05)",
          borderRadius: "5px",
          width: "700px",
          height: "300px",
          margin: "20px auto",
          padding: "20px",
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

const getCarouselItems = (itemClass, getItemStyle, activeIndex) => {
  console.log("GET CarouselTranslate items");

  return [0, 1, 2, 3, 4].map((item, index) => {
    let style = getItemStyle(index);

    //console.log("isActive ", index === activeIndex);

    return (
      <li key={itemClass + index} className={itemClass} style={style}>
        <div>
          <h3>{`Item number ${index + 1}`}</h3>
        </div>
      </li>
    );
  });
};

export const Default = () => {
  const items = [0, 1, 2, 3, 4];

  const { opacity, isTranslated, activeIndex, controller } = useCarouselOpacity(
    items.length
  );

  return (
    <CarouselOpacity
      items={items}
      getItems={getCarouselItems}
      activeIndex={activeIndex}
      opacity={opacity}
      isTranslated={isTranslated}
      controller={controller}
    />
  );
};
