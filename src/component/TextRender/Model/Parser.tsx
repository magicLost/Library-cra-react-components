import {
  ParentElement,
  ChildElementOptions,
  ChildElement,
  HeaderOptions,
  ParentElementType,
} from "../../../data/textRender";
import React from "react";
import { Link } from "react-router-dom";

export interface IParser {
  //classes.List, classes.Anchor
  parse(elements: ParentElement[], classes: any): JSX.Element[];
}

class Parser implements IParser {
  parse(elements: ParentElement[], classes: any) {
    return elements.map((parentElementDesc, index) => {
      if (parentElementDesc.type === "H") {
        if (parentElementDesc.options === undefined)
          throw new Error("No options");
        return this.getHeader(parentElementDesc.options, classes.Header);
      }

      if (parentElementDesc.children === undefined)
        throw new Error("No children");
      return this.getParagraphOrList(
        parentElementDesc.type,
        parentElementDesc.children,
        classes
      );
    });
  }

  getParagraphOrList = (
    type: ParentElementType,
    children: ChildElement[],
    classes: any
  ) => {
    const elements = children.map((element, index) => {
      let elem: JSX.Element | null = null;
      const isLi = type === "LIST";

      switch (element.type) {
        //case "H": elem = this.getHeader(element.options, classes.Header);break;

        case "TEXT":
          elem = this.getText(element.options, isLi);
          break;

        case "ANCHOR":
          elem = this.getAnchor(element.options, classes.Anchor, isLi, false);
          break;

        case "LINK":
          elem = this.getAnchor(element.options, classes.Anchor, isLi, true);
          break;

        case "SPAN":
          elem = this.getSpan(element.options, classes.Span, isLi);
          break;

        default:
          throw new Error("No realization for " + element.type);
      }

      //elem = type === "LIST" ? <li>{elem}</li> : elem;

      //this.addKeyToElement(elem);

      return elem;
    });

    const key = this.getKey();

    return type === "LIST" ? (
      <ul className={classes.List} key={key}>
        {elements}
      </ul>
    ) : (
      <p className={classes.Paragraph} key={key}>
        {elements}
      </p>
    );
  };

  getKey = () => {
    return Math.floor(Math.random() * (12000 - 38)) + 1;
  };

  /*  addKeyToElement = (element: JSX.Element): JSX.Element => {

        element.key = this.getKey();

        return element;
    } */

  getHeader = (options: HeaderOptions, headerClass: string): JSX.Element => {
    const key = this.getKey();

    switch (options.hType) {
      case "h1":
        return (
          <h1 key={key} className={headerClass}>
            {options.text}
          </h1>
        );
      case "h2":
        return (
          <h2 key={key} className={headerClass}>
            {options.text}
          </h2>
        );
      case "h3":
        return (
          <h3 key={key} className={headerClass}>
            {options.text}
          </h3>
        );
      case "h4":
        return (
          <h4 key={key} className={headerClass}>
            {options.text}
          </h4>
        );
      case "h5":
        return (
          <h5 key={key} className={headerClass}>
            {options.text}
          </h5>
        );

      default:
        throw new Error("No implementation for" + options.hType);
    }
  };

  getAnchor = (
    options: ChildElementOptions,
    linkClass: string,
    isLi: boolean,
    isRouter: boolean
  ): JSX.Element => {
    const key = this.getKey();

    if (isLi === true) {
      if (isRouter === true) {
        return (
          <li key={key}>
            <Link className={linkClass} to={options.href as string}>
              {options.label}
            </Link>
          </li>
        );
      } else {
        return (
          <li key={key}>
            <a className={linkClass} href={options.href}>
              {options.label}
            </a>
          </li>
        );
      }
    } else {
      if (isRouter === true) {
        return (
          <Link key={key} className={linkClass} to={options.href as string}>
            {options.label}
          </Link>
        );
      } else {
        return (
          <a key={key} className={linkClass} href={options.href}>
            {options.label}
          </a>
        );
      }
    }
  };

  getSpan = (
    options: ChildElementOptions,
    spanClass: string,
    isLi: boolean
  ): JSX.Element => {
    const key = this.getKey();

    if (isLi === true) {
      return (
        <li key={key}>
          <span className={spanClass}>{options.text}</span>
        </li>
      );
    } else {
      return (
        <span key={key} className={spanClass}>
          {options.text}
        </span>
      );
    }
  };

  getText = (options: ChildElementOptions, isLi: boolean): JSX.Element => {
    const key = this.getKey();

    if (isLi === true) {
      return (
        <li key={key}>
          <>{options.text}</>
        </li>
      );
    } else {
      return <React.Fragment key={key}>{options.text}</React.Fragment>;
    }
  };
}

export default Parser;
