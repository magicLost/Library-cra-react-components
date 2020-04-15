import React, {useState} from 'react';


export interface IRequestState {
    isRequestSuccess: boolean,
    isRequestError: boolean,
    isRequestLoading: boolean
}

/* export enum FORM_ACTION {

    SET_FORM_ERROR,
    //SET_FORM_ELEMENTS,
    //SET_FORM_ELEMENT,
    CLEAR_STATE,
    INPUT_CHANGE
}; */

type useRequestReturn = {

    requestState: IRequestState,
    setRequestState: React.Dispatch<((prevState: IRequestState) => IRequestState) | IRequestState> | null

};

export const useRequest = () : useRequestReturn => {

    const initState: IRequestState = {
        isRequestSuccess: false,
        isRequestError: false,
        isRequestLoading: false
    }

    const [requestState, setRequestState] = useState(initState);

    return {
        requestState: requestState,
        setRequestState: setRequestState
    };
        
};
