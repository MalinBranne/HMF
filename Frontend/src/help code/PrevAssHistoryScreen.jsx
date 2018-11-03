import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import PropTypes from 'prop-types';
import ScreenProtection from '../Auth/components/ScreenProtection';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';


class PrevAssHistoryScreen extends Component {
  static propTypes = {
    location: PropTypes.shape({
      state: PropTypes.shape({
        name: PropTypes.string,
        type: PropTypes.string,
        Date: PropTypes.string,
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
      Date: props.location.state.Date,
      message: '',
      answer: ''
    };

    console.log(props);

    this.renderState = this.renderState.bind(this);
    this.onChange = this.onChange.bind(this);

  }


  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  renderState() {
    
    return (<div>
      <h2>{this.state.name}</h2>
      <h4>ST-Läkare</h4>
      <h3>{this.state.type} genomförd {this.state.Date}</h3>

    </div>
    );
  }

  render() {

    return (
      <ScreenProtection>
        <div>
          <NavBar history={this.props.history} />
          <Avatar>
            <ImageIcon />
          </Avatar>
          {this.renderState()}
        </div>
      </ScreenProtection>

    );
  }
}

export default PrevAssHistoryScreen;