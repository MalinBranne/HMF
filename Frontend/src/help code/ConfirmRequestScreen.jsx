import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import MaterialButton from '@material-ui/core/Button';
import ScreenProtection from '../Auth/components/ScreenProtection';

class ConfirmRequestScreen extends Component {
  static propTypes = {
    location: PropTypes.shape({
      state: PropTypes.shape({
        name: PropTypes.string,
        type: PropTypes.string,
        date: PropTypes.string,
        time: PropTypes.string,
        place: PropTypes.string,
        message: PropTypes.string,
        answer: PropTypes.string
      }).isRequired
    }).isRequired,
    history: PropTypes.shape({}).isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      name: props.location.state.name,
      type: props.location.state.type,
      date: props.location.state.date,
      time: props.location.state.time,
      place: props.location.state.place,
      message: props.location.state.message,
      answer: props.location.state.answer
    };


  }


  render() {

    if (this.state.answer == 'Yes') {
      return (
        <ScreenProtection>
          <div>
            <NavBar history={this.props.history} />
            

            <div>
              <p>Bedömning av {this.state.type} på {this.state.name} klockan {this.state.time}</p>
              <p>den {this.state.date} på {this.state.place} är bokad.</p>
              <p>{this.state.message}</p>
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
    else if (this.state.answer == 'No') {
      return (
        <ScreenProtection>
          <div>
            <NavBar history={this.props.history} />
            

            <div>
              <p>Bedömningen av {this.state.type} på {this.state.name} klockan {this.state.time}</p>
              <p>den {this.state.date} på {this.state.place} är nekad och du har tackat nej till frågan</p>
              <p>{this.state.message}</p>
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

}

export default ConfirmRequestScreen;