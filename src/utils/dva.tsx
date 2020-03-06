import React from 'react';
import { create } from 'dva-core';
import createLoading from 'dva-loading';
import { Provider, connect } from 'react-redux';

export { connect };

export default function(options: any) {
  const app = create(options);
  app.use(createLoading());

  options.models.forEach((model: any) => app.model(model));

  app.start();
  // eslint-disable-next-line no-underscore-dangle
  const store = app._store;
  console.log('=== app', store.getState());

  app.start = (container: any) => () => <Provider store={store}>{container}</Provider>;
  app.getStore = () => store;

  return app;
}
