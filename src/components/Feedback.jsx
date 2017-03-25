import React, { PropTypes, Component } from 'react';
import StudyNavigation from './StudyNavigation.jsx'
import { Field, reduxForm, formValueSelector, reset  } from 'redux-form';
import { RadioButton } from 'material-ui/RadioButton';
import {
  RadioButtonGroup,
  SelectField,
  TextField,
  Checkbox,
  Toggle
} from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import likert from '../style/likert.scss';

const required = value => value ? undefined : 'Required';
//const required = pristine => pristine ? 'undefined' : undefined;


const renderRadioGroup = ({ input, ...rest, meta: { touched, error, warning } }) => (
    <RadioButtonGroup {...input} {...rest}
      valueSelected={input.value}
      onChange={(event, value) => input.onChange(value)}/>
)

const renderCheckbox = ({ input, label }) => (
  <Checkbox label={label}
    checked={input.value ? true : false}
    onCheck={input.onChange}/>
)

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    style={{  width: '100%' }}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

class Feedback extends Component {

  submitMyForm(data) {
    const { onSubmit, reset,resetForm } = this.props;
    reset();
    if(data.freetext)
      return onSubmit(data.freetext);
    else if(data.feedbackSingle)
      return onSubmit(data.feedbackSingle);
    else
    return  onSubmit(data);
    //
      // do other success stuff

  }


  render() {
    const { handleSubmit , pristine, submitting , invalid } = this.props;
    let component;

    if(this.props.data.feedbackType == "likert"){
      let width = 1/this.props.data.scale.length*100;
      component =  (<div >
                        {this.props.data.options.map((question, i) =>
                          <div style={{display: 'flex',flex: 1,flexBasis: '100%'}} key={question}>
                            <span style={{width:'20%', wordWrap: "break-word"}}>{question}</span>
                            <Field  validate={required} warn={required} style={{width:'100%'}} name={i.toString()}   component={renderRadioGroup}>
                              {this.props.data.scale.map((option, i) =>
                                <RadioButton className="likert" labelStyle={{  width: '100%',textAlign:'center',fontSize: '10px' }} style={{ display: 'inline-block', width: `${width}%` }} key={option.value} value={option.value}label={option.label}/>
                              )}
                            </Field>
                          </div>
                        )}
                    </div>);
    }
    else if(this.props.data.feedbackType == "single choice"){
      component =  (<Field name="feedbackSingle"  component={renderRadioGroup}>
                    {this.props.data.options.map((option, i) =>
                      <RadioButton key={option.value} name={i.toString()}  value={option.value}label={option.label}/>
                    )}
                  </Field>);
    }
    else if(this.props.data.feedbackType == "multiple choice"){
      component =  (<div>
                    {this.props.data.options.map((option, i) =>
                       <Field key={option.value} name={i.toString()}  component={Checkbox} value={option.value}label={option.label}/>
                    )}
                  </div>);
    }
    else if(this.props.data.feedbackType == "freetext"){
      component = (<Field name="freetext" component={renderTextField} label="Antwort" multiLine={true} rows={5}/>)
    }
    else {
      return <div><pre>{this.props.data.question}</pre><br/><RaisedButton onTouchTap={this.props.onSubmit.bind(null,null,null,null,null)} label="Submit" secondary={true} /> </div>
    }




    return (
      <div>
          <form onSubmit={handleSubmit(this.submitMyForm.bind(this))}>
            <pre>{this.props.data.question}</pre><br/>
            {component}
            <br/>
            <RaisedButton type="submit" label="Submit" secondary={true} disabled={pristine || submitting || invalid } />
          </form>
      </div>

    );
  }
}

// Decorate the form component
Feedback = reduxForm({
  form: 'feedback', // a unique name for this form,
  enableReinitialize:true
})(Feedback);


export default Feedback;
