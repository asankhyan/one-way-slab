export const CONFIG_ACTION_TYPES = {
    SWITCH_MODE: "SWITCH_MODE"
}
export const switchDetailedView = (detailedView)=>({
    type: CONFIG_ACTION_TYPES.SWITCH_MODE,
    payload: !detailedView
})