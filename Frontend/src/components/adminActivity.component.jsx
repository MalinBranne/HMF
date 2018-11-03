import React, { Component } from 'react';
import NavBar from './NavBar';
import { ActivityComponent } from './activity.component';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MaterialButton from '@material-ui/core/Button';
import { ScreenProtection } from '../../../Auth';
// import { withRouter } from 'react-router';

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
export class Entry extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    location: PropTypes.shape({
      state: PropTypes.shape({
        key: PropTypes.number,
        index: PropTypes.number,
        item: PropTypes.object,
        id: PropTypes.string,
        title: PropTypes.string,
        text: PropTypes.string,
        created: PropTypes.string,
        edit: PropTypes.bool
      }).isRequired
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      key: this.props.location.state.key, //index in list of entries
      index: this.props.location.state.index, //index in list of entries
      item: this.props.location.state.item,
      id: this.props.location.state.id,
      title: this.props.location.state.title,
      text: this.props.location.state.text,
      created: this.props.location.state.created,
      edit: false,
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }


  backBtn = (e) => {
    e.preventDefault();
    this.props.history.push('/diary');
  }


  //visar formuläret för uppdatering
  editEntry = () => {
    document.getElementById('output').style.display = 'block';
  }

  saveEntry = (e) => {
    e.preventDefault();

    let title = document.getElementById('updateTitle').value;
    let text = document.getElementById('updateText').value; // getting value from inputs

    fetch(`${process.env.REACT_APP_SERVER_URL}/diary/${this.state.item._id}`, //man kan lika väl skicka in this.state.entry._id. om entry häntas på component did mount, vilket bara finns där som test
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          _id: this.state.item._id,
          title: title, text: text
        }) //uppdaterat ändringar
      })
      .then((res) => res.json())
      .then((data) => {
        console.log('Inlägg id: ' + data._id + 'har uppdaterats');
        this.props.history.push('/diary');
      })
      .catch((err) => console.log(err));

  }

  deleteEntry = (event) => {
    event.preventDefault();

    fetch(`${process.env.REACT_APP_SERVER_URL}/diary/${this.state.item._id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json; test/plain */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ _id: this.state.item._id })
    }).then(res => {
      console.log(res);
      this.props.history.push('/diary');

    })
      .catch((err) => console.log(err));
  }

  render() {
    const { classes } = this.props;
    return (
      // console.log(this.state.item),
      <ScreenProtection>
        <div>
          <NavBar history={this.props.history} />
          <div id={this.state.id}>
            <ActivityComponent id={this.state.id} title={this.state.title} text={this.state.text} created={this.state.created} />
            <div id="output" style={{ display: 'none' }}>
              <form id="updateEntry" onSubmit={this.saveEntry} style={{ padding: '1em' }}>
                <h2>Redigera inlägg</h2>
                <div>
                  <TextField
                    id="updateTitle"
                    name="updateTitle"
                    label="Rubrik"
                    className={classes.textField}
                    margin="normal"
                    variant="filled"
                  />
                </div>
                <br />
                <div>
                  <TextField
                    id="updateText"
                    name="updateText"
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
            </div>

            <MaterialButton type="submit" variant='contained' color='primary' onClick={this.editEntry}>
              Redigera
            </MaterialButton>
            <MaterialButton type="submit" variant='contained' color='primary' onClick={this.deleteEntry}>
              Ta bort
            </MaterialButton>
            <MaterialButton variant='contained' color='primary' onClick={this.backBtn}>
              Tillbaka
            </MaterialButton>
          </div>

        </div>
      </ScreenProtection>


    );
  }
}
export default withStyles(styles)(Entry);
