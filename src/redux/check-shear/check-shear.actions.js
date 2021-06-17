export const CHECK_SHEAR_ACTION_TYPES = {
    SET_CHECK_SHEAR_DATA_FIELD:"SET_CHECK_SHEAR_DATA_FIELD"
}

export const handleShearDataChange = (evt)=>{
    const {name, value} = evt.target;
    return({
        type:CHECK_SHEAR_ACTION_TYPES.SET_CHECK_SHEAR_DATA_FIELD,
        payload:{[name]:value}
    })
}