import {
  ChallengeInitiate,
  ChallengeStart,
  ChallengeCheckOTPPhoneChallenge
} from "../services";
import {
  debugExeption,
  doPlain,
  ChallengeConstant as Constant,
  add_deviceprint
} from "../utils";
export const challengeManager = {
  namespaced: true,
  state: {
    methods: [],
    selectedMethod: {},
    stage: "",
    messages: "",
    stageAction: "",
    error: {
      data: {},
      exit: false
    },
    isLoading:true,
  },
  mutations: {
    SET_INITIAL_STATE(state) {
      state.stageAction = "";
      state.methods = [];
    },
    SET_METHODS(
      state,
      {
        data: {
          challenge: { methods, stage }
        }
      }
    ) {
      state.methods = methods;
      state.stage = stage;
      state.isLoading = false;
    },
    SET_STAGE(state, stage) {
      state.stage = stage;
    },
    SET_METHODS_SELECTED(
      state,
      {
        data: {
          challenge: { selectedMethod, stage }
        },
        actionMessages
      }
    ) {
      state.isLoading = false;
      state.selectedMethod = selectedMethod;
      state.stage = stage;
      state.messages = actionMessages.join("\n");
    },
    SET_ERROR(state, data) {
      state.isLoading = false;
      state.error = {
        exit: true,
        data
      };
    },
    SET_STAGE_ACTION(state, action) {
      state.stageAction = action;
    }
  },
  actions: {
    _setStage({ commit }, stage) {
      commit("SET_STAGE", stage);
    },
    _setActionStage({ commit }, action) {
      commit("SET_STAGE_ACTION", action);
    },
    async _challengeInit({ commit , getters:{getLocale} }, { urlBase, parameters }) {
      commit("SET_INITIAL_STATE");
      try {
        if(parameters.devicePrint){
         parameters.devicePrint = add_deviceprint()
        }
        let response = await ChallengeInitiate(urlBase, doPlain(parameters), getLocale);
        if (response.data.actionResult === "challenge") {
          commit("SET_METHODS", response.data);
        } else if (response.data.actionResult === "error") {
          commit("SET_ERROR", response.data);
        } else {
          commit("SET_METHODS", response.data);
        }
      } catch (err) {
        debugExeption(err,"modules/challengeManager:89");
        commit("SET_ERROR", err.response.data)
      }
    },
    async _challengeStart({ commit, getters:{getLocale, getSelectedMethods} }, { urlBase, picked }) {
      let { label, type } = getSelectedMethods(picked);
      let data = doPlain({ label, type }, "challengeMethod");
      try {
        let response = await ChallengeStart(urlBase, data, getLocale);
        if (response.data.actionResult === "challenge") {
          commit("SET_METHODS_SELECTED", response.data);
        } else if (response.data.actionResult === "error") {
          commit("SET_ERROR", response.data);
        }
      } catch (err) {
        debugExeption(err, "modules/challengeManager:103");
        commit("SET_ERROR", err.response.data)
      }
    },
    async _processOTP({ commit, state, getters:{getLocale} }, { urlBase, token }) {
      try {
        let data = doPlain({ tokenOTP: token });
        let response = await ChallengeCheckOTPPhoneChallenge(urlBase, data, getLocale);
        if (response.data.actionResult === "success") {
          let {
            data: {
              data: {
                challenge: { stage }
              }
            }
          } = response;
          commit("SET_STAGE", stage);
          if (state.stage === Constant.challengeStage.RETRY) {
            commit("SET_STAGE_ACTION", `${Constant.challengeStage.RETRY}_CODE`);
          }
        } else if (response.data.actionResult === "challenge") {
          commit("SET_STAGE", response.data.data.challenge.stage);
          if (state.stage === Constant.challengeStage.RETRY) {
            commit("SET_STAGE_ACTION", `${Constant.challengeStage.RETRY}_CODE`);
          }
        } else if (response.data.actionResult === "error") {
          commit("SET_ERROR", response.data);
        }
      } catch (err) {
        debugExeption(err,"modules/challengeManager:131");
        commit("SET_ERROR", err.response.data)
      }
    }
  },
  getters: {
    getSelectedMethods: state => label => {
      return state.methods.find(method => method.label === label);
    },
    getLocale: (state, getters, rootState) => {
      return rootState.i18n.locale;
    }
  }
};
