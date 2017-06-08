import { LOAD_STUDIES, START_STUDY, FINISH_STUDY, ABORT_STUDY, IMPORT_STUDY, DELETE_STUDY, TASK_DONE, ADD_STUDY, REMOVE_STUDY, GET_TASK, ATTACHEMENT_DONE, FEEDBACK_DONE, QUESTION_DONE } from '../constants/StudyActionTypes';
import * as localforage from "localforage";


const initialState = [];

export default function studies(state = initialState, action) {
  switch (action.type) {


    case FINISH_STUDY:
      return state.map(study =>
        (study.id === action.id ? {
          ...study, inProgress: false,done:true
        } :
        study)
      );

    case ABORT_STUDY:
      return state.map(study =>
        (study.id === action.id ? {
          ...study, inProgress: false
        } :
        study)
      );

    case IMPORT_STUDY:{
      let studies =  [ ...state,{
        ...action.data,
        id: (state.length === 0) ? 0 : state.length
      }];
      localforage.setItem('studies',studies).then(function(value) {
          console.log(value);
      }).catch(function(err) {
          // This code runs if there were any errors
          console.log(err);
      });
      return studies;
    }


    case LOAD_STUDIES:{
      return action.data ? action.data : [  ];
    }


    case DELETE_STUDY: {
      let studies = state.filter(study =>
        study.studyID !== action.id
      );
      localforage.setItem('studies',studies).then(function(value) {
          console.log(value);
      }).catch(function(err) {
          // This code runs if there were any errors
          console.log(err);
      });
      return studies;
    }



    default:
      return state;
  }
}
