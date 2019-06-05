import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/experiments",
      name: "experiments",
      component: () =>
        import(/* webpackChunkName: "experiments" */ "./views/Experiments.vue")
    },
    {
      path: "/radialSVG",
      name: "radialSVG",
      component: () =>
        import(/* webpackChunkName: "experiments" */ "./views/RadialSVG.vue")
    },
    {
      path: "/text-effects",
      name: "text-effects",
      component: () =>
        import("./views/TextEffects.vue")
    }
  ]
});
