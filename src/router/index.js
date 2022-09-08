import Vue from "vue";
import VueRouter from "vue-router";
import CountriesListView from "../views/CountriesListView.vue";
import DestinationsListView from "../views/DestinationsListView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/countries",
  },
  {
    path: "/countries",
    name: "Countries",
    component: CountriesListView,
  },
  {
    path: "/my-destinations",
    name: "MyDestinations",
    component: DestinationsListView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
