import { demoServiceGetAll, demoServiceGetOne } from "../services";

export const demo = {
  state: {
    data: [{ name: "demo" }],
    current: "",
    isLoading: false
  },
  mutations: {
    SET_DATA(state, events) {
      state.data = events;
    },
    SET_CURRENT(state, event) {
      state.current = event;
    },
    SET_IS_LOADING(state) {
      state.isLoading = state.isLoading ? false : true;
    }
  },
  actions: {
    async fetchDataDemo({ commit }) {
      commit("SET_IS_LOADING");
      try {
        let response = await demoServiceGetAll();
        if (response) {
          commit("SET_IS_LOADING");
          commit("SET_DATA", response.data);
        }
      } catch (err) {
        // eslint-disable-next-line
        console.log(err);
      }
    },
    async fetchUser({ commit }, id) {
      commit("SET_IS_LOADING");
      try {
        let response = await demoServiceGetOne(id);
        if (response) {
          commit("SET_IS_LOADING");
          commit("SET_CURRENT", response.data);
        }
      } catch (err) {
        // eslint-disable-next-line
        console.log(err);
      }
    }
  }
};
