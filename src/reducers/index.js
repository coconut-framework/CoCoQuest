import { combineReducers } from 'redux';
import studies from './studies';
import activeStudy from './activeStudy';
import task from './task';
import { reducer as formReducer } from 'redux-form';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import {FEEDBACK_DONE,SUBITEM_DONE} from '../constants/StudyActionTypes';


export default combineReducers({
    activeStudy ,
    studies,
    currentTask:task,
    form: formReducer.plugin({
      feedback: (state, action) => { // <------ 'account' is name of form given to reduxForm()
        switch(action.type) {
          case SUBITEM_DONE:{
            console.log("we should clear form")
            return undefined;      // <--- blow away form data

          }
          default:
            return state;
        }
      }
    }),
    routing: routerReducer
});
