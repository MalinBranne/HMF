import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
class ScreenProtection extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  render() {

    const { children } = this.props;
    return localStorage.token ? children : <Redirect to="/login" />;
  }
}

export default withRouter(ScreenProtection);