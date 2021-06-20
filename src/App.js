import React from 'react';
import AreaOfTensionSteel from './components/area-tension-steel/area-tension-steel.component';
import DesignLoads from './components/design-loads/design-loads.component';
import DistributionSteel from './components/distribution-steel/distribution-steel.component';
import CheckForShear from './components/check-shear/check-shear.component';
import CheckForDeflection from './components/check-deflection/check-deflection.component';
import CheckDevLength from './components/check-dev-length/check-dev-length.component';
import InputData from './components/input-data/input-data.component';
import Widget from './components/widget/widget.component';
import Header from './components/common/header/header.component'
import SpacingAndDepth from './components/spacing-depth/spacing-depth.component'
import Results from './components/results/results.component';
import EffectiveDepth from './components/effective-depth/effective-depth.component';
import { connect } from 'react-redux';
import FactoredMoments from './components/factored-moment/factored-moment.component';
import './App.scss';

class App extends React.Component {
  render(){
    const {configs} = this.props; 
    return (
      <div className="app-container">
        <Header/>
        <div className="App">
          <Widget title="Input Data">
            <InputData/>
          </Widget>
          <div className="level2">
            <div className="level3">
              <Widget title="Design Loads">
                <DesignLoads/>
              </Widget>
              <Widget title="Area of Tension Steel (Ast)">
                <AreaOfTensionSteel/>
              </Widget>
              <Widget title="Distribution Steel">
                <DistributionSteel/>
              </Widget>
            </div>
            <Results/>
          </div>
        </div>
        {
          configs.detailedView
          ?(
            <div className="app-detailed-view">
              <Widget title="Spacing And Depth">
                <SpacingAndDepth/>
              </Widget>
              <Widget title="Factored Moments">
                <FactoredMoments/>
              </Widget>
              <Widget title="Effective Depth">
                <EffectiveDepth/>
              </Widget>
              <Widget title="Check For Shear">
                <CheckForShear/>
              </Widget>
              <Widget title="Check For Deflection">
                <CheckForDeflection/>
              </Widget>
              <Widget title="Check Dev Length">
                <CheckDevLength/>
              </Widget>
            </div>
          )
          :null
        }
      </div>
    );
  }
}

let mapStateToProps = (state)=>({
  configs: state.configs
})

export default  connect(mapStateToProps)(App);