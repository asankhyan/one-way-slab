import { AST_DATA_ACTION_TYPES } from "./ast.actions";

const init_state = {
    bar_dia:"",
    spacing_provided:""
}

export const astReducer = (state=init_state, action)=>{
    const {type, payload}=action;
    switch(type){
        case AST_DATA_ACTION_TYPES.SET_AST_DATA_FIELD:{
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