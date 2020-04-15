import {IControlsFeatureController} from "./../types";
import {CFState} from "./../../../hooks/ControlsFeature/types";
import ControlsFeatureClasses from "../Model/ControlsFeatureClasses";
import {CFItem} from "./../../../data/types";

class ControlsFeatureController implements IControlsFeatureController {

    cfClasses: ControlsFeatureClasses;

    items: CFItem[];

    mainItemRef: React.RefObject<HTMLDivElement> | null = null;

    setState: React.Dispatch<((prevState: CFState) => CFState) | CFState> | null = null;

    itemClickHandler: (event: any) => undefined | void;
    
    constructor(
        items: CFItem[],
        cfClasses: ControlsFeatureClasses,
        itemClickHandler: (event: any) => undefined | void
    ){

        this.items = items;
        this.cfClasses = cfClasses;
        this.itemClickHandler = itemClickHandler;

    }

    /* LISTENERS */
    onMainItemMouseDown = (event: any) => {

        event.stopPropagation();
        event.preventDefault();

        window.addEventListener('mouseup', this.onWindowMouseUp, false);

        if(this.setState === null) throw new Error("No setState");

        this.setState((prevState: CFState) => {

            if(!prevState.isShowItems){

                return { ...prevState, isShowItems: true };
        
            }
        
            return prevState;

        })

    };

    onMainItemTouchStart = (event: any) => {

        event.preventDefault();
        event.stopPropagation();

        if(this.setState === null) throw new Error("No setState");
        
        this.setState((prevState: CFState) => {

            if(!prevState.isShowItems){

                return { ...prevState, isShowItems: true };
        
            }
        
            return prevState;

        })
    };
    onMainItemTouchMove = (event: any) => {

        event.preventDefault();
        event.stopPropagation();

        if(!this.cfClasses.config.isShowTitle) return;
    
        const touch = event.changedTouches[0];

        const target: any = document.elementFromPoint(touch.clientX, touch.clientY);

        if(this.setState === null) throw new Error("No setState");

        this.setState((prevState: CFState) => {

            if(prevState.isShowItems){

                if(target && target.dataset && target.dataset.featureName){
        
                    //console.log("call this.props.setActiveCarouselIndex with index == " + target.dataset.index);
        
                    const name = target.dataset.featureName;
        
                    if(prevState.title !== name){
                        return {...prevState, title: name};
                    }
        
                }else{
        
                    if(prevState.title !== ''){
                        return {...prevState, title: ''};
                    }
        
                }
        
            }
        
            return prevState;

        })
    };
    onMainItemTouchEnd = (event: any) => {

        event.stopPropagation();
        event.preventDefault();

        const touch = event.changedTouches[0];

        const target = document.elementFromPoint(touch.clientX, touch.clientY);

        this.onItemPointerUp(target);
    };

    onItemMouseUp = (event: any) => {

        event.preventDefault();
        event.stopPropagation();

        window.removeEventListener('mouseup', this.onWindowMouseUp, false);

        this.onItemPointerUp(event.target);
    };

    onItemMouseEnter = (event: any) => {

        event.preventDefault();
        event.stopPropagation();

        if(!this.cfClasses.config.isShowTitle) return;

        const target = event.target;

        if(this.setState === null) throw new Error("No setState");

        this.setState((prevState: CFState) => {

            if(target.dataset && target.dataset.featureName){

                const name = target.dataset.featureName;
        
                if(prevState.title !== name)
                    return {...prevState, title: name};
                
            }else{
        
                console.error("No control feature item name");
        
            }
        
            return prevState;

        });
    };
    onItemMouseLeave = (event: any) => {

        event.preventDefault();
        event.stopPropagation();

        if(!this.cfClasses.config.isShowTitle) return;

        if(this.setState === null) throw new Error("No setState");

        this.setState((prevState: CFState) => {

            if(prevState.title !== ''){

                return {...prevState, title: ''};
                
            }
        
            return prevState;

        });
    };

    onWindowMouseUp = (event: any) => {

        event.stopPropagation();
        event.preventDefault();

        window.removeEventListener('mouseup', this.onWindowMouseUp, false);

        if(this.setState === null) throw new Error("No setState");

        this.setState((prevState: CFState) => {

            if(prevState.isShowItems){

                return { ...prevState, isShowItems: false, title: '' };
        
            }
        
            return prevState;

        });
    };

    private onItemPointerUp = (target: any) => {

        if(this.setState === null) throw new Error("No setState");

        this.setState((prevState: CFState) => {

            if(prevState.isShowItems){

                let index = -1;
                let mainItemText = '';
        
                if(target && target.dataset && target.dataset.featureIndex){
        
                    index = parseInt(target.dataset.featureIndex);
                    //console.log(target, target.dataset.featureIndex);
                    //console.log("call this.props.setActiveCarouselIndex with index == " + index);
                    if(this.itemClickHandler){

                        //console.log("Controls feature itemClickHandler", index);
                        this.itemClickHandler(index);

                    }
                    
                }
        
                if(this.cfClasses.config.isMainItemText && this.cfClasses.config.type === "TEXT"){
        
                    mainItemText = (index >= 0) ? this.items[index].title : prevState.mainItemText;
        
                }
        
                return {
                    ...prevState,
                    isShowItems: false,
                    mainItemText: mainItemText,
                    title: ''
                }
        
            }
        
            return prevState;

        });

    };

}

export default ControlsFeatureController;