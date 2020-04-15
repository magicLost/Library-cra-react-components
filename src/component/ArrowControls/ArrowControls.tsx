import React, { CSSProperties } from 'react';
import classes from './ArrowControls.module.scss';
import pathToIcons from "./../../static/icons/ICONS.svg";
        
interface ArrowControlsProps  {
    activeIndex: number;
    length: number;
    arrowSizeClass: string;
    increaseActiveIndex: (event: any) => void | undefined;
    decreaseActiveIndex: (event: any) => void | undefined;
}

const arrowControls = ({activeIndex, increaseActiveIndex, decreaseActiveIndex, length, arrowSizeClass}: ArrowControlsProps) => {
    
    const rightArrowClasses = [ classes.RightArrow, arrowSizeClass ].join(' ');
    const leftArrowClasses = [ classes.LeftArrow, arrowSizeClass ].join(' ');

    const leftArrowStyle: CSSProperties | undefined = activeIndex <= 0 ? { visibility: "hidden" } : undefined;
    const rightArrowStyle: CSSProperties | undefined = activeIndex >= length - 1 ? { visibility: "hidden" } : undefined;

    return (
        
        <div className={classes.ArrowControls}>

            <button
                className={leftArrowClasses}
                onClick={decreaseActiveIndex}
                style={ leftArrowStyle }
                aria-label={"Показать предыдущий слайд"}
            >

                <svg
                    className={classes.LeftSvg}
                    width={"10"}
                    height={"10"}
                    viewBox="0 0 984 991.55"
                >
                    <use xlinkHref={pathToIcons + "#arrow"}></use>
                </svg>

            </button>

            <button
                className={rightArrowClasses}
                onClick={increaseActiveIndex}
                style={ rightArrowStyle }
                aria-label={"Показать следующий слайд"}
            >

                <svg
                    className={classes.RightSvg}
                    width={"10"}
                    height={"10"}
                    viewBox="0 0 984 991.55"
                >
                    <use xlinkHref={pathToIcons + "#arrow"}></use>
                </svg>

            </button>


        </div>
            
    );
};

export default arrowControls;
        