import React, { PropTypes, Component } from 'react';
import StudyNavigation from './StudyNavigation.jsx'
import { Field, reduxForm } from 'redux-form';
import AudioForm from './attachements/AudioForm.jsx';
import ImageForm from './attachements/ImageForm.jsx';
import VideoForm from './attachements/VideoForm.jsx';

class Attachement extends Component {

  render() {
    const { onSubmit } = this.props;
    let form;
    if(this.props.data.attachmentType == 'image')
      form = <ImageForm  onSubmit={onSubmit} activeStudy={this.props.activeStudy} id={this.props.id} data={this.props.data} />;
    else if(this.props.data.attachmentType == 'audio'){
      form = <AudioForm  onSubmit={onSubmit} activeStudy={this.props.activeStudy} id={this.props.id} data={this.props.data} />;
    }
    else if(this.props.data.attachmentType == 'video'){
      form = <VideoForm  onSubmit={onSubmit} activeStudy={this.props.activeStudy} id={this.props.id} data={this.props.data} />;
    }


    return (
      <div>
          <h1>Attachement:</h1>
          {form}
      </div>

    );
  }
}


// Decorate the form component
Attachement = reduxForm({
  form: 'attachement' // a unique name for this form
})(Attachement);

export default Attachement;
