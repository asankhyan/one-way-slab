import { connect } from 'react-redux'
import {BsToggleOn, BsToggleOff} from 'react-icons/bs'
import { switchDetailedView } from '../../redux/configs/configs.actions'
import './header.styles.scss'

let Header = (props)=>{
    const {configs, switchDetailedView} = props;
    let switchModeTitle = "Switch Detailed View";
    return(
        <div className="header">
            <span className="app-title">
                One Way Slab
                <span className="sub-title">according to IS-456</span>
            </span>
            <div className="top-menu-icons">
                {
                    configs.detailedView
                    ? <BsToggleOn title={switchModeTitle} color="green" onClick={()=>switchDetailedView(configs.detailedView)}/>
                    : <BsToggleOff title={switchModeTitle} onClick={()=>switchDetailedView(configs.detailedView)}/>
                }
            </div>
        </div>
    )
}

let mapStateToProps = (state)=>({
    configs: state.configs
})
  
let mapDispatchToProps = (dispatch)=>({
    switchDetailedView: (detailedView)=>(dispatch(switchDetailedView(detailedView))) 
})

export default  connect(mapStateToProps, mapDispatchToProps)(Header);
