import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import MaterialButton from '@material-ui/core/Button';
import ScreenProtection from '../Auth/components/ScreenProtection';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import jwt_decode from 'jwt-decode';

class ShowRequestScreen extends Component {
  static propTypes = {
    location: PropTypes.shape({
      state: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        time: PropTypes.string,
        place: PropTypes.string,
        what: PropTypes.string,
        message: PropTypes.string,
        answer: PropTypes.string
      }).isRequired
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      id: props.location.state.id,
      name: props.location.state.name,
      type: props.location.state.type,
      time: props.location.state.time,
      place: props.location.state.place,
      what: props.location.state.what,
      message: '',
      answer: '',
      user: {}
    };

    console.log(props);

    this.renderState = this.renderState.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    var token = localStorage.getItem('token');
    this.setState({
      user: jwt_decode(token)
    });
  }

  postBooking(e) {

    e.preventDefault();
    console.log(e);
    console.log('TEST TEST' + this.state.id);

    let fullName = this.state.user.firstname + ' ' + this.state.user.lastname;

    if (this.state.answer === 'Yes') {
      fetch(`${process.env.REACT_APP_SERVER_URL}/users/${this.state.user.userId}/bookings`,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            sender: this.state.name,
            receiver: fullName,
            type: this.state.type,
            what: this.state.what,
            where: this.state.place,
            time: this.state.time,
            message: this.state.message
          })
        })
        .then((res) => res.json())
        .then(() => {
          console.log('Request har pushats till bookings array');
       
        })
        .catch((err) => console.log(err));
    }

    this.deleteRequest(this.state.id);

    this.props.history.push({
      pathname: '/confirm-request',
      state: {
        name: this.state.name,
        type: this.state.type,
        time: this.state.time,
        place: this.state.place,
        message: this.state.message,
        answer: this.state.answer
      }
    });
    
 
  }

  
  deleteRequest = (id) => {
 
    fetch(`${process.env.REACT_APP_SERVER_URL}/users/${this.state.user.userId}/requests`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json; test/plain */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ _id: id })
    }).then(res => {
      console.log(res);

    })
      .catch((err) => console.log(err));
  }


  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  renderState() {

    return (<div>
      <div><p>Förfrågan för en {this.state.type} av {this.state.name}</p></div>
      <div><p> den {this.state.date} klockan {this.state.time} på {this.state.place}</p></div>
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

          <form onSubmit={(e) => this.postBooking(e) && this.deleteRequest(this.state.id)}>
            <div className="col-sm-12" style={{ display: 'flex', justifyContent: 'center' }}>
              <label className="mt-4 col-sm-1">
                <input name="answer" type="radio" value="Yes" className="form-control" onChange={this.onChange} />
                Ja, boka in
              </label>
              <label className="mt-4 col-sm-1">
                <input name="answer" type="radio" value="No" className="form-control" onChange={this.onChange} />
                Nej
              </label>
            </div>

            <label htmlFor="message" className="col-sm-12">Meddelande:</label>
            <div>
              <textarea id="message" type="text" className="form-control" name="message" placeholder="Skriv meddelande här:"
                onChange={this.onChange} value={this.state.message} cols="30" rows="10"></textarea>
            </div>
            <MaterialButton variant='contained' color='primary' type="submit">
              Skicka
            </MaterialButton>
          </form>

        </div>
      </ScreenProtection>
    );
  }
}

export default ShowRequestScreen;