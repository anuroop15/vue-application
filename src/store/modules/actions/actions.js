import {
  GetDocTrackDetail,
  DownloadPDFsConcatenated,
  GetDocumentsToAccept,
  CheckDocumentExistence,
  SeePublishedDocument,
  GenerateOauthTokenForDocument,
  isAuthF2
} from "../../services";
import { mutations } from '../mutations/mutations';
import i18n from "../../../i18n";
import {debugExeption} from "../../utils";

export default {
  async fetchGetDocumentsToAccept({ commit, getters:{getLocale} }) {
    commit(mutations['SET_IS_LOADING']);
    try {
      let response = await GetDocumentsToAccept(getLocale);
      if (response.data.actionResult === "success") {
        commit(mutations['SET_IS_LOADING']);
        commit(mutations['SET_DATA'], response.data);
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
        commit(mutations['SET_ACTION_NOTIFY'], err);
      }
    } catch (err) {
      debugExeption(err)
      let error = {
        title: "Error",
        body: i18n.t("networkError")
      };
      commit(mutations['SET_ACTION_NOTIFY'], error);
    }
  },
  async fetchDocumentPDF({ commit, getters:{getLocale} }, documetDetailsObj) {
    commit(mutations['SET_IS_LOADING']);
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
        body: i18n.t("networkError")
      };
      commit(mutations['SET_ACTION_NOTIFY'], error);
    }
  },
  async fetchPDFsConcatenated({ commit, getters:{getLocale} }, documetDetailsObj) {
    commit(mutations['SET_IS_LOADING']);
    try {
        return await DownloadPDFsConcatenated(
          documetDetailsObj,
          getLocale )

    } catch (err) {
      debugExeption(err)
      let error = {
        title: "Error",
        body: i18n.t("networkError")
      };
      commit(mutations['SET_ACTION_NOTIFY'], error);
    }
  },
  async fetchDocumentExistence({ commit,getters:{getLocale}}, documentDetails) {
    commit(mutations['SET_IS_LOADING']);
    try {
      if(isAuthF2()){
        let response = await GenerateOauthTokenForDocument(getLocale)
        if((response.data.actionResult === 'success')) {
          return await CheckDocumentExistence(documentDetails, response.data.data.access_token,
            getLocale )
        }
      } else {
        return await CheckDocumentExistence(documentDetails, getLocale )
      }
    } catch (err) {
      debugExeption(err)
      let error = {
        title: "Error",
        body: i18n.t("networkError")
      };
      commit(mutations['SET_ACTION_NOTIFY'], error);
    }
  },
  async fetchDocTrackDetails({ commit, getters:{getLocale} }, documentDetails) {
    commit(mutations['SET_IS_LOADING']);

    try {
      return await GetDocTrackDetail(documentDetails, getLocale )

    } catch (err) {
      debugExeption(err)
      let error = {
        title: "Error",
        body: i18n.t("networkError")
      };
      commit(mutations['SET_ACTION_NOTIFY'], error);
    }
  },
  async fetchSigned({ commit }) {
    commit(mutations['SET_IS_LOADING']);
    commit(mutations['FETCH_SIGNED']);
  },
  async fetchPending({ commit }) {
    commit(mutations['SET_IS_LOADING']);
    commit(mutations['FETCH_PENDING'], this.state.signatureDocs.data.PENDING);
  },
  async fetchPendingByOthers({ commit }) {
    commit(mutations['SET_IS_LOADING']);
    commit(mutations['FETCH_PENDING_BY_OTHERS']);
  }
}