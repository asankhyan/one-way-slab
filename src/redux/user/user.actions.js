export const USER_ACTION_TYPES = {
    SET_USER:"SET_USER"
}

export const setUser = (user)=>({
    type:USER_ACTION_TYPES.SET_USER,
    payload: user
})