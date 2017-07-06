import * as types from '../constants/StudyActionTypes';
import * as localforage from "localforage";

export function startStudy(study, time) {
  return {
    type: types.START_STUDY,
    study,
    time
  };
}

export function abortStudy() {
  return {
    type: types.ABORT_STUDY
  };
}

export function finishStudy(study) {
  localforage.setItem('study'+study.studyID+Date.now(), study).then(function(value) {
      console.log(value);
  }).catch(function(err) {
      // This code runs if there were any errors
      console.log(err);
  });

  window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function(fileSystem) {
   console.log("Root = " + cordova.file.externalRootDirectory);
   fileSystem.getDirectory("CoCoQuest", {create: true, exclusive: false},

   function(dirEntry) {
     dirEntry.getDirectory(study.studyID, {create: true, exclusive: false},

     function(dirEntry) {
       dirEntry.getDirectory(study.participantId, {create: true, exclusive: false},

       function(dirEntry) {
         dirEntry.getFile("study.json", {create: true, exclusive: false},

         function(fileEntry) {
            fileEntry.createWriter(gotFileWriter, onError);

            function gotFileWriter(writer) {
                writer.onwriteend = function(evt) {
                    console.log("contents of file now 'some sample text'");
                };
                writer.write(JSON.stringify(study, null, 2));
            }
         }, onError)
       }, onError)
     }, onError)
   }, onError)
  }, onError);

  function onError(e) {
        alert("onError");
  };

  return {
    type: types.FINISH_STUDY,
    study
  };
}


export function importStudy(data) {
  return {
    type: types.IMPORT_STUDY,
    data
  };
}

export function loadStudies(data) {
  return {
    type: types.LOAD_STUDIES,
    data
  };
}

export function deleteStudy(id) {
  return {
    type: types.DELETE_STUDY,
    id
  };
}

export function setParticipantNumber(number,study) {
  window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function(fileSystem) {
   console.log("Root = " + cordova.file.externalRootDirectory);
   fileSystem.getDirectory("CoCoQuest", {create: true, exclusive: false},

   function(dirEntry) {
     dirEntry.getDirectory(study.studyID, {create: true, exclusive: false},

     function(dirEntry) {
       dirEntry.getDirectory(number, {create: true, exclusive: false},

         function(dirEntry) {
             console.log(dirEntry)
         }, onError)
     }, onError);
   }, onError);
  }, onError);

  function onError(e) {
        alert("onError");
  };

  return {
    type: types.PARTICIPANT_NUMBER_ADDED,
    number
  };
}


export function showEndScreen(study,time) {
  console.log("show end screen");

  return {
    type: types.SHOW_END_SCREEN,
    study,
    time
  };
}

export function getTask(taskID,time) {
  return {
    type: types.GET_TASK,
    taskID,
    time
  };
}

export function saveTask(taskID,time) {
  return {
    type: types.SAVE_TASK,
    taskID,
    time
  };
}



export function subitemDone(studyID,taskID,subitemID,time,values) {
  return {
    type: types.SUBITEM_DONE,
    studyID,
    taskID,
    subitemID,
    time,
    values
  };
}
