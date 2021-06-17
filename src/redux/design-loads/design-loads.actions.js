export const DESIGN_LOADS_ACTION_TYPES = {
    SET_DATA_FIELD:"SET_INPUT_DATA_FIELD"
}

export const handleDesignLoadsDataChange = (evt)=>{
    const {name, value} = evt.target;
    return({
        type:DESIGN_LOADS_ACTION_TYPES.SET_DATA_FIELD,
        payload:{[name]:value}
    })
}