import { CHECK_DEV_LEN_ACTION_TYPES } from "./check-dev-length.actions";

let init_state = {
    no_hooks_Lo: "",
    m:"",
    m_options:[
        {displayValue:"20", code:1.92},
        {displayValue:"25", code:2.24},
        {displayValue:"30", code:2.4},
        {displayValue:"35", code:2.72},
        {displayValue:"40", code:3.04}
    ]
}

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