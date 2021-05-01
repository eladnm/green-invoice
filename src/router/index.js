import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import before from "../middlewares/before";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/user",
    name: "UserInfo",
    component: () => import("../views/UserInfo"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../components/Login"),
    meta: {
      guestGuard: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
  linkActiveClass: "active",
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }

    return { x: 0, y: 0 };
  },
});

router.beforeEach(before);

export default router;
