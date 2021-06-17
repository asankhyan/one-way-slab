import './form-select.styles.scss'

let FormSelect = ({label, handleChange, subHeading, options, ...otherSelectAttrs})=>{
    return(
        <div className="form-group">
            {
                label 
                ? (<label className="input-label">{label}</label>) 
                : null
            }
            <select className="form-select"
                onChange = {handleChange}
                {...otherSelectAttrs}>
                {
                    options.map((option) => {
                        let displayValue = option;
                        let code = option;
                        if( typeof option === 'object'){
                            displayValue=option.displayValue;
                            code=option.code;
                        }
                        return (<option key={code} value={code}>{displayValue}</option>)
                    })
                }
            </select>
            {
                subHeading 
                ? (<span className="sub-heading">{}</span>) 
                : null
            }
        </div>
    );
}

export default FormSelect