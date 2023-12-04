import { createStore } from 'vuex';
export default createStore({
  state: {
    gameSetting:{
      // gameMode: {
      //   "text": "normal",
      //   "label": "一般",
      // },
      // count: 20,
      // roles:[]
  }
  },
  mutations: {
    setGameSetting(state, payload) {
      state.gameSetting = payload;
    }
  },
  actions: {
    updateGameSetting(context, payload) {
      
      context.commit('setGameSetting', payload);
    }
  }
});
