import React, { Component, PropTypes } from 'react';
import { Router, Route, hashHistory, Indexroute, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators,createStore,combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import Study from './Study.jsx';
import StudyList from './StudyList.jsx';
import SavedStudies from './SavedStudies.jsx';
import Help from './Help.jsx';
import Task from '../components/Task.jsx';
import Feedback from '../components/Feedback.jsx';
import Attachement from '../components/Attachement.jsx';
import StudyStartScreen from '../components/StudyStartScreen.jsx';
import StudyEndScreen from '../components/StudyEndScreen.jsx';
import studies from '../reducers/studies';
import activeStudy from '../reducers/activeStudy';
import task from '../reducers/task';
import * as StudyActions from '../actions/StudyActions';
import configureStore from '../store/configureStore';
import Header from '../components/Header.jsx';



var store=null;
var history=null;
var routes = null;


class AppRoute extends Component {
  static propTypes = {
    stores: PropTypes.object,
    actions: PropTypes.object
  };
  constructor(props, context) {
    super(props, context);
    // Add the reducer to your store on the `routing` key
    store = this.props.store;

    // Create an enhanced history that syncs navigation events with the store
    history = syncHistoryWithStore(hashHistory, store);

    routes = (<Router history={history}>
        <Route path="/" component={StudyList}/>
        <Route path="/study/:StudyID/" component={Study}/>
        <Route path="/saved" component={SavedStudies}/>
        <Route path="/help" component={Help}/>
      </Router>
    );
  }






  render() {
    return (
      routes
    );
  }
}
export default connect(state => ({ stores: state }), dispatch => ({
  studyActions: bindActionCreators(StudyActions, dispatch)
}))(AppRoute);
