import { INITIAL_STATE } from "../default-state"
import { USER_ACTION_TYPES } from "./user.actions";

let init_state = INITIAL_STATE.user;

let userReducer = (state=init_state, action)=>{
    const {type, payload} = action

    switch(type){
        case USER_ACTION_TYPES.SET_USER:{
            return{
                ...payload
            }
        }default:{
            return state
        }
    }
}
export default userReducer;