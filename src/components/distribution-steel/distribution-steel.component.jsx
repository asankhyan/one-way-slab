import { connect } from "react-redux";
import { handleDistSteelDataChange } from "../../redux/dist-steel/dist-steel.actions";
import { roundOfDecimal } from "../../utils/number.utils";
import { quadraticEq } from "../effective-depth/effective-depth.component"
import FormInput from "../form-components/form-input/form-input.component"

import './distribution-steel.styles.scss'

let distributionSteel = (combinedinput)=>{
    let pos = quadraticEq(combinedinput);
    let neg = quadraticEq(combinedinput, true);
    return Math.min(pos, neg);
}

export const spacingReq = (combinedinput)=>{
    let d30 = distributionSteel(combinedinput);
    let d31 = combinedinput.bar_dia;
    let res = (1000 * ((3.14/4)*d31*d31))/d30;
    return roundOfDecimal(res);
}

let providedSteel = ({bar_dia, spacing_provided})=>{
    let res = (1000 * ((3.14/4)*bar_dia*bar_dia))/spacing_provided;
    return roundOfDecimal(res);
}

let DistributionSteel = ({handleChange, inputData, designLoads, distSteel})=>{
    // const combinedinput = {...inputData, ...designLoads, ...distSteel};
    const {bar_dia, spacing_provided} = distSteel;
    return(
        <div className='distribution-steel'>
            {/* <FormInput label='distribution steel' value={distributionSteel(combinedinput)} subHeading='mm2' readOnly /> */}
            <FormInput label='bar dia' value={bar_dia} subHeading='mm' name='bar_dia' handleChange={handleChange} />
            {/* <FormInput label='spacing required' value={spacingReq(combinedinput)} subHeading='mm' readOnly /> */}
            <FormInput label='spacing provided' value={spacing_provided} name='spacing_provided' subHeading='mm'  handleChange={handleChange} />
            <FormInput label='provided steel' value={providedSteel({bar_dia, spacing_provided})} subHeading='mm2' readOnly />
        </div>
    )
}

let mapStateToProps = (state)=>({
    inputData: state.inputData,
    designLoads: state.designLoads,
    distSteel: state.distSteel
})

let mapDispatchToProps = (dispatch)=>({
    handleChange: (evt)=>(dispatch(handleDistSteelDataChange(evt)))
})

export default connect(mapStateToProps, mapDispatchToProps)(DistributionSteel)