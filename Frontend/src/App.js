import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import MainScreen from './Screens/MainScreen';
import LoginScreen from './Screens/LoginScreen';
import AdminScreen from './Screens/AdminScreen';
import RegisterScreen from './Screens/RegisterScreen';


import styles from './styles.css';


class App extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className={styles.App}>
        <Router>
          <div className="App">
            <Route exact path='/' component={MainScreen} />
            <Route exact path="/register" component={RegisterScreen} />
            <Route exact path="/login" component={LoginScreen} />
            <Route exact path='/admin' component={AdminScreen} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
