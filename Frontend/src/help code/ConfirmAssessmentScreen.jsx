import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import MaterialButton from '@material-ui/core/Button';
import ScreenProtection from '../Auth/components/ScreenProtection';

class ConfirmAssessmentScreen extends Component {
  static propTypes = {
    location: PropTypes.shape({
      state: PropTypes.shape({
        who: PropTypes.string,
        type: PropTypes.string,
        date: PropTypes.string,
        time: PropTypes.string,
        place: PropTypes.string

      }).isRequired
    }).isRequired,
    history: PropTypes.shape({}).isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      who: props.location.state.who,
      type: props.location.state.type,
      time: props.location.state.time,
      place: props.location.state.place
    };


  }

  render() {

    return (
      <ScreenProtection>
        <div>
          <NavBar history={this.props.history} />
            
          <div>
            <p>Bedömning {this.state.type} genomförd på {this.state.who} den {this.state.time}</p>
            <p> på {this.state.place}</p>
          </div>

          <Link to='/'>
            <MaterialButton variant='contained' color='primary'>
                Huvudmeny
            </MaterialButton>
          </Link>

        </div>
      </ScreenProtection>
    );
  
  }

}

export default ConfirmAssessmentScreen;