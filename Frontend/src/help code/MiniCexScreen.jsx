import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import PropTypes from 'prop-types';
import ScreenProtection from '../Auth/components/ScreenProtection';
import MiniCexForm from '../components/MiniCexForm';
import jwt_decode from 'jwt-decode';

class MiniCexScreen extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired,
    location: PropTypes.shape({}).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }


  componentDidMount() {
    var token = localStorage.getItem('token');
    this.setState({
      user: jwt_decode(token)
    });
  }

  handleSubmit = (values) => {

    console.log('VALUES',values);
    // type: props.location.state.type,
    //   who: props.location.state.who,
    //   examinator: '',
    //   what: props.location.state.what,
    //   place: props.location.state.where,
    //   date: props.location.state.date,
    //   message: props.location.state.message,

    // const { user } = this.props;

    // let fullName = this.state.user.firstname + ' ' + this.state.user.lastname;

    // // e.preventDefault();

    // fetch(`${process.env.REACT_APP_SERVER_URL}/users/${this.state.user.userId}/assessments`,
    //   {
    //     method: 'POST', // this will work because we set it up in the API js
    //     headers: {
    //       'Accept': 'application/json, text/plain */*',
    //       'Content-Type': 'application/json'
    //     },
    //     // Använt värden som lagrat i state här istället!
    //     body: JSON.stringify({
    //       type: this.state.type,
    //       who: this.state.who,
    //       examinator: fullName,
    //       what: this.state.what,
    //       place: this.state.place,
    //       date: this.state.date,
    //       message: this.state.message,
    //       difficulty: this.state.difficulty,
    //       location: this.state.location,
    //       focus: this.state.focus,
    //       clinical: this.state.clinical,
    //     })
    //   })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     this.props.history.push({
    //       pathname: '/confirm-assessment',
    //       state: {
    //         who: this.state.who,
    //         type: this.state.type,
    //         date: this.state.date,
    //         place: this.state.place,
    //       }
    //     }
    //     );

    //   })
    //   .catch((err) => console.log(err));


    console.log('values', values);
  }

  render() {
    return (
      <ScreenProtection>
        <NavBar history={this.props.history} />
        <MiniCexForm
          onSubmit={(values) => this.handleSubmit(values)}
          location={this.props.location}
          history={this.props.history}/>
      </ScreenProtection>
    );
  }
}
export default MiniCexScreen;