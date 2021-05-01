export default {
  state: {
    errorMsg: null,
    responseMsg: null,
  },
  actions: {
    setError({ commit }, error) {
      commit("SET_ERROR", error);
    },
    setResponse({ commit }, message) {
      commit("SET_RESPONSE", message);
    },
  },
  mutations: {
    SET_ERROR(state, error) {
      if (!error) return;
      if (typeof error == "string") {
        state.errorMsg = error;
      } else {
        let data = error.data;
        if (data.meta) {
          const meta = data.meta.errors;
          let msg = `<h3>${data.message}</h3><ul>`;
          const keys = Object.keys(meta);
          keys.forEach((key) => {
            msg += `<li>${meta[key][0]}`;
          });
          msg += "</ul>";
          state.errorMsg = msg;
          return;
        }
        if (data.message) {
          state.errorMsg = data.message;
        } else {
          state.errorMsg = data;
        }
      }
    },
    CLEAR_ERROR(state) {
      state.errorMsg = null;
    },
    SET_RESPONSE(state, msg) {
      state.responseMsg = msg;
    },
    CLEAR_RESPONSE(state) {
      state.responseMsg = null;
    },
  },
  getters: {
    errorMsg: (state) => state.errorMsg,
    responseMsg: (state) => state.responseMsg,
  },
};
