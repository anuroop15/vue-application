import {
  DownloadPDFsConcatenated,
  GetDocumentsToAcceptNonMillennium,
  CheckDocumentExistence,
  SeePublishedDocumentNonMillennium,
  GenerateOauthTokenForDocument,
  AcceptDocumentsValidateNonMillennium,
  isAuthF2
} from "../services";
import i18n from "../../i18n";
import {debugExeption} from "../utils";

export const signatureDocsNonMillennium = {
  namespaced: true,
  state: {
    data: {},
    canSign: false,
    displayedDocuments: {},
    trackDetails: {},
    current: "",
    documentPath: "",
    isLoading: false,
    message: {
      title: "",
      body: ""
    },
  },
  getters: {
    documents: state => {
      return state.data;
    },
    getLocale: (state, getters, rootState) => {
      return rootState.i18n.locale;
    }
  },
  mutations: {
    SET_DATA(state, payload) {
      if (payload.data) {
        state.data = payload.data;
        state.displayedDocuments = payload.data.items;
      } 
    },
    SET_DOCUMENT_PDF(state, payload) {
      const blobContent = new Blob([payload], { type: "application/pdf" });
      const fileUrl = window.URL.createObjectURL(blobContent);
      state.documentPath = fileUrl;
    },
    SET_TRACK_DETAILS(state, payload) {
      state.trackDetails = payload.data;
    },
    SET_CURRENT(state, payload) {
      state.current = payload;
    },
    SET_IS_LOADING(state, payload) {
      state.isLoading = payload === state.isLoading;
    },
    SET_ACTION_NOTIFY(state,{ body, title }){
      state.message = {
        title: title,
        body: body
      };
    }
  },
  actions: {
    async fetchGetDocumentsToAccept({ commit, getters:{getLocale} }) {
    //async fetchData({ commit, getters:{getLocale} }) {
      commit("SET_IS_LOADING");
      try {
        let response = await GetDocumentsToAcceptNonMillennium(getLocale);
        if (response.data.actionResult === "success") {
          commit("SET_IS_LOADING");
          commit("SET_DATA", response.data);
        } else {
          let message =
            response.data.actionMessages != null &&
            response.data.actionMessages.length > 0
              ? response.data.actionMessages.join("\n")
              : (message = response.data.actionErrors.join("\n"));
          let err = {
            title: "Error",
            body: message ? message : "Internal Error"
          };
          commit("SET_ACTION_NOTIFY", err);
        }
      } catch (err) {
        debugExeption(err)
        let error = {
          title: "Error",
          body: i18n.t("networkError")
        };
        commit("SET_ACTION_NOTIFY", error);
      }
    },
    async fetchDocumentPDF({ commit, getters:{getLocale} }, documetDetailsObj) {
      commit("SET_IS_LOADING");
      try {
        if(isAuthF2()){
          let response = await GenerateOauthTokenForDocument(getLocale)
          if((response.data.actionResult === 'success')) {
            return await SeePublishedDocumentNonMillennium(
              documetDetailsObj.documentDetailsArg,
              documetDetailsObj.forSignedArg,
              response.data.data.access_token,
              getLocale )
          }
        } else {
          return await SeePublishedDocumentNonMillennium(
            documetDetailsObj.documentDetailsArg,
            documetDetailsObj.forSignedArg,
            null,
            getLocale )
        }
      } catch (err) {
        debugExeption(err)
        let error = {
          title: "Error",
          body: i18n.t("networkError")
        };
        commit("SET_ACTION_NOTIFY", error);
      }   
    },
    async fetchPDFsConcatenated({ commit, getters:{getLocale} }, documetDetailsObj) {
      commit("SET_IS_LOADING");
      try {
        return await DownloadPDFsConcatenated(
          documetDetailsObj,
          null,
          getLocale )
      } catch (err) {
        debugExeption(err)
        let error = {
          title: "Error",
          body: i18n.t("networkError")
        };
        commit("SET_ACTION_NOTIFY", error);
      } 
    },
    async fetchDocumentExistence({ commit,getters:{getLocale}}, documentDetails) {
      commit("SET_IS_LOADING");
      try {
        return await CheckDocumentExistence(documentDetails, getLocale )
      } catch (err) {
        debugExeption(err)
        let error = {
          title: "Error",
          body: i18n.t("networkError")
        };
        commit("SET_ACTION_NOTIFY", error);
      } 
    },
    async checkAcceptDocuments({ commit, getters:{getLocale}}) {
      commit("SET_IS_LOADING");
      try {
        return await AcceptDocumentsValidateNonMillennium(getLocale)
      } catch (err) {
        debugExeption(err)
        let error = {
          title: "Error",
          body: i18n.t("networkError")
        };
        commit("SET_ACTION_NOTIFY", error);
      }
    }
  },
};
