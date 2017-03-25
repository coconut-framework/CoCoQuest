import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import RaisedButton from 'material-ui/RaisedButton';
import { push,routeActions } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as StudyActions from '../actions/StudyActions';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';


const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    style={{  width: '100%' }}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)


class StudyStartScreen extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      dialogOpen:false
    };

    this.startStudy = this.startStudy.bind(this);
  }

  handleOpen = (i) => {
    this.setState({dialogOpen: true,study:i});
  };

  handleClose = () => {
    this.setState({dialogOpen: false});
  };

  startStudy(){
    this.props.start(0,Date.now() )
    this.props.studyActions.setParticipantNumber(this.state.participantNumber, this.props.activeStudy);
  }


  submitMyForm(data) {
    const { onSubmit, reset } = this.props;
    reset();
    var self = this;

    window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function(fileSystem) {
     console.log("Root = " + cordova.file.externalRootDirectory);
     fileSystem.getDirectory("CoCoQuest", {create: true, exclusive: false},

     function(dirEntry) {
       dirEntry.getDirectory(self.props.activeStudy.studyID, {create: true, exclusive: false},

       function(dirEntry) {
         dirEntry.getDirectory(data.freetext, {create: false, exclusive: false},

         function(dirEntry) {
           console.log("Diese Teilnehmernummer wurde bereits verwendet")
           self.setState({dialogOpen: true,participantNumber:data.freetext});
         }, function(error) {
           self.props.start(0,Date.now() )
           self.props.studyActions.setParticipantNumber(data.freetext, self.props.activeStudy);
         })
       }, onError)
     }, onError)
    }, onError);
    function onError(e) {
          alert("onError");
    };


    //
      // do other success stuff

  }

  render() {
    const actions = [
      <FlatButton
        label="Nein"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Ja"
        primary={true}
        onTouchTap={this.startStudy.bind(this)}
      />,
    ];

    const { onSubmit, handleSubmit, pristine } = this.props;
    return (
      <div>
        <section >
          <div>
              <section>
                <h3>Diese Studie hat {this.props.study.tasks.length} Aufgaben</h3>

                <pre>{this.props.study.description}</pre><br/>
                <form onSubmit={handleSubmit(this.submitMyForm.bind(this))}>
                  <Field name="freetext" component={renderTextField} label="Teilnehmernummer"  />
                  <RaisedButton  type="submit" label="Mit der Studie beginnen" fullWidth={true} disabled={pristine}   />
                </form>

              </section>
          </div>
        </section>
        <Dialog
             title="Sicher?"
             actions={actions}
             modal={false}
             open={this.state.dialogOpen}
             onRequestClose={this.handleClose}
           >
             Für diese Teilnehmernummer existieren bereits daten. Sind sie sich sicher?)
           </Dialog>
      </div>
    );
  }
}

StudyStartScreen = reduxForm({
  form: 'participantnumber', // a unique name for this form,
  enableReinitialize:true
})(StudyStartScreen);


export default connect(state => ({ studies: state.studies,activeStudy:state.activeStudy,currentTask:state.currentTask }), dispatch => ({
  studyActions: bindActionCreators(StudyActions, dispatch),
    routeActions: bindActionCreators({  push: push }, dispatch)
}))(StudyStartScreen);
