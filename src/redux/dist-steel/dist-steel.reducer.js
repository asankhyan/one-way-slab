import { DIST_STEEL_DATA_ACTION_TYPES } from "./dist-steel.actions";

const init_state = {
    bar_dia:"",
    spacing_provided:""
}

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