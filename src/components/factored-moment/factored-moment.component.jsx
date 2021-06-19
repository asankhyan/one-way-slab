import { connect } from "react-redux";
import { roundOfDecimal } from "../../utils/number.utils";
import { designLoad } from "../design-loads/design-loads.component";
import FormInput from "../form-components/form-input/form-input.component";
import { centre_to_centre_spacing, clear_span_eff_depth } from "../spacing-depth/spacing-depth.component";

export const factoredMoment = ({d, clear_span, effective_cover, support_width,live_load, extra_dead_load}, roundoff)=>{
  //=(D19*POWER(MAX(D12:D13),2))/8
  let D19 = designLoad(d, live_load, extra_dead_load);
  let D12 = centre_to_centre_spacing(clear_span, support_width);
  let D13 = clear_span_eff_depth(clear_span, d , effective_cover);
  let res = D19 *  Math.pow((D13>D12?D13:D12), 2) / 8;
  
  if(isNaN(res)) return "";
    
  return roundoff?roundOfDecimal(res, 3):res;
}

export const factoredShear = ({clear_span, d,live_load, extra_dead_load}, roundoff)=>{
  //=D19*C4/2
  let D19 = designLoad(d,live_load, extra_dead_load);
  let res = (D19 * parseFloat(clear_span))/ 2;
  
  if(isNaN(res)) return "";
    
  return roundoff?roundOfDecimal(res, 3):res;
}

let FactoredMoments = ({inputData, designLoads})=>{
  return(
      <div className="factored-moment">
        <FormInput label='factored moment, Mu'
          subHeading="kn/m" readOnly
          value={roundOfDecimal(factoredMoment({...inputData, ...designLoads}), true)}/>
        <FormInput label='factored shear force, Vu'
          subHeading="kn" readOnly
          value={roundOfDecimal(factoredShear({...inputData, ...designLoads}),true)}/>
      </div>
  );
}
const mapStateToProps = (state)=>({
  inputData: state.inputData,
  designLoads:state.designLoads
})

export default connect(mapStateToProps)(FactoredMoments)