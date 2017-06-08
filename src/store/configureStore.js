import { createStore, compose,combineReducers, applyMiddleware } from 'redux';
import { persistState } from 'redux-devtools';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools.jsx';
import { routerMiddleware, push } from 'react-router-redux';
import { Router, Route, hashHistory, Indexroute, browserHistory } from 'react-router';


const middleware = routerMiddleware(hashHistory);

let enhancer;
if(__DEVTOOLS__){
  enhancer = compose(
    //used for react-router-redux
    applyMiddleware(middleware),
    // Required! Enable Redux DevTools with the monitors you chose
    __DEVTOOLS__ ? DevTools.instrument(): {},
    // Optional. Lets you write ?debug_session=<key> in address bar to persist debug sessions
      __DEVTOOLS__ ? persistState(__SERVER__ ? undefined : window.location.href.match(/[?&]debug_session=([^&]+)\b/)) : {}
  );
}else{
  enhancer = compose(
    //used for react-router-redux
    applyMiddleware(middleware)
  );
}




export default initialState => {
  // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
  // See https://github.com/rackt/redux/releases/tag/v3.1.0
  const store = createStore(rootReducer, initialState, enhancer);

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  /* eslint-disable no-undef, global-require */
  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers'))
    );
  }
  /* eslint-enable no-undef, global-require */

  return store;
};
