import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MaterialButton from '@material-ui/core/Button';
import NavBar from '../components/NavBar';
import ScreenProtection from '../Auth/components/ScreenProtection';


const styles = theme => ({
  root: {

  },
  view: {
    height: '200px'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});
class AddEntryScreen extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
    };

  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  backBtn = (e) => {
    e.preventDefault();
    this.props.history.push('/diary');
  }


  handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    this.props.history.push('/diary');
    // let title = document.getElementById('title').value;
    // let text = document.getElementById('text').value; // getting value from inputs

    // fetch('http://localhost:3001/diary',
    //   {
    //     method: 'POST', // this will work because we set it up in the API js
    //     headers: {
    //       'Accept': 'application/json, text/plain */*',
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ title: title, text: text })
    //   })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     this.props.history.push('/diary');

    //   })
    //   .catch((err) => console.log(err));

  }


  render() {
    const { classes } = this.props;
    return (
      <ScreenProtection>
        <div className="container">
          <NavBar history={this.props.history} />
          <div>
            <form id="addEntry" onSubmit={this.handleSubmit} style={{ padding: '1em' }}>
              <h2>Nytt inlägg</h2>
              <div>
                <TextField
                  id="title"
                  name="title"
                  label="Rubrik"
                  className={classes.textField}
                  margin="normal"
                  variant="filled"
                />
              </div>
              <br />
              <div>
                <TextField
                  id="text"
                  name="text"
                  label="Skriv här"
                  multiline
                  rows="6"
                  className={classes.textField}
                  margin="normal"
                  variant="filled"
                />
              </div>
              <br />

              <MaterialButton type="submit" variant='contained' color='primary'>
                Spara
              </MaterialButton>
            </form>
            <MaterialButton variant='contained' color='primary' onClick={this.backBtn}>
              Tillbaka
            </MaterialButton>
          </div>

        </div >
      </ScreenProtection>

    );
  }
}
export default withStyles(styles)(AddEntryScreen);

