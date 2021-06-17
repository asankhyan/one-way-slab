import { connect } from "react-redux";
import { handleDeflectionChange } from "../../redux/check-deflection/check-deflection.actions";
import { roundOfDecimal } from "../../utils/number.utils";
import { areaOfTensionSteel, providedSteel } from "../area-tension-steel/area-tension-steel.component"
import FormInput from "../form-components/form-input/form-input.component"
import FormSelect from "../form-components/form-select/form-select.component";
import { clear_span_eff_depth } from "../spacing-depth/spacing-depth.component";

let requiredPt = (combinedinput)=>{
    const {b, d, effective_cover} = combinedinput;
    let d30 = areaOfTensionSteel(combinedinput);
    let res = (d30 * 100)/(b * (d - effective_cover));
    return roundOfDecimal(res, 3);
}

let providedPt = (combinedinput)=>{
    const {b, d, effective_cover} = combinedinput;
    let d34 = providedSteel(combinedinput.ast)
    let res = (d34 * 100)/(b * (d - effective_cover));
    return roundOfDecimal(res, 3);
}

let providedLd = (combinedinput)=>{
    // (D13*1000)/(C8-C10)
    const {clear_span, d, effective_cover} = combinedinput;
    let d13 = clear_span_eff_depth(clear_span, d , effective_cover);
    let res = (d13 * 1000)/(d - effective_cover);
    return roundOfDecimal(res, 6);
}

let fxn_mod_mft = (_mod_fs, _providedPt)=>{
    /* IF(
        ROUND(1/(0.225+(0.00322*I55)-(0.625*LOG(1/K55,10))),2)
        >=2,2,ROUND(1/(0.225+(0.00322*I55)-(0.625*LOG(1/K55,10))),2))
    */
    let _i55 = _mod_fs;
    let _k55= _providedPt;
    let res = roundOfDecimal(1/(0.225+(0.00322*_i55)-(0.625*Math.log10(1/_k55))))
    if(res>2){
        return 2;
    }
    return res;
}

let fxn_mod_fs = ({mod_fac_fy, _requiredPt, _providedPt})=>{
    return roundOfDecimal(0.58 * mod_fac_fy *_requiredPt / _providedPt)
}

let CheckForDeflection = ({handleChange, inputData, designLoads, ast, checkDeflection})=>{
    const combinedinput = {...inputData, ...designLoads, ...ast};
    const {mod_fac_fy} = checkDeflection;
    let options = [215, 225, 240, 250, 330, 340, 350, 415, 500];
    let _requiredPt = requiredPt(combinedinput);
    let _providedPt = providedPt({...inputData, ast});
    let _mod_fs = fxn_mod_fs({mod_fac_fy, _requiredPt, _providedPt})
    let _mod_mft = fxn_mod_mft(_mod_fs, _providedPt);
    return(
        <div className="check-for-deflection">
            <FormInput label='required pt' value={_requiredPt} subHeading='kn' readOnly />
            <FormInput label='provided pt' value={_providedPt} subHeading='N/mm2' readOnly />
            <FormInput label='max l/d' value={20*1} subHeading='%' readOnly />
            <FormInput label='provided l/d' value={providedLd(combinedinput)} subHeading='mm2' readOnly />
            <div className='mod-factor-for-tension'>
                <table border='1'>
                    <thead>
                        <tr>
                            <th colSpan='5'>Modification factor for tension reinforcement</th>
                        </tr>
                        <tr>
                            <td colSpan='5'>Ref IS 456:2000 Fig 4</td>
                        </tr>
                        <tr>
                            <td>fy</td>
                            <td>fs</td>
                            <td>pt req</td>
                            <td>pt prov.</td>
                            <td>MFt</td>
                        </tr>
                        <tr>
                            <td>N/mm2</td>
                            <td>N/mm2</td>
                            <td>%</td>
                            <td>%</td>
                            <td>IS 456 Fig 4</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><FormSelect options={options} value={mod_fac_fy} name='mod_fac_fy' handleChange={handleChange}/></td>
                            <td>{_mod_fs}</td>
                            <td>{_requiredPt}</td>
                            <td>{_providedPt}</td>
                            <td>{_mod_mft}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}


const mapStateToProps = (state)=>({
    inputData: state.inputData,
    designLoads: state.designLoads,
    ast: state.ast,
    checkDeflection: state.checkDeflection
})

const mapDispatchToProps = dispatch=>({
    handleChange: (evt) => dispatch(handleDeflectionChange(evt))
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckForDeflection)