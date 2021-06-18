import { connect } from "react-redux";
import { handleDataChange } from "../../redux/ast/ast.actions";
import { roundOfDecimal } from "../../utils/number.utils";
import { quadraticEq } from "../effective-depth/effective-depth.component"
import FormInput from "../form-components/form-input/form-input.component";

import './area-tension-steel.styles.scss'

export const areaOfTensionSteel = (combinedinput)=>{
    let pos = quadraticEq(combinedinput);
    let neg = quadraticEq(combinedinput, true);
    return Math.min(pos, neg);
}

export const spacingReq = (combinedinput)=>{
    let d30 = areaOfTensionSteel(combinedinput);
    let d31 = combinedinput.bar_dia;
    let res = (1000 * ((3.14/4)*d31*d31))/d30;

    if(isNaN(res)) return "";
    
    return roundOfDecimal(res);
}

export const providedSteel = ({bar_dia, spacing_provided})=>{
    let res = (1000 * ((3.14/4)*bar_dia*bar_dia))/spacing_provided;
    
    if(isNaN(res)) return "";
    
    return roundOfDecimal(res);
}

export const astAtSupport = ({bar_dia, spacing_provided})=>{
    let res = providedSteel({bar_dia, spacing_provided})/2;
    
    if(isNaN(res)) return "";
    
    return roundOfDecimal(res, 3);
}

let AreaOfTensionSteel = ({handleChange, inputData, designLoads, ast})=>{
    // const combinedinput = {...inputData, ...designLoads, ...ast};
    const {bar_dia, spacing_provided} = ast;
    return(
        <div className='area-of-tension-steel'>
            {/* <FormInput label='Area of tension steel (Ast)' value={areaOfTensionSteel(combinedinput)} subHeading='mm2' readOnly /> */}
            <FormInput label='bar dia' value={bar_dia} subHeading='mm' name='bar_dia' handleChange={handleChange} />
            {/* <FormInput label='spacing required' value={spacingReq(combinedinput)} subHeading='mm' readOnly /> */}
            <FormInput label='spacing provided' value={spacing_provided} name='spacing_provided' subHeading='mm'  handleChange={handleChange} />
            <FormInput label='provided steel' value={providedSteel({bar_dia, spacing_provided})} subHeading='mm2' readOnly />
            {/* <FormInput label='Ast at support' value={astAtSupport({bar_dia, spacing_provided})} subHeading='mm2' readOnly /> */}
        </div>
    )
}

let mapStateToProps = (state)=>({
    inputData: state.inputData,
    designLoads: state.designLoads,
    ast: state.ast
})

let mapDispatchToProps = (dispatch)=>({
    handleChange: (evt)=>(dispatch(handleDataChange(evt)))
})

export default connect(mapStateToProps, mapDispatchToProps)(AreaOfTensionSteel)