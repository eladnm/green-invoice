import Vue from "vue";
import Vuex from "vuex";
import auth from "../modules/auth";
import error from "../modules/error";
import user from "../modules/user";
import { createStore } from "vuex-extensions";

import { loadStates } from "../helpers/utils";

Vue.use(Vuex);

export default createStore(Vuex.Store, {
  state: {
    isInitialized: false,
    home: true,
  },
  mutations: {
    showHome: state => (state.home = true),
    hideHome: state => (state.home = false),
    isInit: state => (state.isInitialized = true),
    INIT_SESSION: state => {
      state.auth.isAuth = !!localStorage.getItem("user_token");
      state.auth.token = localStorage.getItem("user_token");
      state.auth.authLoadState = state.auth.isAuth
        ? loadStates.SUCCESS
        : loadStates.INIT;
    },
  },
  actions: {
    initSession({ commit }) {
      commit("INIT_SESSION");
    },
  },
  getters: {
    current: state => {
      if (!state.auth.isAuth) {
        return "auth";
      }

      return "dashboard";
    },
    isInitialized: state => state.isInitialized,
  },
  modules: { auth, error, user },
});
