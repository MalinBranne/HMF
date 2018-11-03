import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

class RegisterForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool.isRequired
  }

  renderField = ({
    input,
    label,
    type,
    meta: { touched, error }
  }) => (
    <div>
      <label>{label}</label>
      <div>
        <input {...input} placeholder={label} type={type} />
        {touched &&
            (error && <span>{error}</span>)
        }
      </div>
    </div>
  );
  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 font-weight-normal">Please sign up</h1>

        <Field
          name="email"
          type="text"
          component={this.renderField}
          label="Email"
        />


        {/* <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="username"
            className="form-control"
            name="username"
            placeholder="Enter Username"
            value={this.state.username}
            onChange={this.onChange} />
        </div> */}

        <Field
          name="password"
          type="password"
          component={this.renderField}
          label="Password"
        />
        <Field
          name="firstname"
          type="text"
          component={this.renderField}
          label="Firstname"
        />
        <Field
          name="lastname"
          type="text"
          component={this.renderField}
          label="Lastname"
        />
        <Field
          name="role"
          type="text"
          component={this.renderField}
          label="Role"
        />

        {/* <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password"
            className="form-control"
            name="password"
            placeholder="Enter Password"
            value={this.state.password}
            onChange={this.onChange} />
        </div> */}
        <Button variant="contained" type="submit" color="primary">
          Sign Up
        </Button>
      </form>
    );
  }
}
// const validate = values => {
//   const errors = {};
//   if (!values.username) {
//     errors.username = 'Required';
//   } else if (values.username.length > 15) {
//     errors.username = 'Must be 15 characters or less';
//   }
//   if (!values.password) {
//     errors.password = 'Required';
//   } else if (values.password < 3) {
//     errors.password = 'Password must be 3 characters or more';
//   }
//   return errors;
// };

export default reduxForm({
  form: 'RegisterForm', // a unique identifier for this form
  // validate // validate // <--- validation function given to redux-form
})(RegisterForm);