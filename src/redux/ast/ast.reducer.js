import { INITIAL_STATE } from "../default-state";
import { AST_DATA_ACTION_TYPES } from "./ast.actions";

const init_state = INITIAL_STATE.ast

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