import React, { useState } from "react";
import classes from "./ImageSharp.module.scss";
import Image from "../Image/Image";

interface IImageSharpProps {
  base64: string;
  src: string;
  srcSet: any;
}

//background div - write media queries for all sizes
//first show div with base64 background image
//then on load hide div
const ImageSharp = ({ base64, src, srcSet }: IImageSharpProps) => {
  const [isLoad, setIsLoad] = useState(true);
  const [error, setError] = useState("");

  //const srcAttr = isLoad || error ? base64 : src;

  const onLoad = () => {
    console.log("Load Image");
    setIsLoad(false);
  };

  const onError = () => {
    console.log("Error Image");

    /* TODO: WHEN WE USE BLANK SRC WE TRIGGER ERROR EVENT AND WE DO NOT HAVE MECANIZM TO DELETE THIS ERROR WHEN WE USE NORMAL SRC */

    setError(
      "Упс! Фотка не хочет загружаться... Попробуйте перезагрузить страницу."
    );
  };

  const base64Classes = isLoad || error ? classes.image : classes.hidden;
  const isShowMainPhoto = !isLoad && !error;

  return (
    <>
      <img className={base64Classes} src={base64} />

      <Image
        src={src}
        alt={""}
        isHidden={!isShowMainPhoto}
        onLoad={onLoad}
        onError={onError}
      />
    </>
  );
};

export default ImageSharp;
