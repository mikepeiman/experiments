import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    airtableExercises: [],
    records: "Vuex state of the records here"
  },
  mutations: {
    change(state, airtableExercises) {
      state.airtableExercises = airtableExercises
    }
  },
  getters: {
    airtableExercises: state => state.airtableExercises,
    records: state => state.airtableExercises.records
  },
  actions: {}
});
