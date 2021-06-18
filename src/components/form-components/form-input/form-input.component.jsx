import './form-input.styles.scss'

let FormInput = ({label, handleChange, subHeading, ...otherInputAttrs})=>{
    return(
        <div className="form-group">
            {
                label 
                ? (<label className={`${otherInputAttrs.value?"shrink":""} input-label`}>{label}</label>) 
                : null
            }
            <input className="form-input" autoComplete="off"
                onChange = {handleChange}
                {...otherInputAttrs}/>
            {
                subHeading 
                ? (<span className="sub-heading">{subHeading}</span>) 
                : null
            }
        </div>
    );
}

export default FormInput