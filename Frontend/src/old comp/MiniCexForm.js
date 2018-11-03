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

const topFields = [
  {
    id: 'who',
    label: 'ST-läkare'
  },
  {
    id: 'examinator',
    label: 'Examinator'
  },
  {
    id: 'date',
    label: 'Datum'
  }];

class MiniCexForm extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    location: PropTypes.shape({
      state: PropTypes.shape({
        type: PropTypes.string,
        who: PropTypes.string,
        what: PropTypes.string,
        date: PropTypes.string,
        place: PropTypes.string,
        message: PropTypes.string,
        where: PropTypes.string
      }).isRequired
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired,
    handleSubmit: PropTypes.func.isRequired
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
    const { classes, handleSubmit } = this.props;
    return (
      <ScreenProtection>
        <NavBar history={this.props.history} />
        <div className="container">
          <div className="row" id="landing">
            <div className="col-md-6 mt-5 mx-auto" id="land">
              <form onSubmit={handleSubmit} className={classes.container} noValidate autoComplete="off">
                <h2>Mini Clinical Evaluation Form (Mini-CEX)</h2>

                {topFields.map((field, i)=>
                  <Field
                    key={i}
                    id={field.id}
                    name={field.id}
                    component={this.renderField}
                    label={field.label}
                    classes={classes}
                    onChange={this.handleChange}
                    margin="normal"
                    variant="filled"
                  />
                )}

                <br/>

                <div className={classes.root}>
                  <Field name="difficulty" component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Svårighetsgrad:</FormLabel>
                    <RadioGroup row={true}
                      id="difficulty"
                      name="difficulty"
                      className={classes.group}
                      onChange={this.handleChange}
                    >
                      <FormControlLabel value="Enkelt" control={<Radio color="primary" />} label="Enkelt" />
                      <FormControlLabel value="Medelsvårt" control={<Radio color="primary" />} label="Medelsvårt" />
                      <FormControlLabel value="Svårt" control={<Radio color="primary" />} label="Svårt" />
                    </RadioGroup>
                  </Field>
                </div>
                <div className={classes.root}>
                  <Field name="place" component="fieldset" className={classes.formControl1}>
                    <FormLabel component="legend">Plats:</FormLabel>
                    <RadioGroup row={true}
                      id="place"
                      name="place"
                      className={classes.group}
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
                  <Field name="focus" component="fieldset" className={classes.formControl2}>
                    <FormLabel component="legend">Fokus för utvärderingen:</FormLabel>
                    <RadioGroup row={true}
                      id="focus"
                      name="focus"
                      className={classes.group}
                      onChange={this.handleChange}
                    >
                      <FormControlLabel value="Anamnes Status" control={<Radio color="primary" />} label="Anamnes Status" />
                      <FormControlLabel value="Diagnos" control={<Radio color="primary" />} label="Diagnos" />
                      <FormControlLabel value="Behandling" control={<Radio color="primary" />} label="Behandling" />
                      <FormControlLabel value="Rådgivning" control={<Radio color="primary" />} label="Rådgivning" />
                    </RadioGroup>
                  </Field>
                </div>
                <div className={classes.root}>
                  <Field name="clinical" component="fieldset" className={classes.formControl3}>
                    <FormLabel component="legend">Kliniska frågeställningar:</FormLabel>
                    <RadioGroup row={true}
                      id="clinical"
                      name="clinical"
                      className={classes.group}
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

                <QuestionForm data={{ id: 1, type: 'Anamnes' }} />
                <QuestionForm data={{ id: 2, type: 'Status' }} />
                <QuestionForm data={{ id: 3, type: 'Medmänsklighet/proffesionalism' }} />
                <QuestionForm data={{ id: 4, type: 'Klinisk bedömningsförmåga' }} />
                <QuestionForm data={{ id: 5, type: 'Skicklighet i rådgivning' }} />
                <QuestionForm data={{ id: 6, type: 'Organisationsförmåga/effektivitet' }} />
                <QuestionForm data={{ id: 7, type: 'Den sammanfattande kliniska förmågan' }} />

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
    form: 'miniCexForm' // a unique identifier for this form
  // validate // <--- validation function given to redux-form
  }),
  withStyles(styles)
)(MiniCexForm);