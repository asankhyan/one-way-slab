import { INITIAL_STATE } from "../default-state";
import { CONFIG_ACTION_TYPES } from "./configs.actions";

export const configReducers = (state = INITIAL_STATE.configs, action)=>{
    const {type, payload} = action;
    switch(type){
        case CONFIG_ACTION_TYPES.SWITCH_MODE:{
            return {
                ...state,
                detailedView: payload
            }
        }
        default:{
            return state
        }

    }
}