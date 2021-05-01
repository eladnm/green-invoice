import { loadStates } from "../helpers/utils";

export default {
  state: {
    user: JSON.parse(localStorage.getItem("__user")),
    users: [],
    userLoadStatus: loadStates.INIT,
  },
  actions: {
    loadUser({ commit }, user) {
      commit("SET_USER", user);
    },
    removeUser({ commit }) {
      commit("DELETE_USER_DATA");
    },
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
      localStorage.setItem("__user", JSON.stringify(user));
    },
    DELETE_USER_DATA(state) {
      localStorage.removeItem("__user");
      state.user = null;
    },
    SET_USER_LOAD_STATE(state, status) {
      state.userLoadStatus = status;
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
    userLoadStatus: (state) => state.userLoadStatus,
  },
};
