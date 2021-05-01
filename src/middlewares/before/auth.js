export default (to, from, next) => {
  if (to.matched.some(record => record.meta.guestGuard)) {
    next("/");
  } else {
      next();
  }
};
