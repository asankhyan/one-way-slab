import { connect } from "react-redux";
import { handleDevLengthChange } from "../../redux/check-dev-length/check-dev-length.actions";
import { astAtSupport } from "../area-tension-steel/area-tension-steel.component";
import { factoredShear } from "../factored-moment/factored-moment.component"
import FormInput from "../form-components/form-input/form-input.component"
import FormSelect from "../form-components/form-select/form-select.component";

let fxn_mu1 = ({fy, d, b, effective_cover, ast})=>{
    // 0.87*C7*(C8-C10)*D36*(1-((D36*C7)/(C9*(C8-C10)*20)))
    let _d36 = astAtSupport(ast);
    return 0.87 * fy * (d - effective_cover)* _d36 * (1-((_d36* fy)/(b*(d-effective_cover)*20)))
}

let fxn_vu = ({clear_span, d,live_load, extra_dead_load})=>{
    // D23*1000
    return factoredShear({clear_span, d,live_load, extra_dead_load})* 1000;
}

let fxn_ld = ({fy, ast,m})=>{
    // (D31*0.87*C7)/(4*E63)
    let _d31 = ast.bar_dia;
    console.log({fy, ast,m});
    return (_d31 * 0.87 * fy)/(4 * m)
}

let CheckDevLength = ({handleChange, inputData, designLoads, checkDevLength, ast})=>{
    let {no_hooks_Lo, m_options, m} = checkDevLength;
    let _mu1 = fxn_mu1({...inputData, ast});
    let _vu = fxn_vu({...inputData, ...designLoads});
    let _ld = fxn_ld({...inputData, ast,m});
    let _lo = 8 * ast.bar_dia;
    return(
        <div className='check-dev-length'>
            <FormInput value={_mu1} name='mu1' label='Mu1' subHeading='N/mm' readOnly/>
            <FormInput value={_vu} name='Vu' label='Vu' subHeading='N'readOnly/>
            <FormInput value={_ld} name='mu1' label='Ld' readOnly/> 
            <FormSelect options={m_options} value={m} name='m' handleChange={handleChange}/>
            <FormInput value={no_hooks_Lo} name='no_hooks_lo' label='using no hooks, Lo' readOnly/>
            <FormInput value={(_mu1/_vu)+no_hooks_Lo} label='(mu1/v)+Lo' readOnly/>
            <FormInput value={_lo} name='lo' label='Lo' readOnly/>
            <FormInput value={(_mu1/_vu)+_lo} label='(mu1/v)+Lo' readOnly/>
        </div>
    )
}

const mapStateToProps = (state)=>({
    inputData: state.inputData,
    designLoads: state.designLoads,
    ast: state.ast,
    checkDevLength: state.checkDevLength
})

const mapDispatchToProps = dispatch=>({
    handleChange: (evt) => dispatch(handleDevLengthChange(evt))
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckDevLength)