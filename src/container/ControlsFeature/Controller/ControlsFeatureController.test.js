import ControlsFeatureController from "./ControlsFeatureController";
import ControlsFeatureClasses from "../Model/ControlsFeatureClasses";
import classes from "./../ControlsFeature.module.scss";


let controller = null;
let cfClasses = null;

let itemClickHandler = null;

let items =  [
    {title: 'One'},
    {title: 'Two'},
    {title: 'Three'}
];
const config = {
    type: "TEXT",
    formType: "BOTTOM_HALF_CIRCLE",
    isShowTitle: false,
    isMainItemText: false,
    mainDivStyle: { top: 0 },
    mainItemStyle: { backgroundColor: "white" }
};

let newState = {};

describe("ControlsFeatureController", () => {

    beforeEach(() => {

        itemClickHandler = jest.fn();
        cfClasses = new ControlsFeatureClasses(items.length, classes, config);
        controller = new ControlsFeatureController(items, cfClasses, itemClickHandler);

        controller.setState = (callback) => {

            newState = callback({
    
                controller: 'controller',
                isShowItems: false,
                title: '',
                mainItemText: items[1].title
            });
        };

    })

    

    describe("onItemPointerUp", () => {

        test("If state.isShowItems === false return same state", () => {

            controller.onItemPointerUp("target");

            expect(newState).toEqual({

                controller: 'controller',
                isShowItems: false,
                title: '',
                mainItemText: items[1].title
            });

        });

        test("If state.isShowItems === true it get index from target and eval itemClickHandler with index", () => {

            /* CONFIG */
            controller.setState = (callback) => {

                newState = callback({
        
                    controller: 'controller',
                    isShowItems: true,
                    title: '',
                    mainItemText: items[1].title
                });
            };

            const target = {dataset: {featureIndex: "23"}};

            /* EVAL */

            controller.onItemPointerUp(target);

            /* ASSERTS */

            expect(itemClickHandler).toHaveBeenNthCalledWith(1, 23);

            expect(newState).toEqual({

                controller: 'controller',
                isShowItems: false,
                title: '',
                mainItemText: ''
            });

        });


    })

})