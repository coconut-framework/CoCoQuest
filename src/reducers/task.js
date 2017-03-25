import { START_STUDY, FINISH_STUDY, ABORT_STUDY, IMPORT_STUDY, DELETE_STUDY, NEXT_TASK, PREV_TASK,GET_TASK, SHOW_END_SCREEN } from '../constants/StudyActionTypes';
import studyData from 'json!../data/data.json';


const initialState = null;

export default function task(state = initialState, action) {
  switch (action.type) {
    case START_STUDY:
      return -1;

    case GET_TASK:
      return action.taskID;

    case SHOW_END_SCREEN:
      return "end";


    default:
      return state;
    }
}
