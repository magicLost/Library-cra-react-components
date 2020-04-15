import React from 'react';
import IdentifyEvent, {EVENT_TYPE} from "../Model/IdentifyEvent"
import CalcTranslateX from "../Model/CalcTranslateX";
import ShowContentHelper from "../Model/ShowContentHelper";
import { CSSProperties } from "react";
import {ScrollerState} from '../../../../hooks/Scrollers/Scroller/types';



class ScrollerController{

    calcTranslateX: CalcTranslateX;
    eventTyper: IdentifyEvent;
    showContentManager: ShowContentHelper;

    itemRef: React.RefObject<HTMLLIElement> | null = null;
    listRef: React.RefObject<HTMLUListElement> | null = null;
    containerRef: React.RefObject<HTMLDivElement> | null = null;
    //dispatch = null;
    setState: React.Dispatch<((prevState: ScrollerState) => ScrollerState) | ScrollerState> | null = null;

    
    //isNeedScroller = false;
    numberOfItems = 0;
    listStyle: CSSProperties = {};
    eventType: EVENT_TYPE | '' = '';

    constructor(calc: CalcTranslateX, eventTyper: IdentifyEvent, showContentManager: ShowContentHelper){
        
        this.calcTranslateX = calc;
        this.eventTyper = eventTyper;
        this.showContentManager = showContentManager;
    }

    init = () => {

        if(this.listRef === null || this.itemRef === null)
            throw new Error("NO listRef or itemRef");

        this.calcTranslateX.setValues(this.listRef, this.itemRef, this.numberOfItems);

        this.calcTranslateX.translateX = 0;
    
        const isNeedScroller = this.calcTranslateX.isNeedScroller();

        this.showContentManager.init(this.calcTranslateX.listWidth, this.calcTranslateX.itemWidth, this.numberOfItems);
    
        if(this.setState === null)
            throw new Error("No state");

        this.setState((prevState: ScrollerState) => {

            /*if(prevState.isNeedScroller !== isNeedScroller){
                return { ...prevState, isNeedScroller: isNeedScroller };
            }
        
            return prevState;*/

            return { 
                ...prevState, 
                isNeedScroller: isNeedScroller, 
                translateX: 0,
                numberOfActiveItems: this.showContentManager.numberOfActiveItems 
            };

        });
        
    
    };

    getTranslateX = (): number => {

        return this.calcTranslateX.translateX;

    };

    onWindowResize = () => {

        if(this.listRef === null || this.itemRef === null) 
            throw new Error("No listRef or itemRef");

        this.calcTranslateX.setValues(this.listRef, this.itemRef, this.numberOfItems);
        //this.calcTranslateX.offsetX = this.containerRef.current.getBoundingClientRect().x;//right
    
        const isNeedScroller = this.calcTranslateX.isNeedScroller();
        //setValues(listWidth, itemWidth, numberOfItems, minTranslateOffset, maxTranslateOffset);
    
        if(this.setState === null) throw new Error("No state");

        this.setState((prevState: ScrollerState) => {

            if(prevState.isNeedScroller === false){
    
                if(isNeedScroller === false){
        
                    return prevState;
        
                }else{
        
                    return { ...prevState, isNeedScroller: true };
        
                }
        
            }else{
        
                if(isNeedScroller === false){
                    return {
                        ...prevState,
                        isNeedScroller: false,
                        translateX: 0
                    };
                }else{
        
                    //check if translateX is out offsets
                    //return translateX > this.maxTranslateOffset || translateX < this.minTranslateOffset;
                    let translateX = prevState.translateX;

                    if(translateX > this.calcTranslateX.maxTranslateOffset){
        
                        translateX = this.calcTranslateX.maxTranslateOffset;
        
                    }else if(translateX < this.calcTranslateX.minTranslateOffset){
        
                        translateX = this.calcTranslateX.minTranslateOffset;
        
                    }
        
                    if(translateX !== prevState.translateX){
                        return { ...prevState, translateX: translateX };
                    }
        
                    return prevState;
        
                }
        
            }

        });
    
    
    };

    onMouseDown = (event: any) => {

        //console.log('Scroller onMouseDown');
        event.preventDefault();
        event.stopPropagation();

        this.onPointerDown(event.pageX, event.pageY);

        window.addEventListener('mousemove', this.onMouseMove, false);
        window.addEventListener('mouseup', this.onMouseUp, false);

    };

    onMouseMove = (event: any) => {
        //console.log('Scroller onMouseMove');

        event.preventDefault();
        event.stopPropagation();

        //console.log("onMouseMove");

        this.onPointerMove(event.pageX, event.pageY);

    };

    onMouseUp = (event: any) => {
        //console.log('Scroller onMouseUp');

        event.preventDefault();
        event.stopPropagation();

        this.onPointerUp(event.pageX, event.pageY);

        window.removeEventListener('mousemove', this.onMouseMove, false);
        window.removeEventListener('mouseup', this.onMouseUp, false);

    };

    onTouchStart = (event: any) => {

        //console.log('Scroller onTouchStart');
        //event.preventDefault();
        //event.stopPropagation();

        const touch = event.changedTouches[0];

        this.onPointerDown(touch.pageX, touch.pageY);

    };

