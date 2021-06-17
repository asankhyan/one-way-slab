import { combineReducers } from "redux";
import { designLoadsReducer } from "./design-loads/design-loads.reducer";
import { inputDataReducer } from "./input-data/input-data.reducer";
import { astReducer } from "./ast/ast.reducer";
import { distSteelReducer } from "./dist-steel/dist-steel.reducer";
import { checkShearReducer } from "./check-shear/check-shear.reducer";
import { checkDeflectionReducer } from "./check-deflection/check-deflection.reducer";
import { checkDevLengthReducer } from "./check-dev-length/check-dev-length.reducer";

export default combineReducers ({
    inputData: inputDataReducer,
    designLoads: designLoadsReducer,
    ast: astReducer,
    distSteel: distSteelReducer ,
    checkShear: checkShearReducer,
    checkDeflection: checkDeflectionReducer,
    checkDevLength: checkDevLengthReducer
})