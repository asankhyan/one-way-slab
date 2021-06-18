import React from 'react';
import AreaOfTensionSteel from './components/area-tension-steel/area-tension-steel.component';
import DesignLoads from './components/design-loads/design-loads.component';
import DistributionSteel from './components/distribution-steel/distribution-steel.component';
import InputData from './components/input-data/input-data.component';
import Widget from './components/widget/widget.component';
import './App.scss';
import Results from './components/results/results.component';

class App extends React.Component {  
  handleChange = (evt)=>{
    const {name, value} = evt.target;
    this.setState({[name]:value});
  }

  render(){
    return (
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
    );
  }
}

export default App;