import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    chart_value: [8, 2, 5, 9, 5, 11, 3, 5, 10, 0, 1, 8, 2, 9, 0, 13, 10, 7, 16],
  },
  mutations: {
    update_chart_value(state, new_data) {
      state.chart_value.push(new_data["Bat_V"]);
      state.chart_value.shift();
      console.log(new_data);
      console.log(state.chart_value);
    }
  },
  actions: {
    update_chart_value({ commit }) {
      return axios.get("ts/serial/output")
        .then(data => {
          commit("update_chart_value", data.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
})