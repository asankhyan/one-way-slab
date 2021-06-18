import { connect } from 'react-redux';
import { areaOfTensionSteel, providedSteel } from '../area-tension-steel/area-tension-steel.component';
import { fxn_max_ld, providedLd } from '../check-deflection/check-deflection.component';
import { isDevLengthValid, isDevLengthValidUsingNoHooks } from '../check-dev-length/check-dev-length.component';
import { fxn_permissibleStress, normalShearStress } from '../check-shear/check-shear.component';
import { distributionSteel, providedDistSteel } from '../distribution-steel/distribution-steel.component';
import { required_d } from '../effective-depth/effective-depth.component'
import Widget from '../widget/widget.component';
import './results.styles.scss'

let Results = (props)=>{
    const {inputData, designLoads, ast, distSteel, checkDeflection} = props;
    let id = {...inputData, ...designLoads};
    let ida = {...inputData, ...designLoads, ...ast};
    let idd = {...inputData, ...designLoads, ...distSteel};
    let idaCd = {...inputData, ...designLoads, ...ast, ...checkDeflection};
    const {d} = inputData;

    let depthStatus = false;
    let _required_d = required_d(id);
    if(d && _required_d){
        depthStatus = d > _required_d;
    }

    let ast_Status =  false;
    let _providedSteel = providedSteel(ast);
    let _areaOfTensionSteel = areaOfTensionSteel(ida);
    if(_providedSteel && _areaOfTensionSteel){
        ast_Status = _providedSteel > _areaOfTensionSteel;
    }

    let distSteelStatus =  false;
    let _providedDistSteel = providedDistSteel(distSteel);
    let _distributionSteel = distributionSteel(idd);
    if(_providedDistSteel && _distributionSteel){
        distSteelStatus = _providedDistSteel > _distributionSteel;
    }

    let checkForShearStatus =  false;
    let _normalShearStress = normalShearStress(ida);
    let _permissibleStress = fxn_permissibleStress(props);
    if(_normalShearStress && _permissibleStress){
        checkForShearStatus = _normalShearStress > _permissibleStress;
    }

    let checkForDeflectionStatus =  false;
    let _max_ld = fxn_max_ld(props);
    let _providedLd = providedLd(idaCd);
    if(_max_ld && _providedLd){
        checkForDeflectionStatus = _max_ld > _providedLd;
    }

    let _isDevLengthValidUsingNoHooks =  isDevLengthValidUsingNoHooks(props);
    let _isDevLengthValid =  isDevLengthValid(props);
    
    return(
        <div className="results">
            <StatusButton title="Input Data" status={depthStatus} success="Depth Ok" error="Increase Depth"/>
            <StatusButton title="AST" status={ast_Status} success="AST Ok" error="Increase Steel"/>
            <StatusButton title="Distribution Steel" status={distSteelStatus} success="Distribution Steel Ok" error="Increase Steel"/>
            <StatusButton title="Check for Shear" status={checkForShearStatus} success="Shear Ok" error="Revise d"/>
            <StatusButton title="Check for deflection" status={checkForDeflectionStatus} success="Deflection Ok" error="Revise d"/>
            <StatusButton title="Check for dev length (No Hooks)" status={_isDevLengthValidUsingNoHooks} success="Dev Length Using No Hooks Ok" error="Provide bend at centre of support"/>
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