export const DIST_STEEL_DATA_ACTION_TYPES = {
    SET_DIST_STEEL_DATA_FIELD:"SET_DIST_STEEL_DATA_FIELD"
}

export const handleDistSteelDataChange = (evt)=>{
    const {name, value} = evt.target;
    return({
        type:DIST_STEEL_DATA_ACTION_TYPES.SET_DIST_STEEL_DATA_FIELD,
        payload:{[name]:value}
    })
}