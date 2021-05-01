import { userService } from "../services";
import { loadStates } from "../helpers/utils";

export default {
  state: {
    isAuth: false,
    token: null,
    authLoadState: loadStates.INIT,
    logoutLoadState: loadStates.INIT,
    isSessionInit: false,
  },

  actions: {
    setupSession({ commit }) {
      commit("SETUP_SESSION");
    },
    changeAuthState({ commit }, auth = null) {
      return new Promise((resolve) => {
        if (auth) {
          commit("CHANGE_AUTH_STATE", auth);
        } else {
          commit("CHANGE_AUTH_STATE");
        }
        resolve(true);
      });
    },
    loginUser({ commit, dispatch }, { email, password }) {
      commit("SET_AUTH_LOADING_STATE", loadStates.PENDING);
      return new Promise((resolve, reject) => {
        userService
          .login(email, password)
          .then((user) => {
            commit("SET_TOKEN", user.authdata);
            dispatch("loadUser", user);
            commit("SET_AUTH_LOADING_STATE", loadStates.SUCCESS);
            resolve(user);
          })
          .catch((error) => {
            console.log(error);
            console.log("----------");
            dispatch("setError", error);
            commit("SET_AUTH_LOADING_STATE", loadStates.ERROR);
            reject(error);
          });
      });
    },
    logout({ commit, dispatch }) {
      commit("SET_AUTH_LOADING_STATE", loadStates.PENDING);
      commit("SET_LOGOUT_LOADING_STATE", loadStates.PENDING);

      return new Promise((resolve, reject) => {
        userService
          .logout()
          .then(() => {
            commit("REMOVE_TOKEN");
            dispatch("removeUser");
            commit("SET_AUTH_LOADING_STATE", loadStates.SUCCESS);

            resolve("logout");
          })
          .catch(({ response }) => {
            dispatch("setError", response);
            commit("SET_AUTH_LOADING_STATE", loadStates.ERROR);
            commit("REMOVE_TOKEN");
            dispatch("removeUser");
            commit("SET_LOGOUT_LOADING_STATE", loadStates.ERROR);
            reject(response);
          });
      });
    },
    removeSession({ commit }) {
      return new Promise((resolve) => {
        commit("REMOVE_TOKEN");
        resolve("ok");
      });
    },
    restart({ commit, dispatch }) {
      commit("SET_AUTH_LOADING_STATE", loadStates.PENDING);
      return new Promise((resolve) => {
        commit("REMOVE_TOKEN");
        //dispatch("removeGroup");
        dispatch("removeUser").then(() => {
          resolve(true);
        });
      });
    },
    triggerLogoutState({ commit }, state) {
      commit("SET_LOGOUT_LOADING_STATE", state);
    },
    setSession({ commit }) {
      commit("SETUP_SESSION");
    },
  },

  mutations: {
    SETUP_SESSION(state) {
      state.isAuth = !!localStorage.getItem("user_token");
      state.token = localStorage.getItem("user_token");
      state.isSessionInit = true;
    },
    CHANGE_AUTH_STATE(state, auth = null) {
      state.isAuth = auth ? auth : !state.isAuth;
    },
    SET_TOKEN(state, token) {
      localStorage.setItem("user_token", token);
      state.token = token;
      state.isAuth = true;
    },
    REMOVE_TOKEN(state) {
      localStorage.removeItem("user_token");
      state.token = null;
      state.isAuth = false;
    },
    SET_AUTH_LOADING_STATE(state, loadState) {
      state.authLoadState = loadState;
    },
    SET_LOGOUT_LOADING_STATE(state, loadState) {
      state.logoutLoadState = loadState;
    },
  },

  getters: {
    getAuthState: (state) => state.isAuth,
    authLoadState: (state) => state.authLoadState,
    logoutLoadState: (STATE) => STATE.logoutLoadState,
    isSessionInit: (state) => state.isSessionInit,
  },
};
