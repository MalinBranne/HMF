import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Settings extends Component {


  constructor(props) {
    super(props);

    this.goBack = this.goBack.bind(this);
  }

    handleLogout = (event) => {
      event.preventDefault();
      this.props.history.push('/home');
    }

    goBack() {
      this.props.history.goBack();
    }


    render() {
      return (
        <div>
          <h1>Inställningar</h1>
          <Link to="SwitchPassword">
            <button type="button">Byt lösenord</button>
          </Link>
          <Link to="Secrecy">
            <button type="button">Sekretess</button>
          </Link>
          <button type="button" onClick={this.handleLogout.bind(this)}>Logga ut</button>
          <br />
          <br />
          <button onClick={this.goBack}>
                    Tillbaka
          </button>
        </div>
      );
    }
}

export default Settings;