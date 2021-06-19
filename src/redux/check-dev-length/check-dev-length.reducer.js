import { INITIAL_STATE } from "../default-state";
import { CHECK_DEV_LEN_ACTION_TYPES } from "./check-dev-length.actions";

let init_state = INITIAL_STATE.checkDevLength

export const checkDevLengthReducer = (state = init_state, action)=>{
    const {type, payload} = action;

    switch(type){
        case CHECK_DEV_LEN_ACTION_TYPES.SET_CHECK_DEV_LEN_DATA_FIELD:{
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