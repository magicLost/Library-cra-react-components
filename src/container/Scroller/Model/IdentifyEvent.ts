export type EVENT_TYPE = "CLICK" | "LONG_TAP" | "SWIPE" | "SWIPE_MOVE" | "MOVE";

export type IdentifyEventConfig = {

    threshold: number;//120; //required min distance traveled to be considered swipe
    restraint: number;// = 100; // maximum distance allowed at the same time in perpendicular direction

    allowedTime: number;// = 200; // maximum time allowed to travel that distance
    allowedTimeToMoveSwipe: number;// = 30;

};

class IdentifyEvent {

    startX: number = 0;
    startY: number = 0;

    lastX: number = 0;
    lastFiveXTouchMove: number[] = [];
    lastFiveXTouchMoveIndex: number = 0;
    lastFiveXToucheMoveSum: number = 0;

    dist: number = 0;

    elapsedTime: number = 0;
    elapsedTimeAfterMove: number = 0;
    startTime: number = 0;
    startTimeAfterMove: number = 0;

    swipeSpeed: number = 0;

    config: IdentifyEventConfig = {

        threshold: 120,
        restraint: 100,
        allowedTime: 200,
        allowedTimeToMoveSwipe: 30
    };

    constructor(config?: IdentifyEventConfig){

        if(config !== undefined)
            this.config = {...this.config, ...config};

    }

    whatEventType = (pageY: number): EVENT_TYPE => {

        if(this.dist === 0){

            if(this.elapsedTime > 200){

                return "LONG_TAP";

            }else{

                return "CLICK";

            }

        }else{

            if(this.isSwipe(pageY)){

                return "SWIPE";

            }else if(this.isSwipeAfterMoving(pageY)){

                return "SWIPE_MOVE";

            }


            return "MOVE";

        }

    };

    onTouchStart = (pageX: number, pageY: number) => {

        this.lastFiveXTouchMove = [];
        this.lastFiveXTouchMoveIndex = 0;
        this.lastFiveXToucheMoveSum = 0;

        this.swipeSpeed = 0;
        this.dist = 0;
        this.startX = pageX;
        this.lastX = pageX;

        this.startY = pageY;
        this.startTime = new Date().getTime(); // record time when finger first makes contact with surface
    };

    onTouchMove = (pageX: number) => {

        let speed = this.lastX - pageX;

        this.lastX = pageX;

        this.lastFiveXTouchMove[this.lastFiveXTouchMoveIndex] = speed;

        this.lastFiveXTouchMoveIndex = (this.lastFiveXTouchMoveIndex >= 4) ? 0 : this.lastFiveXTouchMoveIndex + 1;

        this.startTimeAfterMove = new Date().getTime();
    };

    onTouchEnd = (pageX: number) => {

        this.dist = pageX - this.startX; // get total dist traveled by finger while in contact with surface

        this.elapsedTime = new Date().getTime() - this.startTime; // get time elapsed
        this.elapsedTimeAfterMove = new Date().getTime() - this.startTimeAfterMove;
    };

    protected isSwipe = (pageY: number): boolean => {

        for(let value of this.lastFiveXTouchMove){

            this.lastFiveXToucheMoveSum += value;

        }

        return  (this.elapsedTime <= this.config.allowedTime && Math.abs(this.dist) >= this.config.threshold && Math.abs(pageY - this.startY) <= this.config.restraint);

    };

    protected isSwipeAfterMoving = (pageY: number): boolean => {

        /* this.lastFiveXTouchMove.map((value) => {
             this.lastFiveXToucheMoveSum += value;
         });*/

        for(let value of this.lastFiveXTouchMove){

            this.lastFiveXToucheMoveSum += value;

        }


        return (Math.abs(this.lastFiveXToucheMoveSum) > 50) && (Math.abs(pageY - this.startY) <= this.config.restraint && this.elapsedTimeAfterMove <= this.config.allowedTimeToMoveSwipe);

    };

    getSwipeSpeed = (): number => {

        let speed = this.lastFiveXToucheMoveSum * -1 / 100;

        if(speed > 0){

            if(speed < 1)
                return 1;
            if(speed > 6)
                return 6;

        }else{

            if(speed < -6)
                return -6;
            if(speed > -1)
                return -1;

        }

        return speed;

    };

}

export default IdentifyEvent;