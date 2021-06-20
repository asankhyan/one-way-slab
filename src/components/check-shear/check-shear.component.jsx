import { connect } from "react-redux";
import { handleShearDataChange } from "../../redux/check-shear/check-shear.actions";
import { roundOfDecimal } from "../../utils/number.utils";
import { astAtSupport } from "../area-tension-steel/area-tension-steel.component";
import { factoredShear } from "../factored-moment/factored-moment.component";
import FormInput from "../common/form-input/form-input.component";

export const normalShearStress= (combinedinput)=>{
    // (D45*1000)/(C9*(C8-C10))
    const {b, d, effective_cover} = combinedinput;
    let d45 = factoredShear(combinedinput) 
    let res = (d45 * 1000)/(b * (d - effective_cover));
    
    if(isNaN(res)) return "";
    
    return roundOfDecimal(res,6);
}

let fxn_pt = (combinedinput)=>{
    // (100*D36)/(C9*(C8-C10))
    const {b, d, effective_cover, ast} = combinedinput;
    let d36 = astAtSupport(ast) 
    let res = (d36 * 100)/(b * (d - effective_cover));
    
    if(isNaN(res)) return "";
    
    return roundOfDecimal(res, 3); 
}

export const fxn_permissibleStress = ({inputData, designLoads, ast})=>{
    const combinedinput = {...inputData, ...designLoads, ...ast};
    
    let fck = combinedinput.fck;
    let pt = fxn_pt({...inputData, ast});
    let fckByPt = ((0.8*fck)/(6.89 * pt));
    fckByPt = (fckByPt>1) ? fckByPt : 1;

    let res = 0.85 * Math.sqrt(0.8*fck) * (Math.sqrt(1 + 5 * fckByPt)-1)/(6 * fckByPt);

    if(isNaN(res)) return "";
    
    return roundOfDecimal(res);
}

export const isShearValid = (props)=>{
    let ida = {...props.inputData, ...props.designLoads, ...props.ast};
    let checkForShearStatus = false;
    let _normalShearStress = parseFloat(normalShearStress(ida));
    let _permissibleStress = parseFloat(fxn_permissibleStress(props));
    if(!isNaN(_normalShearStress) && !isNaN(_permissibleStress)){
        checkForShearStatus = _permissibleStress > _normalShearStress;
    }
    return checkForShearStatus;
}

let CheckForShear = ({inputData, designLoads, ast})=>{
    const combinedinput = {...inputData, ...designLoads, ...ast};
    return(
        <div className='check-for-shear'>
            <FormInput label='Vu' value={factoredShear(combinedinput)} subHeading='kn' readOnly />
            <FormInput label='nominal shear stress' value={normalShearStress(combinedinput)} subHeading='N/mm2' readOnly />
            <FormInput label='pt' value={fxn_pt({...inputData, ast})} subHeading='%' readOnly />
            <FormInput label='permissible stresses' name='permissible_stress' 
                value={fxn_permissibleStress({inputData, designLoads, ast})} subHeading='mm2' readOnly />
        </div>
    );
}

let mapStateToProps = (state)=>({
    inputData: state.inputData,
    designLoads: state.designLoads,
    ast: state.ast
})

let mapDispatchToProps = (dispatch)=>({
    handleChange: (evt)=>(dispatch(handleShearDataChange(evt)))
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckForShear)