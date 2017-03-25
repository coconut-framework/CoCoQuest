import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as StudyActions from '../actions/StudyActions';
import Header from '../components/Header.jsx';
import studyData from 'json!../data/data.json';
import { Link, Indexroute } from 'react-router';
import * as localforage from "localforage";
import { push,routeActions } from 'react-router-redux';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';


const styles = {
  fab:{
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
    zIndex: 9999999999
  },
  studyButton:{
    marginBottom:'10px'
  },
  li:{
    listStyle:'none'
  }

};


export class StudyList extends Component {


  constructor(props, context) {
    super(props, context);

    this.state = {
      dialogOpen:false
    };
  }

  componentWillMount(){
    console.log("will mount");
    const self=this;
    localforage.getItem('studies').then(function(value) {
        // This code runs once the value has been loaded
        // from the offline store.
        self.props.studyActions.loadStudies(value);
    }).catch(function(err) {
        // This code runs if there were any errors
        console.log(err);
    });



  }

  componentDidMount() {
    var fileUploadDom = ReactDOM.findDOMNode(this.refs.fileUpload);
    var self=this;
    fileUploadDom.addEventListener("change", function() {
        console.log(this.files)

        // grab the first image in the FileList object and pass it to the function
        self.loadStudy(this.files[0])
    });
  }

  startStudy(studyID){
    console.log("start study: " + studyID);
    console.log(this.props.studies[studyID]);
    this.props.routeActions.push(`study/${studyID}/`);
    this.props.studyActions.startStudy(this.props.studies[studyID], Date.now());


  }



  // render the image in our view
loadStudy(file) {
  var self=this;
  // generate a new FileReader object
  var reader = new FileReader();

  // inject an image with the src url
  reader.onload = function(event) {
    console.log(event.target.result);
    self.props.studyActions.importStudy(JSON.parse(event.target.result));

  }

  // when the file is read it triggers the onload event above.
  reader.readAsText(file);

}

  addStudy(studyData){
    console.log("add study: ");
    var self=this;
    var fileUploadDom = ReactDOM.findDOMNode(this.refs.fileUpload);
    fileUploadDom.click();
  }

  handleOpen = (i) => {
    this.setState({dialogOpen: true,study:i});
  };

  handleClose = () => {
    this.setState({dialogOpen: false});
  };

  deleteStudy(){
    this.handleClose();
    this.props.studyActions.deleteStudy(this.props.studies[this.state.study].studyID, Date.now());


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
        onTouchTap={this.deleteStudy.bind(this)}
      />,
    ];

    const { todos, todoActions } = this.props;

    var nav = this.props.studies && this.props.studies.map((study, i) =>
                <li key={i} style={styles.li}><RaisedButton label={`Studie ${study.studyName} auswählen!`} onTouchTap={this.startStudy.bind(this,i)} style={styles.studyButton} primary={true} /><RaisedButton label={`Studie löschen!`} onTouchTap={() => this.handleOpen(i)} style={styles.studyButton} secondary={true} /></li>
              );

    return (
      <div>
        <section >
          <div>

              <section>
                <ul>
                  {nav}
                </ul>
                  <FloatingActionButton onTouchTap={this.addStudy.bind(this,0)} style={styles.fab}>
                    <ContentAdd />
                    <input id="myInput"  ref="fileUpload" type="file" style="visibility:hidden" />
                  </FloatingActionButton>
              </section>
          </div>
        </section>
        <Dialog
             title="Löschen?"
             actions={actions}
             modal={false}
             open={this.state.dialogOpen}
             onRequestClose={this.handleClose}
           >
             Wollen Sie die Studie wirklich löschen?
           </Dialog>
      </div>
    );
  }
}

export default connect(state => ({ studies: state.studies,history:state.history }), dispatch => ({
  studyActions: bindActionCreators(StudyActions, dispatch),
  routeActions: bindActionCreators({  push: push }, dispatch)
}))(StudyList);
