import React, {Component} from 'react'
import {Indexroute} from 'react-router'
import * as localforage from "localforage"
import {routeActions} from 'react-router-redux'
import List from 'material-ui/List/List'
import ListItem from 'material-ui/List/ListItem'

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
    console.log("mounted")
    this.loadSavedStudies();
    this.state = {
        savedStudies: null,
        studiesLoaded: false
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
        if(key !== '_studies') {
          studies.push({
            'key': key,
            'title': value[0].studyName,
            'studies': value
          })
        }
        // studies.push({
        //   'title': value.studyName,
        //   'content': value
        // });
    }).then(function() {
        console.log('Iteration has completed');
        self.setState({
          savedStudies:studies,
          studiesLoaded: true
        });
        console.log(self.state.savedStudies);
    }).catch(function(err) {
        // This code runs if there were any errors
        console.log(err);
    });


  }

  handleListItemClick(item) {

      window.plugins.socialsharing.shareWithOptions({

      }, () => {}, () => {})

      console.log(item)
  }

  _renderResults(studies) {
    console.log("render results", "given studies", studies)
    return studies.map( res => {
        console.log(res)
        return (
          <ListItem primaryText={res.participantId}
                    key={res.participantId}
                    onTouchTap={() => {this.handleListItemClick(res)}}/>
        )
      })
  }

  _renderStudies() {
    // provide a fallback for the given studies
    return this.state.savedStudies.map( el => {
      return <ListItem primaryText={el.title}
              key={el.key}
              primaryTogglesNestedList={true}
              nestedItems={this._renderResults(el.studies)}/>
    })
  }

  render() {


    return (
      <List>
        {(this.state.studiesLoaded) ? this._renderStudies() : <ListItem primaryText="No elements loaded"/>}
      </List>
    );

    {/*<div>*/}
      {/*<section >*/}
        {/*<div>*/}
          {/*/!*<section>*/}
                {/*<RaisedButton label="display saved studies" onTouchTap={this.loadSavedStudies.bind(this)} style={styles.Button} secondary={true} />*/}
                {/*{this.state.savedStudies ? <pre>{JSON.stringify(this.state.savedStudies, null, 2)}</pre> : null}*/}
              {/*</section>*!/*/}
        {/*</div>*/}
      {/*</section>*/}
    {/*</div>*/}
  }
}
