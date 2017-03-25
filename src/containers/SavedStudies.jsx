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
  Button:{
    marginTop:'10px'
  },
  li:{
    listStyle:'none'
  }

};


export default class SavedStudies extends Component {

    constructor(props, context) {
      super(props, context);
      this.state = {
          savedStudies:null
        }
    }

  loadSavedStudies(){
    console.log("loading saved data");
    // The same code, but using ES6 Promises.
    let studies=[];
    var self=this;
    localforage.iterate(function(value, key, iterationNumber) {
        // Resulting key/value pair -- this callback
        // will be executed for every item in the
        // database.
        console.log([key, value]);
        studies.push(value);
    }).then(function() {
        console.log('Iteration has completed');
        self.setState({savedStudies:studies});
        console.log(self.state.savedStudies);
    }).catch(function(err) {
        // This code runs if there were any errors
        console.log(err);
    });


  }

  render() {


    return (
      <div>
        <section >
          <div>

              <section>
                <RaisedButton label="display saved studies" onTouchTap={this.loadSavedStudies.bind(this)} style={styles.Button} secondary={true} />
                {this.state.savedStudies ? <pre>{JSON.stringify(this.state.savedStudies, null, 2)}</pre> : null}
              </section>
          </div>
        </section>
      </div>
    );
  }
}
