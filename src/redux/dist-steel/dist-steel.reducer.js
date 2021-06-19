import { INITIAL_STATE } from "../default-state";
import { DIST_STEEL_DATA_ACTION_TYPES } from "./dist-steel.actions";

const init_state = INITIAL_STATE.distSteel

export const distSteelReducer = (state=init_state, action)=>{
    const {type, payload}=action;
    switch(type){
        case DIST_STEEL_DATA_ACTION_TYPES.SET_DIST_STEEL_DATA_FIELD:{
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