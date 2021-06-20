import { connect } from 'react-redux'
import {BsToggleOn, BsToggleOff, BsGear, BsPerson, BsPersonFill} from 'react-icons/bs'
import { switchDetailedView, toggleSettingsMenu } from '../../../redux/settings/settings.actions';
import { CreateUserIfNotExists, SignInWithGoogle } from '../../../utils/firebase/firebase.utils';
import './settings.styles.scss'
import { Component } from 'react';
import { auth } from '../../../utils/firebase/firebase.utils';
import { setUser } from '../../../redux/user/user.actions';

class Settings extends Component{
    componentDidMount(){
        const {setUser} = this.props;
        auth.onAuthStateChanged(async (user)=>{
            let userRef = await CreateUserIfNotExists(user);
            userRef.onSnapshot((user)=>{
                setUser({
                    id: user.id,
                    ...user.data()
                });
            });
            
        });
    }
    render = ()=>{
        const {configs, switchDetailedView, toggleSettingsMenu, user} = this.props;
        const {detailedView, toggleSettings} = configs
        let switchModeTitle = detailedView?"Detailed View":"Switch to Detailed View";
        let profileTitle = user?user.displayName:"Sign In";
        return(
            <div className="settings">
                <BsGear onClick={()=>toggleSettingsMenu(toggleSettings)}/>
                {
                    toggleSettings
                    ?(
                        <div className="settings-submenu">
                            <SettingsItem title={switchModeTitle}
                                status = {detailedView}
                                action = {switchDetailedView}
                                enabled={
                                    <BsToggleOn color="green"/>
                                }
                                disabled={
                                    <BsToggleOff/>
                                }
                            />
                            <SettingsItem title={profileTitle}
                                status = {user}
                                action = {SignInWithGoogle}
                                enabled={
                                    <BsPersonFill/>
                                }
                                disabled={
                                    <BsPerson/>
                                }
                            />
                        </div>
                    )
                    :null
                }
            </div>
        )
    }
}

let SettingsItem = ({title, status, action, enabled, disabled})=>{
    return(
        <div className="setting-item" onClick={action?()=>action(status):null}>
            {
                status
                ? enabled
                : disabled
            }
            {
                title
                ?<label className="label">{title}</label>
                :null

            }
        </div>
    )
}

let mapStateToProps = (state)=>({
    configs: state.configs,
    user: state.user
})
  
let mapDispatchToProps = (dispatch)=>({
    switchDetailedView: (detailedView)=>(dispatch(switchDetailedView(detailedView))),
    toggleSettingsMenu: (toogleSettings)=>(dispatch(toggleSettingsMenu(toogleSettings))),
    setUser: user=>(dispatch(setUser(user)))
})

export default  connect(mapStateToProps, mapDispatchToProps)(Settings);