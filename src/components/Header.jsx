import React, { PropTypes, Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as StudyActions from '../actions/StudyActions';
import { push,routeActions } from 'react-router-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import InfoIcon from 'material-ui/svg-icons/action/info-outline'

 class Header extends Component {

  constructor(props) {
    super(props);

    this.goRoot =  this.goRoot.bind(this);

    this.appName = "ESM APP";

    this.state = {
      open: false,
      dialogOpen:false,
      helpOpen: false,
      title: this.appName
    };
  }

  handleOpen = () => {
    if(this.state.helpOpen){
      this.setState({
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
      title: this.appName
    });
    this.props.routeActions.push("/");
  }


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
          iconElementLeft={<IconButton><NavigationArrowBack /></IconButton>} iconStyleLeft={(this.props.activeStudy || this.state.helpOpen) ? { } :  {display:'none'}  } onLeftIconButtonTouchTap={this.handleOpen }
         iconElementRight={<IconButton><InfoIcon/></IconButton>} iconStyleRight={(this.props.activeStudy === null) ? { } :  {display:'none'}  } onRightIconButtonTouchTap={this.openHelpPage}
       />
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
