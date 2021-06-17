export const CHECK_DEFLECTION_ACTION_TYPES = {
    SET_CHECK_DEFLECTION_DATA_FIELD:"SET_CHECK_DEV_LEN_DATA_FIELD"
}

export const handleDeflectionChange = (evt)=>{
    const {name, value} = evt.target;
    return({
        type:CHECK_DEFLECTION_ACTION_TYPES.SET_CHECK_DEFLECTION_DATA_FIELD,
        payload:{[name]:value}
    })
}