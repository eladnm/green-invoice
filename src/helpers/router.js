import Vue from "vue";
import Router from "vue-router";

import Dashboard from "../components/Dashboard";
import Login from "../components/Login";

Vue.use(Router);

export const router = new Router({
  mode: "history",
  routes: [
    { path: "/", component: Dashboard },
    { path: "/login", component: Login },

    // otherwise redirect to home
    { path: "*", redirect: "/" },
  ],
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  if (authRequired && !loggedIn) {
    return next({
      path: "/login",
      query: { returnUrl: to.path },
    });
  }

  next();
});
