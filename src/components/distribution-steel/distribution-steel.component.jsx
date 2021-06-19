import { connect } from "react-redux";
import { handleDistSteelDataChange } from "../../redux/dist-steel/dist-steel.actions";
import { roundOfDecimal } from "../../utils/number.utils";
import FormInput from "../form-components/form-input/form-input.component"

import './distribution-steel.styles.scss'

export const distributionSteel = (input)=>{
    // 0.12*C9*C8/100
    const {d, b} = input;
    let res = 0.12 * b * d / 100
    
    if(isNaN(res)) return "";
    
    return roundOfDecimal(res);
}

export const spacingReq = (input)=>{
    let d30 = distributionSteel(input);
    let d31 = input.bar_dia;
    let res = (1000 * ((3.14/4)*d31*d31))/d30;
    
    if(isNaN(res)) return "";
    
    return roundOfDecimal(res);
}

export const providedDistSteel = ({bar_dia, spacing_provided})=>{
    let res = (1000 * ((3.14/4)*bar_dia*bar_dia))/spacing_provided;

    if(isNaN(res)) return "";
    
    return roundOfDecimal(res);
}

export const isDistSteelValid = ({inputData, designLoads, distSteel})=>{
    let distSteelStatus =  false;
    let _providedDistSteel = parseFloat(providedDistSteel(distSteel));
    let _distributionSteel = parseFloat(distributionSteel(inputData));

    if(!isNaN(_providedDistSteel) && !isNaN(_distributionSteel)){
        distSteelStatus = _providedDistSteel > _distributionSteel;
    }
    return distSteelStatus;
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
            <FormInput label='provided steel' value={providedDistSteel({bar_dia, spacing_provided})} subHeading='mm2' readOnly />
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