import { GetFundsTransfer } from "../services";

export const fundsTransfers = {
  namespaced: true,
  state: {
    data: {
      identifier: "",
      items: [],
      numRows: 0
    },
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
    findCurrent({ state, commit }, idFundsTransfer) {
      let { items } = state;
      for (let item in items) {
        if (item.idFundsTransfer === idFundsTransfer) {
          commit("SET_CURREN", item);
        }
      }
    },

    async fetchData({ commit }) {
      commit("SET_IS_LOADING");
      try {
        let response = await GetFundsTransfer();
        if (response.data.actionResult === "success") {
          commit("SET_IS_LOADING");
          commit("SET_DATA", response.data.data);
        } else {
          let message =
            response.data.actionMessages != null &&
            response.data.actionMessages.length > 0
              ? response.data.actionMessages.join("\n")
              : (message = response.data.actionErrors.join("\n"));
          let err = message ? message : "Internal Error";
          throw `Error: ${err}`;
        }
      } catch (err) {
        // eslint-disable-next-line
        console.log(err);
      }
    },

    async fetchUser({ commit }, id) {
      commit("SET_IS_LOADING");
      try {
        let response = await GetFundsTransfer(id);
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
