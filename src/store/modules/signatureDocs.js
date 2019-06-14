import {
  GetDocTrackDetail,
  DownloadPDFsConcatenated,
  GetDocumentsToAccept,
  CheckDocumentExistence,
  SeePublishedDocument,
  GenerateOauthTokenForDocument,
  isAuthF2
} from "../services";
import i18n from "../../i18n";
import {debugExeption} from "../utils";

export const signatureDocs = {
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
        //if added => quick fix it was throwing a exception 
        if(payload.data.PENDING){
          state.displayedDocuments = payload.data.PENDING.items;
        }
      } else {
        state.data = payload;
        if(payload.PENDING){
        state.displayedDocuments = payload.PENDING.items;
        }
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
    FETCH_SIGNED(state) {
      if (state.data.SIGNED) {
        state.displayedDocuments = state.data.SIGNED.items;
      } else {
        state.displayedDocuments = [];
      }
    },
    FETCH_PENDING(state, payload) {
      if (payload) {
        state.displayedDocuments = payload.items;
      } else {
        state.displayedDocuments = [];
      }
    },
    FETCH_PENDING_BY_OTHERS(state) {
      if (state.data.PENDING_BY_OTHERS) {
        state.displayedDocuments = state.data.PENDING_BY_OTHERS.items;
      } else {
        state.displayedDocuments = [];
      }
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
      commit('SET_IS_LOADING');
      try {
        let response = await GetDocumentsToAccept(getLocale);
        if (response.data.actionResult === "success") {
          commit('SET_IS_LOADING');
          commit('SET_DATA', response.data);
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
          commit('SET_ACTION_NOTIFY', err);
        }
      } catch (err) {
        debugExeption(err)
        let error = {
          title: "Error",
          body: i18n.t("networkError",{section: 'documents to sign'})
        };
        commit('SET_ACTION_NOTIFY', error);
      }
    },
    async fetchDocumentPDF({ commit, getters:{getLocale} }, documetDetailsObj) {
      commit('SET_IS_LOADING');
      try {
        if(isAuthF2()){
          let response = await GenerateOauthTokenForDocument(getLocale)
          if((response.data.actionResult === 'success')) {
            return await SeePublishedDocument(
              documetDetailsObj.documentDetailsArg,
              documetDetailsObj.forSignedArg,
              response.data.data.access_token,
              getLocale )
          }
        } else {
          return await SeePublishedDocument(
            documetDetailsObj.documentDetailsArg,
            documetDetailsObj.forSignedArg,
            null,
            getLocale )
        }
      } catch (err) {
        debugExeption(err)
        let error = {
          title: "Error",
          body: i18n.t("networkError",{section: 'documents to sign'})
        };
        commit('SET_ACTION_NOTIFY', error);
      }
    },
    async fetchPDFsConcatenated({ commit, getters:{getLocale} }, documetDetailsObj) {
      commit('SET_IS_LOADING');
      try {
          return await DownloadPDFsConcatenated(
            documetDetailsObj,
            getLocale )
  
      } catch (err) {
        debugExeption(err)
        let error = {
          title: "Error",
          body: i18n.t("networkError",{section: 'documents to sign'})
        };
        commit('SET_ACTION_NOTIFY', error);
      }
    },
    async fetchDocumentExistence({ commit,getters:{getLocale}}, documentDetails) {
      commit('SET_IS_LOADING');
      try {
          return await CheckDocumentExistence(documentDetails, getLocale )
      } catch (err) {
        debugExeption(err)
        let error = {
          title: "Error",
          body: i18n.t("networkError",{section: 'documents to sign'})
        };
        commit('SET_ACTION_NOTIFY', error);
      }
    },
    async fetchDocTrackDetails({ commit, getters:{getLocale} }, documentDetails) {
      commit('SET_IS_LOADING');
  
      try {
        return await GetDocTrackDetail(documentDetails, getLocale )
  
      } catch (err) {
        debugExeption(err)
        let error = {
          title: "Error",
          body: i18n.t("networkError",{section: 'documents to sign'})
        };
        commit('SET_ACTION_NOTIFY', error);
      }
    },
    async fetchSigned({ commit }) {
      commit('SET_IS_LOADING');
      commit('FETCH_SIGNED');
    },
    async fetchPending({ commit }) {
      commit('SET_IS_LOADING');
      commit('FETCH_PENDING', this.state.signatureDocs.data.PENDING);
    },
    async fetchPendingByOthers({ commit }) {
      commit('SET_IS_LOADING');
      commit('FETCH_PENDING_BY_OTHERS');
    }
  }
};
