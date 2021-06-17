import { INPUT_DATA_ACTION_TYPES } from "./input-data.actions";

const init_state = {
    clear_span:"",
    support_width:"",
    fck:"",
    fy:"",
    d:"",
    b:"",
    effective_cover:""
}

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