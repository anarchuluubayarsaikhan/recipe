import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  user: JSON.parse(localStorage.getItem("user")) || null,
};

const mutations = {
  setUser(state, user) {
    state.user = user;
    localStorage.setItem("user", JSON.stringify(user)); 
  },
  clearUser(state) {
    state.user = null;
    localStorage.removeItem("user"); 
  },
};

const getters = {
  user: (state) => state.user, 
};

const store = new Vuex.Store({
  state,
  mutations,
  getters,
});

export default store;
