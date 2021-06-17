import { CHECK_DEFLECTION_ACTION_TYPES} from './check-deflection.actions'

let init_state = {
    mod_fac_fy: ""
}

export const checkDeflectionReducer = (state = init_state, action)=>{
    const {type, payload} = action;

    switch(type){
        case CHECK_DEFLECTION_ACTION_TYPES.SET_CHECK_DEFLECTION_DATA_FIELD:{
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