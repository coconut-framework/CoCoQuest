import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as StudyActions from '../actions/StudyActions';

import RaisedButton from 'material-ui/RaisedButton';


export class StudyNavigation extends Component {

  constructor(props, context) {
    super(props, context);

  }



 saveTask(){
   this.props.save(this.props.currentTask,Date.now() );
   this.props.next(this.props.currentTask+1,Date.now() )
   this.setState({
     taskDone: true
   });
 }

  render() {
    return (
      <footer>
        <RaisedButton label="Aufgabe speichern" fullWidth={true} onTouchTap={() => this.saveTask()}  />
      </footer>
      );
  }
}

export default connect(state => ({ studies: state.studies,activeStudy:state.activeStudy,currentTask:state.currentTask }), dispatch => ({
  studyActions: bindActionCreators(StudyActions, dispatch)
}))(StudyNavigation);
