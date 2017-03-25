import { PARTICIPANT_NUMBER_ADDED ,START_STUDY, FINISH_STUDY, ABORT_STUDY, NEXT_TASK, PREV_TASK, TASK_DONE, FEEDBACK_DONE, ATTACHEMENT_DONE, QUESTION_DONE,GET_TASK,SAVE_TASK,SUBITEM_DONE, SHOW_END_SCREEN } from '../constants/StudyActionTypes';
import studyData from 'json!../data/data.json';


const initialState = null;

export default function activeStudy(state = initialState, action) {
  switch (action.type) {
    case START_STUDY:{
      return {...action.study,startTime: action.time };
    }
    case SHOW_END_SCREEN:{
      return {...action.study,endTime: action.time,tasks:tasks(state.tasks,action) };
    }
    case FINISH_STUDY:{
      return null;
    }

    case ABORT_STUDY:{
      return null;
    }

    case SUBITEM_DONE:{
      console.log(action)
      return {...state,tasks:tasks(state.tasks,action)};
    }

    case PARTICIPANT_NUMBER_ADDED:
        return {...state,participantId:action.number};




    case GET_TASK:
        return {...state,tasks:tasks(state.tasks,action)};

    case SAVE_TASK:
        return {...state,tasks:tasks(state.tasks,action)};
    default:
      return state;
  }
}


function tasks(state = initialState, action) {
  switch (action.type) {
    case START_STUDY:
      return state;

    case SUBITEM_DONE:
        return [
          ...state.slice(0, action.taskID),
          {...state[action.taskID],data:subitems(state[action.taskID].data,action)},
          ...state.slice(action.taskID + 1)
        ];

    case GET_TASK:{
      if(state[action.taskID-1]){
        return [
          ...state.slice(0, action.taskID-1),
          {...state[action.taskID-1],endTime:action.time},
          {...state[action.taskID],startTime:action.time},
          ...state.slice(action.taskID + 1)
        ];
      }
      else{
        return [
          ...state.slice(0, action.taskID),
          {...state[action.taskID],startTime:action.time},
          ...state.slice(action.taskID + 1)
        ];
      }
    }
    case SAVE_TASK:
        return [
          ...state.slice(0, action.taskID),
          {...state[action.taskID],endTime:action.time},
          ...state.slice(action.taskID + 1)
        ];

    default:
      return state;
    }
}

function subitems(state = initialState, action) {
  switch (action.type) {

    case SUBITEM_DONE:{
      if(action.values && action.values.constructor === Array){
        var arrayLength = 0;
        let answer = [];
        action.values ? arrayLength = state[action.subitemID].options.length : null;
        for (var i = 0; i < arrayLength; i++) {
            console.log("item: "+ i + " value: " + action.values[i]);
            //Do something
            if(action.values[i] === undefined || action.values[i] === null )
              answer.push(false);
            else {
              answer.push(action.values[i]);
            }
        }

        return [
          ...state.slice(0, action.subitemID),
          {...state[action.subitemID],endtime:action.time, answer:answer},
          ...state.slice(action.subitemID + 1)
        ];
      }

      return [
        ...state.slice(0, action.subitemID),
        {...state[action.subitemID],endtime:action.time, answer:action.values},
        ...state.slice(action.subitemID + 1)
      ];
    }


    default:
      return state;
    }
}
