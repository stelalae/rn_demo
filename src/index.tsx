import React from 'react';
// import { Text, TextInput } from 'react-native';
import codePush from 'react-native-code-push';

import dva from './utils/dva';
import Router from './router';
// import { routerMiddleware, routerReducer } from './router';
import appModel from './models/app';

// TextInput.defaultProps = Object.assign({}, TextInput.defaultProps || {}, { allowFontScaling: false });
// Text.defaultProps = Object.assign({}, Text.defaultProps || {}, { allowFontScaling: false });

const optionsDva = {
  initialState: {},
  models: [appModel],
  extraReducers: {},
  onAction: [],
  // extraReducers: { router: routerReducer },
  // onAction: [routerMiddleware],
  onError(e) {
    e.preventDefault();
    console.error('=== dva onError', e.message);
  },
};

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START, // 检查更新的时机
};

const App = (props: any = {}) => {
  const optionsNew = Object.assign({}, optionsDva, { initialState: { app: props } });
  console.log('=== dva props', props, optionsNew);
  const { user = {}, apiServer = '', notifyName = '' } = props;
  const app = dva(optionsNew);
  global.HxUserInfo = user;
  global.apiServer = apiServer;
  global[notifyName] = app._store;
  const Entry = app.start(<Router />);
  const RealApp = codePush(codePushOptions)(Entry);
  return <RealApp />;
};

export default App;
