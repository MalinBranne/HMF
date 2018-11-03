import React, { Component } from 'react';
// import QuestionForm from '../QuestionForm';
import NavBar from '../../../NavBar';
import PropTypes from 'prop-types';

class ThreeSixty extends Component {
  static propTypes = {
    location: PropTypes.shape({
      state: PropTypes.shape({
        who: PropTypes.string
      }).isRequired
    }).isRequired,
    history: PropTypes.shape({}).isRequired
  };
  constructor(props) {
    super(props);

    this.state = {
      who: props.location.state.who
    };
  }

  render() {
    return (
      <div>
        <NavBar history={this.props.history} />
        <h1>360 grader (Sheffield Peer Review Assessment Tool) för: {this.state.who}</h1>

      </div>
    );
  }
}
export default ThreeSixty;