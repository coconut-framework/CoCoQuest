import React, { PropTypes, Component } from 'react';

import { bindActionCreators } from 'redux';
import * as StudyActions from '../actions/StudyActions';

import StudyNavigation from './StudyNavigation.jsx'
import Feedback from './Feedback.jsx'
import { connect } from 'react-redux';

import Attachement from './Attachement.jsx'
import {reset} from 'redux-form';


export class Task extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
        currentSubItem: 0,
        taskDone:false,
        startTime: Date.now()
      }
  }

  componentWillReceiveProps(nextProps){
    if(this.props.taskID != nextProps.taskID)//reset sub
      this.setState({
        currentSubItem:0
      });
  }

  subitemDone(values){
    //console.log("feeedback done: " + time);
    console.log("sub item done");

    let time = Date.now();
    console.log(values);
      this.props.studyActions.subitemDone(this.props.activeStudy,this.props.currentTask,this.state.currentSubItem,  time,values);
      this.setState({
        currentSubItem:this.state.currentSubItem+1
      });
  }




  render() {
    let content=null;

    let currentItem = this.props.taskData[this.state.currentSubItem];

    if(!currentItem){
      return <StudyNavigation save={this.props.save} next={this.props.next} />;
    }

    if((currentItem.type === "question" || currentItem.type === "feedback" ) && !currentItem.endTime)
      content = <Feedback onSubmit={this.subitemDone.bind(this)} id={this.props.currentTask+1} data={currentItem} />;
    else if(currentItem.type === "attachement" && !currentItem.endTime)
      content = <Attachement  onSubmit={this.subitemDone.bind(this)} id={this.props.currentTask+1} activeStudy={this.props.activeStudy} data={currentItem} />;

      return (
        <div>
            {content}
        </div>

      );



  }
}

export default connect(state => ({ studies: state.studies,activeStudy:state.activeStudy,currentTask:state.currentTask }), dispatch => ({
  studyActions: bindActionCreators(StudyActions, dispatch)
}))(Task);
