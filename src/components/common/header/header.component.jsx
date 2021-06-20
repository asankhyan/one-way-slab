import './header.styles.scss'
import Settings from '../settings/settings.component'

let Header = (props)=>{
    return(
        <div className="header">
            <span className="app-title">
                One Way Slab
                <span className="sub-title">according to IS-456</span>
            </span>
            <Settings/>
        </div>
    )
}

export default  Header;
