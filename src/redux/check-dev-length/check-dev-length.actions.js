export const CHECK_DEV_LEN_ACTION_TYPES = {
    SET_CHECK_DEV_LEN_DATA_FIELD:"SET_CHECK_DEV_LEN_DATA_FIELD"
}

export const handleDevLengthChange = (evt)=>{
    const {name, value} = evt.target;
    return({
        type:CHECK_DEV_LEN_ACTION_TYPES.SET_CHECK_DEV_LEN_DATA_FIELD,
        payload:{[name]:value}
    })
}