import React, { PropTypes, Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Dropzone from 'react-dropzone';
import RaisedButton from 'material-ui/RaisedButton';

class VideoForm extends Component {

  takePicture(){
    const self = this;
    const filename = makeid()+".mp4";

    function captureSuccess(file) {
        window.resolveLocalFileSystemURL(file[0].localURL, handleAudioSave, onFail);
        self.props.onSubmit(filename)

    };

    // start audio capture
    navigator.device.capture.captureVideo(captureSuccess, onError);


    function handleAudioSave (oEntry) {
      console.log("save video")
      window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function(fileSystem) {
       console.log("Root = " + cordova.file.externalRootDirectory);
       fileSystem.getDirectory("CoCoQuest", {create: true, exclusive: false},

         function(dirEntry) {
           dirEntry.getDirectory("saved", {create: true, exclusive: false},
             function (dirEntry) {
               dirEntry.getDirectory(self.props.activeStudy.studyID, {create: true, exclusive: false},
                 function (dirEntry) {
                   dirEntry.getDirectory(self.props.activeStudy.participantId, {create: true, exclusive:true},
                     function (dirEntry) {
                       oEntry.moveTo(dirEntry, filename, Success, onFail)
                     }, () => {
                       if(self.props.activeStudy.forced) {
                         dirEntry.getDirectory(self.props.activeStudy.participantId, {create: true, exclusive:false},
                           function(dirEntry) {
                             oEntry.moveTo(dirEntry, filename, Success, onFail)
                           }, onError)
                       } else {
                         onError()
                       }
                     })
                 }, onError)
             }, onError)
         }, onError)
       }, onError);


    }

    function makeid() {
			var text = "";
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

			for (var i=0; i < 5; i++) {
				text += possible.charAt(Math.floor(Math.random() * possible.length));
			}
			return text;
		}

    function onFail(message) {
        alert('Failed because: ' + message);
    }

    function onError(e) {
      console.log(e)
      alert("onError");
    };

    function Success(message) {
        console.log("sucess00")
    }
  }

  render() {
    const { handleSubmit, pristine } = this.props;

    return (
      <div>
        <pre>{this.props.data.description}</pre><br/>
        <RaisedButton type="submit" label="capture Video" secondary={true} onTouchTap={this.takePicture.bind(this)} />
      </div>

    );
  }
}

// Decorate the form component
VideoForm = reduxForm({
  form: 'VideoForm' // a unique name for this form
})(VideoForm);

export default VideoForm;
