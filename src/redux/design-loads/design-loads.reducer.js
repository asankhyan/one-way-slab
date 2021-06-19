import { INITIAL_STATE } from "../default-state";
import { DESIGN_LOADS_ACTION_TYPES } from "./design-loads.actions";

const init_state = INITIAL_STATE.designLoads

export const designLoadsReducer = (state=init_state, action)=>{
    const {type, payload}=action;
    switch(type){
        case DESIGN_LOADS_ACTION_TYPES.SET_DATA_FIELD:{
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