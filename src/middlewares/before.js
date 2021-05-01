import store from "../store";
import guest from "./before/guest";
import auth from "./before/auth";

export default async (to, from, next) => {
  if (!store.state.auth.isSessionInit) {
    await store.dispatch("setSession");
  }
  if (store.state.auth.isAuth) {
    auth(to, from, next);
  } else {
    guest(to, from, next);
  }
};
