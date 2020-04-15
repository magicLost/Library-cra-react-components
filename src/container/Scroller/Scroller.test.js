import React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from "@testing-library/react";
import { configure } from "@testing-library/dom";
import "../Carousel/Carousel/CarouselOpacity/node_modules/@testing-library/jest-dom/extend-expect";

import Scroller from "./Scroller";
import classes from "./Scroller.module.scss";

const items = [1, 2, 3, 4];

const getItems = (itemClass, onItemClick, numberOfActiveItems, itemRef) => {
  return items.map((value, index) => {
    //console.log("get scroller items", numberOfActiveItems, index);
    let isActive = index + 1 <= numberOfActiveItems;

    return (
      <li
        key={itemClass + index}
        className={itemClass}
        ref={itemRef}
        data-index={index}
      >
        <div>
          <button data-index={index} onClick={onItemClick}>
            {"Hello"}
          </button>
        </div>
      </li>
    );
  });
};

describe("Scroller", () => {
  let _render = null;
  window.addEventListener = jest.fn();

  describe("Render and props test", () => {
    beforeEach(() => {
      //window.addEventListener.mockClear();

      _render = render(
        <Scroller
          items={items}
          type="hello"
          itemClickHandler={() => {
            console.log("hello");
          }}
          getItems={getItems}
        />
      );
    });

    afterEach(cleanup);

    describe("Render init", () => {
      test("It must render 4 items with buttons", () => {
        const buttons = _render.getAllByText("Hello");
        expect(buttons).toHaveLength(4);

        //console.log(buttons[1]);
        expect(document.querySelector("button")).toHaveAttribute(
          "data-index",
          "0"
        );
        expect(buttons[1]).toHaveAttribute("data-index", "1");

        /* const items = wrapper.find('.' + classes.Item);
                expect(items).toHaveLength(4);
            
                const buttons = wrapper.find('button');
                expect(buttons).toHaveLength(4); */
      });

      test("Items list must have style justifyContent - center", () => {
        const list = document.querySelector("." + classes.ItemsList);
        //console.log(list);
        expect(list).toHaveAttribute("style", "justify-content: center;");

        //const itemsList = wrapper.find('.' + classes.ItemsList);
        //expect(itemsList.getElement().props.style).toHaveProperty("justifyContent", "center");
      });

      /* test("Must add window resize event listener", () => {
                //expect(window.addEventListener).toHaveBeenNthCalledWith( 3, 'error', '[Function handleWindowError]');
            
                expect(12).toEqual(12);
            });  */
    });
  });
});
