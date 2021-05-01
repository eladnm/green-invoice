import store from "../store";

export default (to, from, next) => {
  if (store.state.auth.isAuth) {
    next({ path: "/" });
  } else {
    next();
  }
};
