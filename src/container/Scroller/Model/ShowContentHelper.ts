/* 
If scroll item is outside of scroller div we do not want to show it
 */

class ShowContentHelper{

    numberOfActiveItems: number = 0;

    init = (listWidth: number, itemWidth: number, itemsLength: number) => {

        this.calcNumberOfActiveItems(listWidth, itemWidth, 0, 0, itemsLength);

    };

    onPointerMove = (listWidth: number, itemWidth: number, translateX: number, numberOfActiveItems: number, itemsLength: number) => {

        this.calcNumberOfActiveItems(listWidth, itemWidth, translateX, numberOfActiveItems, itemsLength);
    };

    onPointerUp = (listWidth: number, itemWidth: number, translateX: number, numberOfActiveItems: number, itemsLength: number) => {

        this.calcNumberOfActiveItems(listWidth, itemWidth, translateX, numberOfActiveItems, itemsLength);

    };

    calcNumberOfActiveItems = (listWidth: number, itemWidth: number, translateX: number, numberOfActiveItems: number, itemsLength: number) => {

        //console.log("calcNumberOfActiveItems", translateX, itemWidth, listWidth);
        if(this.numberOfActiveItems >= itemsLength) return;

        const newNumberOfActiveItems = Math.ceil((listWidth + Math.abs(translateX)) / itemWidth);

        this.numberOfActiveItems = newNumberOfActiveItems <= numberOfActiveItems ? numberOfActiveItems : newNumberOfActiveItems;

    };

}

export default ShowContentHelper;