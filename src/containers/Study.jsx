import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as StudyActions from '../actions/StudyActions'
import Task from '../components/Task.jsx'
import StudyEndScreen from '../components/StudyEndScreen.jsx'
import StudyStartScreen from '../components/StudyStartScreen.jsx'
import {push, routeActions} from 'react-router-redux'
import * as localforage from "localforage"


export class Study extends Component {

  componentWillMount(){
    console.log("study will mount")
    console.log("will mount");
    const self=this;
    localforage.getItem('_studies').then(function(value) {
        // This code runs once the value has been loaded
        // from the offline store.
        self.props.studyActions.loadStudies(value);
        if(!self.props.activeStudy)
          self.props.studyActions.startStudy(self.props.studies[self.props.params.StudyID], Date.now());
    }).catch(function(err) {
        // This code runs if there were any errors
        console.log(err);
    });

  }


  nextTask(id,time){
    if(this.props.activeStudy.tasks.length-1>this.props.currentTask){//we still have tasks to get
      console.log("next task");
      this.props.studyActions.getTask(id,time);
    }else{//we are at last task
      console.log("finish study");
      this.props.studyActions.showEndScreen(this.props.activeStudy,time);
    }
  }

  getTask(id,time){
    //this.props.routeActions.push(this.props.location.pathname+`task/${id}/item/0`);
    console.log("get task: "+ id);
    this.props.studyActions.getTask(id,time);
  }

  saveTask(id,time){
      console.log("save task");
      this.props.studyActions.saveTask(id,time);
  }

  render() {
    const { todos, todoActions } = this.props;

    if(!this.props.activeStudy)
      return null;

    let taskData = (this.props.activeStudy && this.props.activeStudy.tasks) ? this.props.activeStudy.tasks[this.props.currentTask] : null;


    let content;
    if(this.props.activeStudy && this.props.currentTask == -1)
      content = <StudyStartScreen start={this.getTask.bind(this)} study={this.props.activeStudy}/>;
    else if(this.props.activeStudy && this.props.currentTask == "end")
      content = <StudyEndScreen/>;
    else if(this.props.activeStudy && this.props.currentTask != null)
      content = <Task taskID={this.props.currentTask} taskData={taskData.data} currentSubItem={0}  next={this.nextTask.bind(this)} save={this.saveTask.bind(this)}/>;

    return (
      <div>
        <section >
          <div>

              <section>
                <h2>Studie: {this.props.activeStudy.studyName}</h2>
                {this.props.children}
                {content }

              </section>
          </div>
        </section>
      </div>
    );
  }
}

export default connect(state => ({ studies: state.studies,activeStudy:state.activeStudy,currentTask:state.currentTask }), dispatch => ({
  studyActions: bindActionCreators(StudyActions, dispatch),
    routeActions: bindActionCreators({  push: push }, dispatch)
}))(Study);
