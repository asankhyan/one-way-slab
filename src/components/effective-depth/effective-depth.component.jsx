import { connect } from "react-redux";
import { roundOfDecimal } from "../../utils/number.utils";
import { factoredMoment } from "../factored-moment/factored-moment.component";
import FormInput from "../form-components/form-input/form-input.component"

let max_d = ({fy})=>{
    return parseFloat(fy)===500?0.46:0.48;
}
let ru = ({fy, fck})=>{
    //0.36*C6*D26*(1-(0.42*D26))
    let d26 = max_d(fy);
    let res = (0.36 * fck * d26 * (1 - (0.42*d26)));
    return roundOfDecimal(res);
}

let required_d = (input)=>{
    // SQRT((D22*1000000)/(D27*C9))
    const {fy, fck, b} = input;
    let d22 = factoredMoment(input);
    let d27 = ru({fy, fck});
    let res = Math.sqrt((d22 * 1000000)/(d27 * b));
    return roundOfDecimal(res)
}

let fxn_a = ({fck, fy, d, b, effective_cover})=>{
    // (0.87*(C8-C10)*C7*C7)/(C6*C9*(C8-C10))
    let res = (0.87*(d-effective_cover)*fy*fy)/(fck*b*(d-effective_cover));
    return res;
}

let fxn_b = ({fy, d, effective_cover})=>{
    // -(0.87*(C8-C10)*C7)
    let res = -(0.87*(d-effective_cover)*fy);
    return res;
}

let fxn_c = (input)=>{
    // D22*1000000
    let d22 = factoredMoment(input);
    let res = d22 * 1000000;
    return res;
}

export const quadraticEq = (input, neg)=>{
    const {fck, fy, d, b, effective_cover} = input;
    let _a = fxn_a({fck, fy, d, b, effective_cover});
    let _b = fxn_b({fy, d, effective_cover});
    let _c = fxn_c(input);
    //(-P26+(SQRT((P26*P26)-(4*P25*P27))))/(2*P25)
    
    let res = (-_b + (neg?-1:1) * (Math.sqrt((_b*_b)-(4*_a*_c))))/(2 * _a);
    return roundOfDecimal(res, 3);;
}

let EffectiveDepth = ({inputData, designLoads})=>{
    const combinedinput = {...inputData, ...designLoads};
    return(
        <div className='eff-depth'>
            <div>
                <FormInput label='Xu max/d' value={max_d(inputData)} readOnly/>
                <FormInput label='Ru' value={ru(inputData)} readOnly/>
                <FormInput label='required d' value={required_d(combinedinput)} subHeading='mm' readOnly/>
            </div>
            <div>
                <FormInput label='a' value={fxn_a(inputData)} readOnly/>
                <FormInput label='b' value={fxn_b(inputData)} readOnly/>
                <FormInput label='c' value={fxn_c(combinedinput)} readOnly/>
                <div className='quadratic-eq'>
                    <label>Quadratic Eq</label>
                    <FormInput value={quadraticEq(combinedinput)} readOnly/>
                    <FormInput value={quadraticEq(combinedinput, true)} readOnly/>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state)=>({
    inputData: state.inputData,
    designLoads:state.designLoads
  })
  
  export default connect(mapStateToProps)(EffectiveDepth)