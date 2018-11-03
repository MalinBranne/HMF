import React, {Component} from 'react';
import NavBar from '../NavBar';


class SwitchPassword extends Component{
    

  render(){
    return(
      <div>
        <NavBar history={this.props.history} />
        <h1>Byt lösenord</h1>
                
      </div>
    );
  }
}

export default SwitchPassword;