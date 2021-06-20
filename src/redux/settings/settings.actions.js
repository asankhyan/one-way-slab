export const SETTINGS_ACTION_TYPES = {
    SWITCH_MODE: "SWITCH_MODE",
    TOGGLE_SETTINGS:"TOGGLE_SETTINGS"
}
export const switchDetailedView = (detailedView)=>({
    type: SETTINGS_ACTION_TYPES.SWITCH_MODE,
    payload: !detailedView
})

export const toggleSettingsMenu = (toggleSettings)=>({
    type: SETTINGS_ACTION_TYPES.TOGGLE_SETTINGS,
    payload: !toggleSettings
})