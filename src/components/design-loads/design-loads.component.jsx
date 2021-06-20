import { connect } from "react-redux";
import { handleDesignLoadsDataChange } from "../../redux/design-loads/design-loads.actions";
import { roundOfDecimal } from "../../utils/number.utils";
import FormInput from "../common/form-input/form-input.component";

import './design-loads.styles.scss'

export const selfweight_of_slab = (d)=>{
  //=(D16+D17+D18)*1.5
  let res = (25 * d / 1000);

  if(isNaN(res)) return "";
  
  return roundOfDecimal(res);
}

export const designLoad = (d, live_load, extra_dead_load)=>{
  //=(D16+D17+D18)*1.5
  let res = (parseFloat(selfweight_of_slab(d)) + parseFloat(live_load) + parseFloat(extra_dead_load)) * 1.5;
  
  if(isNaN(res)) return "";
    
  return roundOfDecimal(res, 3);
}

let DesignLoads = ({handleChange,d, live_load, extra_dead_load, detailedView})=>{
  return(
      <div className="design-loads">
        {
          detailedView
          ?<FormInput label='selfweight of slab' subHeading="kn/m2" readOnly value={selfweight_of_slab(d)}/>
          : null
        }
        <FormInput label='live load' name='live_load' subHeading="kn/m3" handleChange = {handleChange} value={live_load}/>
        <FormInput label='extra dead load' name='extra_dead_load' subHeading="kn/m4" handleChange = {handleChange} value={extra_dead_load}/>
        {
          detailedView
          ?<FormInput label='design load' readOnly value={designLoad(d, live_load, extra_dead_load)}/>
          : null
        }
      </div>
  );
}

const mapStateToProps = (state)=>({
  ...state.inputData,
  ...state.designLoads,
  ...state.configs
  })
  
  const mapDispatchToProps = dispatch=>({
    handleChange: (evt) => dispatch(handleDesignLoadsDataChange(evt))
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(DesignLoads)
