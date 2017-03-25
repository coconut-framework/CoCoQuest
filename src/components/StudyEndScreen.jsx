import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';

import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as StudyActions from '../actions/StudyActions';
import { push,routeActions } from 'react-router-redux';
import RaisedButton from 'material-ui/RaisedButton';


export class StudyEndScreen extends Component {

  finishStudy(){
    this.props.studyActions.finishStudy(this.props.activeStudy)
    this.props.routeActions.push('/');
  }


  render() {
    return (
      <div>
        <section >
          <div>
              <section>
                Sie haben die Studie erfolgreich abgeschlossen
                <RaisedButton label="Zurück zur Studienübersicht" fullWidth={true} onTouchTap={this.finishStudy.bind(this)}  />
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
}))(StudyEndScreen);
