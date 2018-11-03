import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScreenProtection } from '../../Auth';

class AddEntry extends Component {
  static propTypes = {
    history: PropTypes.shape({
      goBack: PropTypes.func.isRequired
    }).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
    };

    this.backBtn = this.backBtn.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {

    return (
      <ScreenProtection>
        <div className="container">
          <button type="button" className="btn btn-lg btn-light btn-block" onClick={this.backBtn}>
            Tillbaka
          </button>
        </div>
      </ScreenProtection>

    );
  }
}
export default AddEntry;

