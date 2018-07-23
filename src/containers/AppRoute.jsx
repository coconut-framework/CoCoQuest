import React, {Component, PropTypes} from 'react'
import {hashHistory, Indexroute, Route, Router} from 'react-router'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {syncHistoryWithStore} from 'react-router-redux'

import Study from './Study.jsx'
import StudyList from './StudyList.jsx'
import SavedStudies from './SavedStudies.jsx'
import Help from './Help.jsx'
import * as StudyActions from '../actions/StudyActions'


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
