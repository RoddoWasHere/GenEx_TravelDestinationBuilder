import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    destinations: [],
    currentPage: "",
  },
  getters: {
    destinations(state) {
      return state.destinations;
    },
    destinationsContains: (state) => (item) => {
      const tp = state.destinations.find((i) => i.id == item.id); //TODO: use find
      return tp != null;
    },
  },
  mutations: {
    addToDestinations(state, country) {
      state.destinations.push(country);
    },
    removeFromDestinations(state, item) {
      let index = -1;
      state.destinations.find((c, i) => {
        if (c.id == item.id) index = i;
        return c.id == item.id;
      });
      if (index != -1) state.destinations.splice(index, 1);
    },
  },
  actions: {
    addToDestinations(context, country) {
      context.commit("addToDestinations", country);
    },
    removeFromDestinations(context, country) {
      context.commit("removeFromDestinations", country);
    },
  },
  modules: {},
});
