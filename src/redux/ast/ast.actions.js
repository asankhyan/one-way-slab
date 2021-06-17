export const AST_DATA_ACTION_TYPES = {
    SET_AST_DATA_FIELD:"SET_AST_DATA_FIELD"
}

export const handleDataChange = (evt)=>{
    const {name, value} = evt.target;
    return({
        type:AST_DATA_ACTION_TYPES.SET_AST_DATA_FIELD,
        payload:{[name]:value}
    })
}