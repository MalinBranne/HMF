import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { compose } from 'redux';
import TextField from '@material-ui/core/TextField';
import QuestionForm from '../components/Assessment/Assessments/QuestionForm';
import NavBar from '../components/NavBar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import ScreenProtection from '../Auth/components/ScreenProtection';

const styles = theme => ({
  typography: {
    useNextVariants: true,
  },
  container: {
    display: 'center',
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

class CBDScreen extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    location: PropTypes.shape({
      state: PropTypes.shape({
        who: PropTypes.string
      }).isRequired
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      grades: '',
      whom: props.location.state.who,
      Who: '',
      Examinator: '',
      TheDate: '',
      selectedValue: '',
      Difficulty: '',
      Place: '',
      Focus: '',
      Clinical: '',
    };
  }
  handleSubmit = (e) => {
    console.log('THIS HAPPENS');
    e.preventDefault();

    console.log(this.state);

    fetch(`${process.env.REACT_APP_SERVER_URL}/Assessments`,
      {
        method: 'POST', // this will work because we set it up in the API js
        headers: {
          'Accept': 'application/json, text/plain */*',
          'Content-Type': 'application/json'
        },
        // Använt värden som lagrat i state här istället!
        body: JSON.stringify({
          Who: this.state.Who,
          Examinator: this.state.Examinator,
          TheDate: this.state.TheDate,
          Difficulty: this.state.Difficulty,
          Place: this.state.Place,
          Focus: this.state.Focus,
          Clinical: this.state.Clinical,
        })
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.props.history.push('/MainPage');

      })
      .catch((err) => console.log(err));

  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
      notobserved: false
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });

    // // State "laggar" av någon anledning och ligger ett klick efter!
    // console.log(this.state);
  };
  renderField = ({
    input,
    label,
    type,
    meta: { touched, error },
    classes
  }) => (
    <div>
      <label>{label}</label>
      <div>
        <TextField className={classes.textField} {...input} placeholder={label} type={type} />
        {touched &&
          (error && <span>{error}</span>)
        }
      </div>
      <div>
        <FormControl className={classes.FormControl} {...input} placeholder={label} type={type} />
        {touched &&
          (error && <span>{error}</span>)
        }
      </div>
    </div>
  );

  render() {
    const { classes } = this.props;
    return (
      <ScreenProtection>
        <NavBar history={this.props.history} />
        <div className="container">
          <div className="row" id="landing">
            <div className="col-md-6 mt-5 mx-auto" id="land">
              <form className={classes.container} noValidate autoComplete="off">
                <h2>Case Based Discussion (CBD) för: {this.state.who}</h2>
                <Field
                  id="Who"
                  name="Who"
                  component={this.renderField}
                  label="ST-läkare"
                  classes={classes.textField}
                  value={this.state.Who}
                  onChange={this.handleChange}
                  margin="normal"
                  variant="filled"
                />
                <Field
                  id="Examinator"
                  name="Examinator"
                  component={this.renderField}
                  label="Examinator"
                  classes={classes.textField}
                  value={this.state.Examinator}
                  onChange={this.handleChange}
                  margin="normal"
                  variant="filled"
                />
                <Field
                  id="TheDate"
                  name="TheDate"
                  component={this.renderField}
                  label="Datum"
                  classes={classes.textField}
                  value={this.state.TheDate}
                  onChange={this.handleChange}
                  margin="normal"
                  variant="filled"
                />
                <br/>
                <div className={classes.root}>
                  <Field component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Svårighetsgrad:</FormLabel>
                    <RadioGroup row={true}
                      id="Difficulty"
                      name="Difficulty"
                      className={classes.FormControl}
                      value={this.state.Difficulty}
                      onChange={this.handleChange}
                    >
                      <FormControlLabel value="Enkelt" control={<Radio color="primary" />} label="Enkelt" />
                      <FormControlLabel value="Medelsvårt" control={<Radio color="primary" />} label="Medelsvårt" />
                      <FormControlLabel value="Svårt" control={<Radio color="primary" />} label="Svårt" />
                    </RadioGroup>
                  </Field>
                </div>
                <div className={classes.root}>
                  <Field component="fieldset" className={classes.formControl1}>
                    <FormLabel component="legend">Plats:</FormLabel>
                    <RadioGroup row={true}
                      id="Place"
                      name="Place"
                      className={classes.FormControl}
                      value={this.state.Place}
                      onChange={this.handleChange}
                    >
                      <FormControlLabel value="Mottagning" control={<Radio color="primary" />} label="Mottagning" />
                      <FormControlLabel value="Avdelning" control={<Radio color="primary" />} label="Avdelning" />
                      <FormControlLabel value="Akutavdelning" control={<Radio color="primary" />} label="Akutavdelning" />
                      <FormControlLabel value="Operation" control={<Radio color="primary" />} label="Operation" />
                      <FormControlLabel value="Annat" control={<Radio color="primary" />} label="Annat" />
                    </RadioGroup>
                  </Field>
                </div>
                <div className={classes.root}>
                  <Field component="fieldset" className={classes.formControl3}>
                    <FormLabel component="legend">Kliniska frågeställningar:</FormLabel>
                    <RadioGroup row={true}
                      id="Clinical"
                      name="Clinical"
                      className={classes.FormControl}
                      value={this.state.Clinical}
                      onChange={this.handleChange}
                    >
                      <FormControlLabel value="Luftvägar" control={<Radio color="primary" />} label="Luftvägar" />
                      <FormControlLabel value="Cirkulation" control={<Radio color="primary" />} label="Cirkulation" />
                      <FormControlLabel value="Gastro" control={<Radio color="primary" />} label="Gastro" />
                      <FormControlLabel value="Neuro Smärta" control={<Radio color="primary" />} label="Neuro Smärta" />
                      <FormControlLabel value="Psyke" control={<Radio color="primary" />} label="Psyke" />
                      <FormControlLabel value="Annat" control={<Radio color="primary" />} label="Annat" />
                    </RadioGroup>
                  </Field>
                </div>
                <div className={classes.root}>
                  <Field component="fieldset" className={classes.formControl2}>
                    <FormLabel component="legend">Fokus för diskussionen:</FormLabel>
                    <RadioGroup row={true}
                      id="Focus"
                      name="Focus"
                      className={classes.FormControl}
                      value={this.state.Focus}
                      onChange={this.handleChange}
                    >
                      <FormControlLabel value="Datainsamlande" control={<Radio color="primary" />} label="Datainsamlande" />
                      <FormControlLabel value="Klinisk bedömning" control={<Radio color="primary" />} label="Klinisk bedömning" />
                      <FormControlLabel value="Behandling" control={<Radio color="primary" />} label="Behandling" />
                      <FormControlLabel value="Professionalism" control={<Radio color="primary" />} label="Professionalism" />
                    </RadioGroup>
                  </Field>
                </div>

                <QuestionForm data={{ id: 1, type: 'Journalanteckning' }} />
                <QuestionForm data={{ id: 2, type: 'Kliniska bedömningen' }} />
                <QuestionForm data={{ id: 3, type: 'Fortsatta undersökningar/remittering' }} />
                <QuestionForm data={{ id: 4, type: 'Behandling' }} />
                <QuestionForm data={{ id: 5, type: 'Uppföljning/framtidsplanering' }} />
                <QuestionForm data={{ id: 6, type: 'Professionalism' }} />
                <QuestionForm data={{ id: 7, type: 'Den sammansatta kliniska förmågan' }} />

                <Button variant="contained" color="primary" className={classes.button} type="submit">
                  Spara
                </Button>
              </form>
            </div>
          </div>
        </div>
      </ScreenProtection>
    );
  }
}
export default compose(
  reduxForm({
    form: 'cBDScreen' // a unique identifier for this form
  // validate // <--- validation function given to redux-form
  }),
  withStyles(styles)
)(CBDScreen);