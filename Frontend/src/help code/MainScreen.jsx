import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import RequestComponent from '../components/Requests/IncRequest.component';
import BookingComponent from '../components/Bookings/Booking.component';
import ScreenProtection from '../Auth/components/ScreenProtection';

import NavBar from '../components/NavBar';
import '../css/MainScreen.css';


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});
class MainScreen extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    })
  }
  render() {
    return (
      <ScreenProtection>
        <NavBar history={this.props.history} />

        <h1>Huvudsidan</h1>
        <div id="requests">
          <RequestComponent />
        </div>
        <div id="bookings">
          <BookingComponent />
        </div>
        <div>
          <Link to="/diary">
            <Button variant="contained" type="button">
              Min Dagbok
            </Button>
          </Link>
        </div>
        <div>
          <Link to="/prev-assessment">
            <Button variant="contained" type="button">
              Tidigare bedömningar
            </Button>
          </Link>
        </div>
        <div>
          <Link to={{
            pathname: '/choose-adept-for-assessment',
            state: {
              type: 'mini-cex'
            }
          }}>
            <Button variant="contained" type="button">
              Mini-Cex
            </Button>
          </Link>
          <Link to={{
            pathname: '/choose-adept-for-assessment',
            state: {
              type: 'DOPS'
            }
          }}>
            <Button variant="contained" type="button">
              DOPS
            </Button>
          </Link>
          <Link to={{
            pathname: '/choose-adept-for-assessment',
            state: {
              type: 'CBD'
            }
          }}>
            <Button variant="contained" type="button">
              CBD
            </Button>
          </Link>
        </div>
      </ScreenProtection>
    );
  }
}
export default withStyles(styles)(MainScreen);