    onTouchMove = (event: any) => {

        //console.log('Scroller onTouchMove');

        const touch = event.changedTouches[0];

        this.calcTranslateX.onPointerMove(touch.pageX, touch.pageY);

        if(this.calcTranslateX.isYScroll) return;

        event.preventDefault();
        event.stopPropagation();

        this.onPointerMove(touch.pageX, touch.pageY);

    };

    onTouchEnd = (event: any) => {

        //console.log('Scroller onTouchEnd');
        //event.preventDefault();
        //event.stopPropagation();
        
        const touch = event.changedTouches[0];

        this.onPointerUp(touch.pageX, touch.pageY);

    };

    protected onPointerDown = (pageX: number, pageY: number) => {

        if(this.listRef === null || this.containerRef === null) 
            throw new Error("No listRef or containerRef");

        //console.log("Scroller onPointerDown");

        this.calcTranslateX.onPointerDown(pageX, pageY, this.listRef, this.containerRef);

        this.eventTyper.onTouchStart(pageX, pageY);

        this.listStyle = {};
        this.eventType = '';

        if(this.setState === null) throw new Error("No state");

        this.setState((prevState: ScrollerState) => {

            //console.log(this.getTranslateX());

            return {
                ...prevState,
                translateX: this.getTranslateX(),
            }

        });

    };

    protected onPointerMove = (pageX: number, pageY: number) => {

        //console.log("Scroller onPointerMove", this.calcTranslateX.isYScroll);
    
        //this.calcTranslateX.onPointerMove(pageX, pageY);

        if(this.setState === null) throw new Error("No state");

        //if(this.calcTranslateX.isYScroll) return;

        this.setState((prevState: ScrollerState) => {

            this.eventTyper.onTouchMove(pageX);
        
            this.calcTranslateX.calcTranslateXOnMove(prevState.translateX, pageX);

            this.showContentManager.onPointerMove(
                this.calcTranslateX.listWidth, 
                this.calcTranslateX.itemWidth,
                this.getTranslateX(),
                prevState.numberOfActiveItems,
                this.numberOfItems
            );
    
            return {
                ...prevState,
                translateX: this.getTranslateX(),
                numberOfActiveItems: this.showContentManager.numberOfActiveItems 
                //isTranslated: true
            };

        });
    
    };

    /* protected onPointerMove = (pageX: number, pageY: number) => {

        //console.log("Scroller onPointerMove", this.calcTranslateX.isYScroll);
    
        this.calcTranslateX.onPointerMove(pageX, pageY);

        if(this.setState === null) throw new Error("No state");
    
        this.setState((prevState: ScrollerState) => {

            if(!this.calcTranslateX.isYScroll){
    
                this.eventTyper.onTouchMove(pageX);
        
                this.calcTranslateX.calcTranslateXOnMove(prevState.translateX, pageX);

                this.showContentManager.onPointerMove(
                    this.calcTranslateX.listWidth, 
                    this.calcTranslateX.itemWidth,
                    this.getTranslateX(),
                    prevState.numberOfActiveItems,
                    this.numberOfItems
                );
        
                return {
                    ...prevState,
                    translateX: this.getTranslateX(),
                    numberOfActiveItems: this.showContentManager.numberOfActiveItems 
                    //isTranslated: true
                };
        
            }
        
            return prevState;

        });
    
    }; */

    protected onPointerUp = (pageX: number, pageY: number) => {

        //console.log("Scroller onPointerUp");

        if(this.setState === null) throw new Error("No state");
    
        this.setState((prevState: ScrollerState) => {

            if(!this.calcTranslateX.isYScroll){
    
                this.calcTranslateX.onPointerUp();
        
                //what event - move, swipe etc...
                this.eventTyper.onTouchEnd(pageX);
        
                this.eventType = this.eventTyper.whatEventType(pageY);
        
                if(this.eventType === "CLICK"){
        
                    return prevState;
        
                }
        
                if(prevState.translateX > this.calcTranslateX.maxTranslateOffset){
        
                    this.calcTranslateX.translateX = this.calcTranslateX.maxTranslateOffset;
        
                }else if(prevState.translateX < this.calcTranslateX.minTranslateOffset){
        
                    this.calcTranslateX.translateX = this.calcTranslateX.minTranslateOffset;
        
                }else if(this.eventType === "SWIPE" || this.eventType === "SWIPE_MOVE") {
        
                    this.calcTranslateX.calcTranslateXOnSwipe(this.eventTyper.getSwipeSpeed());
        
                }
        
                this.listStyle = { transition: 'transform 0.5s ease-out 0s' };

                this.showContentManager.onPointerUp(
                    this.calcTranslateX.listWidth, 
                    this.calcTranslateX.itemWidth,
                    this.getTranslateX(), 
                    prevState.numberOfActiveItems,
                    this.numberOfItems
                );
        
                return {
                    ...prevState,
                    translateX: this.getTranslateX(),
                    numberOfActiveItems: this.showContentManager.numberOfActiveItems 
                }
        
            }
        
            this.calcTranslateX.onPointerUp();
        
            return prevState;

        });
    
    };

}

export default ScrollerController;