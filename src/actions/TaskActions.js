import * as types from '../constants/StudyActionTypes';

export function startStudy(id) {
  return {
    type: types.ADD_TODO,
    text
  };
}

export function finishStudy(id) {
  return {
    type: types.DELETE_TODO,
    id
  };
}

export function abortStudy(id) {
  return {
    type: types.EDIT_TODO,
    id,
    text
  };

  export function importStudy(data) {
    return {
      type: types.EDIT_TODO,
      id,
      text
    };

    export function deleteStudy(id) {
      return {
        type: types.EDIT_TODO,
        id,
        text
      };
}
