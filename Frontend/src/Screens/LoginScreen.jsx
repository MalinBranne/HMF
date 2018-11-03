import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import RedirectIfAuthenticated from '../Auth/components/RedirectIfAuthenticated';

import { login } from '../Auth/actions';
import { LoginForm } from '../Auth';

class LoginScreen extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }),
    logIn: PropTypes.func.isRequired
  }

  handleSubmit = (values) => {
    const { logIn, history } = this.props;

    const user = {
      email: values.email,
      password: values.password
    };

    logIn(user, history);
  }

  render() {
    return (
      <RedirectIfAuthenticated>
        <LoginForm onSubmit={(values) => this.handleSubmit(values)} />
        <Link to="/">Tillbaka</Link>
      </RedirectIfAuthenticated>
    );
  }
}

function mapStateToProps(state) {
  return { token: state.rootReducer.token };
}

const mapDispatchToProps = dispatch => {
  return {
    logIn: (user, history) => dispatch(login(user, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);