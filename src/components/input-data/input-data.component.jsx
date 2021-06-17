import { connect } from "react-redux";
import { handleInputDataChange } from "../../redux/input-data/input-data.actions";
import FormInput from "../form-components/form-input/form-input.component";

import './input-data.styles.scss'

let InputData = ({handleChange, clear_span,support_width, fck, fy, d, b , effective_cover})=>{
    return(
        <div className="input-data">
          <FormInput label='CLEAR SPAN' name='clear_span'
            subHeading="m"
            value={clear_span} handleChange={handleChange}/>
          <FormInput label='SUPPORT WIDTH' name='support_width'
            subHeading="m"
            value={support_width} handleChange={handleChange}/>
          <FormInput label='fck' name='fck'
            subHeading="n/mm2"
            value={fck} handleChange={handleChange}/>
          <FormInput label='fy' name='fy'
            subHeading="n/mm3" 
            value={fy} handleChange={handleChange}/>
          <FormInput label='d' name='d'
            subHeading="mm" 
            value={d} handleChange={handleChange}/>
          <FormInput label='b' name='b' 
            subHeading="mm" 
            value={b} handleChange={handleChange}/>
          <FormInput label='Effective Cover' name='effective_cover'
            subHeading="mm" 
            value={effective_cover} handleChange={handleChange}/>
        </div>
    );
}

const mapStateToProps = (state)=>({
...state.inputData  
})

const mapDispatchToProps = dispatch=>({
  handleChange: (evt) => dispatch(handleInputDataChange(evt))
})

export default connect(mapStateToProps, mapDispatchToProps)(InputData)