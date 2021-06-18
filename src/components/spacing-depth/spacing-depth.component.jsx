import { connect } from "react-redux";
import { roundOfDecimal } from "../../utils/number.utils";
import FormInput from "../form-components/form-input/form-input.component";

export const centre_to_centre_spacing = (clear_span, support_width)=>{
    //=C4+C5
    let spacing = parseFloat(clear_span) + parseFloat(support_width); 
    
    if(isNaN(spacing)) return "";
    
    return roundOfDecimal(spacing);
}

export const clear_span_eff_depth = (clear_span, d , effective_cover)=>{
    //=C4+((C8-C10)/1000)
    let effDepth = parseFloat(clear_span) + ((parseFloat(d) - parseFloat(effective_cover))/1000); 
    
    if(isNaN(effDepth)) return "";
    
    return roundOfDecimal(effDepth);
}

let SpacingAndDepth = ({clear_span, support_width, d , effective_cover})=>{
    return(
        <div className="space-depth">
          <FormInput label='Centre to Centre spacing'
            subHeading="mm" readOnly
            value={centre_to_centre_spacing(clear_span, support_width)}/>
          <FormInput label='Clear span + Effective depth'
            subHeading="mm" readOnly
            value={clear_span_eff_depth(clear_span, d , effective_cover)}/>
        </div>
    );
}
const mapStateToProps = (state)=>({
    ...state.inputData  
})


export default connect(mapStateToProps, null)(SpacingAndDepth)