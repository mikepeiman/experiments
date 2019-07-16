import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Blog from "./views/Blog.vue";
import GraphCMS from "./views/GraphCMS.vue";
import Experiments from "./views/Experiments.vue";
import RadialSVG from "./views/RadialSVG.vue";
import ShootGame from "./views/ShootGame.vue";
import TextEffects from "./views/TextEffects.vue";
import Airtable from "./views/Airtable.vue";

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
        import("./views/About.vue")
    },
    {
      path: "/blog",
      name: "blog",
      component: () =>
        import("./views/Blog.vue")
    },
    {
      path: "/graphcms",
      name: "graphcms",
      component: () =>
        import("./views/GraphCMS.vue")
    },
    {
      path: "/airtable",
      name: "airtable",
      component: () =>
        import("./views/Airtable.vue")
    },
    {
      path: "/experiments",
      name: "experiments",
      component: () =>
        import( "./views/Experiments.vue")
    },
    {
      path: "/experiments/radialSVG",
      name: "radialsvg",
      component: () =>
        import( "./views/RadialSVG.vue")
    },
    {
      path: "/experiments/shoot",
      name: "shoot",
      component: () =>
        import( "./views/ShootGame.vue")
    },
    {
      path: "/experiments/text-effects",
      name: "texteffects",
      component: () =>
        import("./views/TextEffects.vue")
    }
  ]
});
