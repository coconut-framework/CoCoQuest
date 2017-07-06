import React, { PropTypes, Component } from 'react';
import StudyNavigation from './StudyNavigation.jsx'
import { Field, reduxForm, formValueSelector, reset  } from 'redux-form';
import { RadioButton } from 'material-ui/RadioButton';
import Slider from 'material-ui/Slider';
import {
  RadioButtonGroup,
  SelectField,
  TextField,
  Checkbox,
  Toggle
} from 'redux-form-material-ui';
import {Tabs, Tab} from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import likert from '../style/likert.scss';
import tick from '../style/sea.scss';

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

//seaSlider Jakob
const seaSlider = ({input, label, defaultValue, scale, labels}) => (
  <div>
    <p>
      <span>{label}</span>
    </p>
    <div style={{position: 'relative', width : '20px', left:'15%'}}>
      <Slider style={{height:300}} axis="y" defaultValue={defaultValue}
        onChange={(event, value) => input.onChange(value)}
        />
      {scale.map((option, i) =>
          <div>
            <div  style={{position: 'absolute', width: '50%', 'background-color': 'black', height: '1px', bottom: `${option.value}%`}}> </div>
            <div  style={{position: 'absolute', bottom: `${option.value - 2.5}%`, right: '150%'}}> {option.label} </div>
          </div>
      )}
      {labels.map((option, i) =>
        <div>
          <div  style={{position: 'absolute', width: '100%', 'background-color': 'black', height: '1px', bottom: `${option.value}%`, left: '50%' }}> </div>
          <div  style={{position: 'absolute', bottom: `${option.value - 2.5}%`, left: '200%'}}> {option.label} </div>
        </div>
      )}
    </div>
  </div>
)

//nasaScale Jakob
const nasaScale = ({input, label, labelLeft, labelRigth}) => (
  <div>
    <p>
      <span>{label}</span>
    </p>
    <div style = {{ position: 'relative', 'border-color': 'black', 'border-width': '2px', 'border-style': 'solid'}}>
      <Tabs onChange={(val) => input.onChange(val)}>
        <Tab value={5}/>
        <Tab value={10}/>
        <Tab value={15}/>
        <Tab value={20}/>
        <Tab value={25}/>
        <Tab value={30}/>
        <Tab value={35}/>
        <Tab value={40}/>
        <Tab value={45}/>
        <Tab value={50}/>
        <Tab value={55}/>
        <Tab value={60}/>
        <Tab value={65}/>
        <Tab value={70}/>
        <Tab value={75}/>
        <Tab value={80}/>
        <Tab value={85}/>
        <Tab value={90}/>
        <Tab value={95}/>
        <Tab value={100}/>
      </Tabs>
      <div  style={{position: 'absolute', bottom:'0px', height: '50%', 'background-color': 'black', width: '2px', left: '5%'}}> </div>
      <div  style={{position: 'absolute', bottom:'0px', height: '100%', 'background-color': 'black', width: '2px', left: '10%'}}> </div>
      <div  style={{position: 'absolute', bottom:'0px', height: '50%', 'background-color': 'black', width: '2px', left: '15%'}}> </div>
      <div  style={{position: 'absolute', bottom:'0px', height: '100%', 'background-color': 'black', width: '2px', left: '20%'}}> </div>
      <div  style={{position: 'absolute', bottom:'0px', height: '50%', 'background-color': 'black', width: '2px', left: '25%'}}> </div>
      <div  style={{position: 'absolute', bottom:'0px', height: '100%', 'background-color': 'black', width: '2px', left: '30%'}}> </div>
      <div  style={{position: 'absolute', bottom:'0px', height: '50%', 'background-color': 'black', width: '2px', left: '35%'}}> </div>
      <div  style={{position: 'absolute', bottom:'0px', height: '100%', 'background-color': 'black', width: '2px', left: '40%'}}> </div>
      <div  style={{position: 'absolute', bottom:'0px', height: '50%', 'background-color': 'black', width: '2px', left: '45%'}}> </div>
      <div  style={{position: 'absolute', bottom:'0px', height: '100%', 'background-color': 'black', width: '2px', left: '50%'}}> </div>
      <div  style={{position: 'absolute', bottom:'0px', height: '50%', 'background-color': 'black', width: '2px', left: '55%'}}> </div>
      <div  style={{position: 'absolute', bottom:'0px', height: '100%', 'background-color': 'black', width: '2px', left: '60%'}}> </div>
      <div  style={{position: 'absolute', bottom:'0px', height: '50%', 'background-color': 'black', width: '2px', left: '65%'}}> </div>
      <div  style={{position: 'absolute', bottom:'0px', height: '100%', 'background-color': 'black', width: '2px', left: '70%'}}> </div>
      <div  style={{position: 'absolute', bottom:'0px', height: '50%', 'background-color': 'black', width: '2px', left: '75%'}}> </div>
      <div  style={{position: 'absolute', bottom:'0px', height: '100%', 'background-color': 'black', width: '2px', left: '80%'}}> </div>
      <div  style={{position: 'absolute', bottom:'0px', height: '50%', 'background-color': 'black', width: '2px', left: '85%'}}> </div>
      <div  style={{position: 'absolute', bottom:'0px', height: '100%', 'background-color': 'black', width: '2px', left: '90%'}}> </div>
      <div  style={{position: 'absolute', bottom:'0px', height: '50%', 'background-color': 'black', width: '2px', left: '95%'}}> </div>
    </div>
    <span style={{padding : '5px'}}>{labelLeft}</span>
    <span style={{float : 'right', padding : '5px'}}>{labelRigth}</span>

  </div>
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

  test(){
    console.log("test");
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
    //seaScale
    else if(this.props.data.feedbackType == "sea")
    {

      component =  ( <Field name="seaSlider" component={seaSlider} label = {this.props.data.label} defaultValue={0.5} scale={this.props.data.scale} labels={this.props.data.labels}>
                      </Field>);
    }
    //nasaScale
    else if(this.props.data.feedbackType == "nasa")
    {
      component =  ( <Field name="nasaScale" component={nasaScale}
                        label = {this.props.data.label}
                        labelLeft = {this.props.data.labelLeft}
                        labelRigth = {this.props.data.labelRigth}>
                      </Field>);
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
