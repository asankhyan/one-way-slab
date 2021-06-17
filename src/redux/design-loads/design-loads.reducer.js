import { DESIGN_LOADS_ACTION_TYPES } from "./design-loads.actions";

const init_state = {
    live_load:"",
    extra_dead_load:""
}

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