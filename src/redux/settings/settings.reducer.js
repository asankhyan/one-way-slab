import { INITIAL_STATE } from "../default-state";
import { SETTINGS_ACTION_TYPES } from "./settings.actions";

let settingsReducer = (state = INITIAL_STATE.configs, action)=>{
    const {type, payload} = action;
    switch(type){
        case SETTINGS_ACTION_TYPES.SWITCH_MODE:{
            return({
                ...state,
                detailedView:payload
            })
        }
        case SETTINGS_ACTION_TYPES.TOGGLE_SETTINGS:{
            return({
                ...state,
                toggleSettings:payload
            })
        }
        default:{
            return state
        }
    }
}

export default settingsReducer