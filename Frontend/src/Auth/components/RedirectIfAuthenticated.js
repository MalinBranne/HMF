import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class RedirectIfAuthenticated extends Component {
  static propTypes = {
    children: PropTypes.arrayOf(
      PropTypes.node
    )
  }

  render() {
    const { children } = this.props;
    return localStorage.token ? <Redirect to="/" /> : children;
  }
}

export default withRouter(RedirectIfAuthenticated);