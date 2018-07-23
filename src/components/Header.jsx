import React, {Component} from 'react'
import AppBar from 'material-ui/AppBar'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as StudyActions from '../actions/StudyActions'
import {push, routeActions} from 'react-router-redux'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import InfoIcon from 'material-ui/svg-icons/action/info-outline'
import ArchiveIcon from 'material-ui/svg-icons/content/archive'
import {white} from 'material-ui/styles/colors'

class Header extends Component {

  constructor(props) {
    super(props);

    this.goRoot =  this.goRoot.bind(this);

    this.appName = "ESM APP";

    this.state = {
      open: false,
      dialogOpen:false,
      helpOpen: false,
      savedOpen: false,
      title: this.appName
    };
  }

  handleOpen = () => {
    if(this.state.helpOpen || this.state.savedOpen){
      this.setState({
        savedOpen: false,
        helpOpen: false,
        title: this.appName
      })
      this.props.routeActions.push('/')
    } else {
      this.setState({dialogOpen: true});
    }
  };

  handleClose = () => {
    this.setState({dialogOpen: false});
  };

  openSavedStudies= () => {
    console.log("open saved")
    this.props.routeActions.push('/saved');
    this.setState({
      savedOpen: true,
      title: "Saved"
    })
  }

  openHelpPage = () => {
    this.props.routeActions.push('/help');
    this.setState({
      helpOpen: true,
      title: "Help"
    })
  };


  goRoot(){
    this.props.studyActions.abortStudy();
    this.setState({
      open: false,
      dialogOpen:false,
      helpOpen: false,
      savedOpen: false,
      title: this.appName
    });
    this.props.routeActions.push("/");
  }

   rightMenu = (
     <div>
       <IconButton onTouchTap={this.openSavedStudies}>
         <ArchiveIcon color={white}/>
       </IconButton>
       <IconButton onTouchTap={this.openHelpPage}>
         <InfoIcon color={white}/>
       </IconButton>
     </div>
   );

  render() {
    const actions = [
      <FlatButton
        label="Nein"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Ja"
        primary={true}
        onTouchTap={this.goRoot}
      />,
    ];

    return (
      <div>
       <AppBar
         title={this.state.title}
          iconElementLeft={<IconButton><NavigationArrowBack /></IconButton>} iconStyleLeft={(this.props.activeStudy || this.state.helpOpen || this.state.savedOpen) ? { } :  {display:'none'}  } onLeftIconButtonTouchTap={this.handleOpen }
         iconElementRight={this.rightMenu} iconStyleRight={(this.props.activeStudy === null) ? { } :  {display:'none'}  }
       >
       </AppBar>
       <Dialog
            title="Abbruch?"
            actions={actions}
            modal={false}
            open={this.state.dialogOpen}
            onRequestClose={this.handleClose}
          >
            Wollen Sie die Studie wirklich abbrechen?
          </Dialog>
      </div>

    );
  }
}

export default connect(state => ({ studies: state.studies,history:state.history,activeStudy:state.activeStudy }), dispatch => ({
  studyActions: bindActionCreators(StudyActions, dispatch),
  routeActions: bindActionCreators({  push: push }, dispatch)
}))(Header);
