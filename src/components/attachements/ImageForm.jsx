import React, { PropTypes, Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Dropzone from 'react-dropzone';
import RaisedButton from 'material-ui/RaisedButton';

const FILE_FIELD_NAME = 'image';

const renderDropzoneInput = (field) => {
  const files = field.input.value;
  return (
    <div>
      <Dropzone
        name={field.name}
        onDrop={( filesToUpload, e ) => field.input.onChange(filesToUpload)}
      >
        <div>Try dropping some files here, or click to select files to upload.</div>
      </Dropzone>
      {field.meta.touched &&
        field.meta.error &&
        <span className="error">{field.meta.error}</span>}
      {files && Array.isArray(files) && (
        <ul>
          { files.map((file, i) => <li key={i}>{file.name}</li>) }
        </ul>
      )}
    </div>
  );
}
class ImageForm extends Component {

  takePicture(){
    const self = this;
    const filename = makeid()+".jpg";
    navigator.camera.getPicture(onSuccess, onFail, { quality: 25,
      destinationType: Camera.DestinationType.FILE_URI
    });

    function onSuccess(oImageURI) {
        window.resolveLocalFileSystemURI(oImageURI, handlePicSave, onFail);
        self.props.onSubmit(filename)
    }

    function handlePicSave (oEntry) {
      window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function(fileSystem) {
       console.log("Root = " + cordova.file.externalRootDirectory);
       fileSystem.getDirectory("CoCoQuest", {create: true, exclusive: false},

       function(dirEntry) {
         dirEntry.getDirectory(self.props.activeStudy.studyID, {create: true, exclusive: false},

         function(dirEntry) {
           dirEntry.getDirectory(self.props.activeStudy.participantId, {create: true, exclusive: false},

           function(dirEntry) {
             oEntry.moveTo(dirEntry, filename, Success, onFail)
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
        <RaisedButton type="submit" label="take picture" secondary={true} onTouchTap={this.takePicture.bind(this)} />
      </div>

    );
  }
}

// Decorate the form component
ImageForm = reduxForm({
  form: 'ImageForm' // a unique name for this form
})(ImageForm);

export default ImageForm;
