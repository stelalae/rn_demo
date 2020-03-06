import React from 'react';
import codePush from 'react-native-code-push';

import dva from './utils/dva';
import Router, { AppNavigator } from './router';
import Navigator from './utils/navigator';
import appModel from './models/app';

const { routerMiddleware, routerReducer } = Navigator;
const optionsDva = {
  initialState: {},
  models: [appModel],
  // extraReducers: {},
  // onAction: [],
  extraReducers: { router: routerReducer(AppNavigator) },
  onAction: [routerMiddleware],
  onError(e) {
    e.preventDefault();
    console.error('=== dva onError', e.message);
  },
};

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START, // 检查更新的时机
};

const App = (props: any = {}) => {
  const optionsNew = Object.assign(optionsDva, { initialState: { app: { ...props, user: { a: 1 } } } });
  console.log('=== dva props', props);
  const { notifyName = '' } = props;
  const app = dva(optionsNew);
  global[notifyName] = app._store;
  const Entry = app.start(<Router />);
  const RealApp = codePush(codePushOptions)(Entry);
  return <RealApp />;
};

export default App;
