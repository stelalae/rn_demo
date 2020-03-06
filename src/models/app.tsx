/**
 * path、page、user、params，是原生传递给RN预设参数，值可能为null
 */

export default {
  namespace: 'app',
  state: {},
  reducers: {
    updateState(state: any, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *test({ callback, res = {} }, { put }) {},
  },
  subscriptions: {},
};
