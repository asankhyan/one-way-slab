import { connect } from "react-redux";
import { handleShearDataChange } from "../../redux/check-shear/check-shear.actions";
import { roundOfDecimal } from "../../utils/number.utils";
import { astAtSupport } from "../area-tension-steel/area-tension-steel.component";
import { factoredShear } from "../factored-moment/factored-moment.component";
import FormInput from "../form-components/form-input/form-input.component";

let normalShearStress= (combinedinput)=>{
    // (D45*1000)/(C9*(C8-C10))
    const {b, d, effective_cover} = combinedinput;
    let d45 = factoredShear(combinedinput) 
    let res = (d45 * 1000)/(b * (d - effective_cover));
    return roundOfDecimal(res,6); 
}

let fxn_pt = (combinedinput)=>{
    // (100*D36)/(C9*(C8-C10))
    const {b, d, effective_cover, ast} = combinedinput;
    let d36 = astAtSupport(ast) 
    let res = (d36 * 100)/(b * (d - effective_cover));
    return roundOfDecimal(res, 3); 
}

let CheckForShear = ({handleChange, inputData, designLoads, ast, checkShear})=>{
    const combinedinput = {...inputData, ...designLoads, ...ast, ...checkShear};
    const {permissible_stress} = checkShear;
    return(
        <div className='check-for-shear'>
            <FormInput label='Vu' value={factoredShear(combinedinput)} subHeading='kn' readOnly />
            <FormInput label='nominal shear stress' value={normalShearStress(combinedinput)} subHeading='N/mm2' readOnly />
            <FormInput label='pt' value={fxn_pt({...inputData, ast})} subHeading='%' readOnly />
            <FormInput label='permissible stresses' name='permissible_stress' 
                value={permissible_stress} subHeading='mm2' handleChange={handleChange} />
        </div>
    );
}

let mapStateToProps = (state)=>({
    inputData: state.inputData,
    designLoads: state.designLoads,
    ast: state.ast,
    checkShear: state.checkShear
})

let mapDispatchToProps = (dispatch)=>({
    handleChange: (evt)=>(dispatch(handleShearDataChange(evt)))
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckForShear)