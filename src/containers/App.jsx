import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import DevTools from './DevTools.jsx';
import AppRoute from '../containers/AppRoute.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../components/Header.jsx';

const store = configureStore();
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  componentWillMount(){

    document.addEventListener("backbutton", onBackKeyDown, false);

    function onBackKeyDown(e) {
      e.preventDefault();
    }
  }



  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider>
          <div>

              <Header />

              <AppRoute store={store}/>

            {__DEVTOOLS__ && <DevTools />}
          </div>
      </MuiThemeProvider>

      </Provider>
    );
  }
}
