import { INITIAL_STATE } from "../default-state";
import { CHECK_SHEAR_ACTION_TYPES } from "./check-shear.actions";

let init_state = INITIAL_STATE.checkShear

export const checkShearReducer = (state=init_state, action)=>{
    const {type, payload} = action;

    switch(type){
        case CHECK_SHEAR_ACTION_TYPES.SET_CHECK_SHEAR_DATA_FIELD:{
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