import { INITIAL_STATE } from "../default-state";
import { INPUT_DATA_ACTION_TYPES } from "./input-data.actions";

const init_state = INITIAL_STATE.inputData;

export const inputDataReducer = (state=init_state, action)=>{
    const {type, payload}=action;
    switch(type){
        case INPUT_DATA_ACTION_TYPES.SET_INPUT_DATA_FIELD:{
            return({
                ...state,
                ...payload
            })
        }
        default:{
            return({
                ...state
            })
        }
    }
}