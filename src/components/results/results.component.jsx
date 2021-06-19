import { connect } from 'react-redux';
import { isAstValid } from '../area-tension-steel/area-tension-steel.component';
import { isDeflectionValid } from '../check-deflection/check-deflection.component';
import { isDevLengthValid, isDevLengthValidUsingNoHooks } from '../check-dev-length/check-dev-length.component';
import { isShearValid } from '../check-shear/check-shear.component';
import { isDistSteelValid } from '../distribution-steel/distribution-steel.component';
import { required_d } from '../effective-depth/effective-depth.component'
import Widget from '../widget/widget.component';
import './results.styles.scss'

let Results = (props)=>{
    const {inputData, designLoads} = props;
    let id = {...inputData, ...designLoads};
    const {d} = inputData;

    let depthStatus = false;
    let _d = parseFloat(d);
    let _required_d = parseFloat(required_d(id));
    if(!isNaN(_d) && !isNaN(_required_d)){
        depthStatus = _d > _required_d;
    }

    let ast_Status =  isAstValid(props);
    let distSteelStatus =  isDistSteelValid(props);
    let checkForShearStatus =  isShearValid(props);
    let checkForDeflectionStatus =  isDeflectionValid(props);
    let _isDevLengthValidUsingNoHooks =  isDevLengthValidUsingNoHooks(props);
    let _isDevLengthValid =  isDevLengthValid(props);
    
    return(
        <div className="results">
            <StatusButton title="Input Data" status={depthStatus} success="Depth Ok" error="Increase Depth"/>
            <StatusButton title="AST" status={ast_Status} success="AST Ok" error="Increase Steel"/>
            <StatusButton title="Distribution Steel" status={distSteelStatus} success="Distribution Steel Ok" error="Increase Steel"/>
            <StatusButton title="Check for Shear" status={checkForShearStatus} success="Shear Ok" error="Revise d"/>
            <StatusButton title="Check for deflection" status={checkForDeflectionStatus} success="Deflection Ok" error="Revise d"/>
            <StatusButton title="Check for dev length (No Hooks)" status={_isDevLengthValidUsingNoHooks} success="Dev Length Ok" error="Provide bend at centre of support"/>
            <StatusButton title="Check for Dev Length" status={_isDevLengthValid} success="Dev Length Ok" error="Provide bend at centre of support"/>
        </div>
    )
}

let StatusButton = ({title, status, success, error})=>{
    return(
        <Widget className={`status-button ${status?"success":"error"}`} title={title}>
            <span >{status?success:error}</span>
        </Widget>
    )
}

let mapStateToProps = (state)=>({
    inputData: state.inputData,
    designLoads: state.designLoads,
    ast: state.ast,
    distSteel: state.distSteel,
    checkDeflection: state.checkDeflection,
    checkDevLength: state.checkDevLength
})

export default connect(mapStateToProps)(Results)