export const INPUT_DATA_ACTION_TYPES = {
    SET_INPUT_DATA_FIELD:"SET_INPUT_DATA_FIELD"
}

export const handleInputDataChange = (evt)=>{
    const {name, value} = evt.target;
    return({
        type:INPUT_DATA_ACTION_TYPES.SET_INPUT_DATA_FIELD,
        payload:{[name]:value}
    })
}