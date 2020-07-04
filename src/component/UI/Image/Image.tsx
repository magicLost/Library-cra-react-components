import React from "react";
import classes from "./Image.module.scss";
//import {SrcSet} from "../ImgWithLoading/ImgWithLoading";

export type SrcSet = {
  srcSet: string;
  media: string;
};

export interface ImageProps {
  alt: string;
  isActive?: boolean;
  isHidden?: boolean;
  src: string;
  onImageClick?: (event: any) => void | undefined;
  index?: number;
  srcSets?: SrcSet[];
  onLoad?: (event: any) => void | undefined;
  onError?: (event: any) => void | undefined;
}

const Image = ({
  alt,
  isActive = true,
  isHidden = false,
  src,
  onImageClick,
  onLoad = undefined,
  onError = undefined,
  index = 0,
  srcSets = [],
}: ImageProps) => {
  const getImageWithSrcSet = (isHidden: boolean, isActive: boolean) => {
    const sources = srcSets.map((value, index) => {
      const imageSrcSet = isActive ? value.srcSet : "";
      const imageDataSrcSet = isActive ? undefined : value.srcSet;

      return (
        <source
          key={value.srcSet + index}
          media={value.media}
          srcSet={imageSrcSet}
          data-srcset={imageDataSrcSet}
        />
      );
    });

    const image = getImageTag(isHidden, isActive);

    return (
      <picture>
        {sources}

        {image}
      </picture>
    );
  };

  //style={{visibility: isLoad ? 'visible' : 'hidden'}}
  const getImageTag = (isHidden: boolean, isActive: boolean) => {
    const imageSrc = isActive ? src : "";
    const imageDataSrc = isActive ? undefined : src;
    const imageClasses = isHidden
      ? `${classes.Image} ${classes.hidden}`
      : classes.Image;

    return (
      <img
        className={imageClasses}
        data-index={index}
        onClick={onImageClick}
        src={imageSrc}
        data-src={imageDataSrc}
        alt={alt}
        onError={onError}
        onLoad={onLoad}
      />
    );
  };

  const image =
    srcSets.length > 0
      ? getImageWithSrcSet(isHidden, isActive)
      : getImageTag(isHidden, isActive);

  return <>{image}</>;
};

export default Image;
