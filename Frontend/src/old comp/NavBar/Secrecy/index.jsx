import React, {Component} from 'react';
import NavBar from "../NavBar";



class Secrecy extends Component {
    

    
    
    render(){
        return(
            <div>
                <NavBar history={this.props.history} />
                <h1>Sekretess</h1>
                <p>GDPR</p>
                
            </div>

        );
    }
    
}

export default Secrecy;