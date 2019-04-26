import { ChallengeInitiate, ChallengeStart } from "../services";
import { debugExeption, doPlain } from "../utils";
export const challengeManager = {
  namespaced: true,
  state: {
    methods: []
  },
  mutations: {
    SET_INITIAL_STATE(state) {
      state.methods = [];
    },
    SET_METHODS(
      state,
      {
        data: {
          challenge: { methods }
        }
      }
    ) {
      state.methods = methods;
    }
  },
  actions: {
    async _challengeInit({ commit }, { urlBase, parameters }) {
      commit("SET_INITIAL_STATE");
      try {
        let response = await ChallengeInitiate(urlBase, parameters);
        if (response.data.actionResult === "challenge") {
          commit("SET_METHODS", response.data);
        } else if (response.data.actionResult === "error") {
          //_handleErroneousActionResult
          // eslint-disable-next-line
          console.log("handel error");
        } else {
          commit("SET_METHODS", response.data);
        }
      } catch (err) {
        //debugException2
        // eslint-disable-next-line
        debugExeption(err);
      }
    },
    async _challengeStart({ commit, getters }, { urlBase, picked }) {
      //commit("SET_INITIAL_STATE")
      let { label, type } = getters.getSelectedMethods(picked);
      let data = doPlain({ label, type }, "challengeMethod");
      try {
        let response = await ChallengeStart(urlBase, data);
        if (response.data.actionResult === "challenge") {
          console.log(response.data);
        } else if (response.data.actionResult === "error") {
          //_handleErroneousActionResult
          // eslint-disable-next-line
          console.log("handel error");
        } else {
          console.log(response.data);
        }
      } catch (err) {
        console.log(err);
        // eslint-disable-next-line
        debugExeption(err);
      }
    }
  },
  getters: {
    getSelectedMethods: state => label => {
      return state.methods.find(method => method.label === label);
    }
  }
};
