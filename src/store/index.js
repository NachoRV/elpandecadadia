import { createStore } from 'vuex';

export default createStore({
  state: {
    user: {
      loggedIn: false,
      data: null,
    },
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
    LOGOUT_USER(state) {
      state.user.data = null;
      state.user.loggedIn = false;
    },
  },
  actions: {
    fetchUser({ commit }, user) {
      commit('SET_LOGGED_IN', user !== null);
      if (user) {
        commit('SET_USER', {
          displayName: user.displayName,
          email: user.email,
        });
      } else {
        commit('SET_USER', null);
      }
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
  modules: {
  },
});
