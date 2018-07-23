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

  localforage.getItem(study.studyID)
    .then((item) => {
      console.log("study items", item)
      if ( item === null ) {
        localforage.setItem(study.studyID, [study])
          .catch((err) => {
            console.log(err)
          })
      }
      item.push(study)
      localforage.setItem(study.studyID, item)
        .catch((err) => {
          console.log(err)
          alert(`Could not add study data`)
        })
    })
    .catch((err) => {
      console.log('Study does not exist in localforage ... creating', study)
      localforage.setItem(study.studyID, [study])
        .catch((err) => {
          console.log(err)
        })
    })



  window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function(fileSystem) {
   console.log("Root = " + cordova.file.externalRootDirectory);
   fileSystem.getDirectory("CoCoQuest", {create: true, exclusive: false},

     function(dirEntry) {
       dirEntry.getDirectory("saved", {create: true, exclusive: false},
         function (dirEntry) {
           dirEntry.getDirectory(study.studyID, {create: true, exclusive: false},
             function (dirEntry) {
               dirEntry.getDirectory(study.participantId, {create: true, exclusive:false},
                 function (dirEntry) {
                   dirEntry.getFile(`${study.participantId}.json`, {create: true, exclusive: false},

                     function (fileEntry) {
                       console.log("creating file")
                       fileEntry.createWriter(gotFileWriter, onError);

                       function gotFileWriter(writer) {
                         writer.onwriteend = function (evt) {
                           console.log("contents of file now 'some sample text'");
                         };
                         writer.write(JSON.stringify(study, null, 2));
                       }
                     }, (e) => { onError(e, "create file error")})
                 }, (e) => { onError(e, `error in participantID (${study.participantId}) dir`)})
             }, (e) => { onError(e, `error in studyID (${study.studyID}) dir`)})
         }, (e) => { onError(e, "error in saved dir.")})
     }, (e) => { onError(e, "error in 'CoCoQuest dir.")})
   }, (e) => { onError(e, "filesystem error")});

  function onError(e, msg) {
    console.log(msg, e)
    alert("onError");
  }

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

export function deleteStudy(item) {
  return {
    type: types.DELETE_STUDY,
    item
  };
}

export function setParticipantNumber(number,study) {
  window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function(fileSystem) {
   console.log("Root = " + cordova.file.externalRootDirectory);
   console.log("externalDataDir = " + cordova.file.externalDataDirectory);
   fileSystem.getDirectory("CoCoQuest", {create: true, exclusive: false},

   function(dirEntry) {
     dirEntry.getDirectory(study.studyID, {create: true, exclusive: false},

       //when creating a new dir for a participant number, make this creation exclusive to treat as ID
     function(dirEntry) {
       dirEntry.getDirectory(number, {create: true, exclusive: true},

         function(dirEntry) {
             console.log(dirEntry)
         }, onError)
     }, onError);
   }, onError);
  }, onError);

  function onError(e) {
    console.log(e)
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
