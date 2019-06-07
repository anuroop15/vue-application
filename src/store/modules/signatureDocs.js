
// import i18n from "../../i18n";
// import {debugExeption} from "../utils";
import actions from './actions/actions';
import { mutations } from './mutations/mutations';

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
    [mutations['SET_DATA']](state, payload) {
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
    [mutations['FETCH_SIGNED']](state) {
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
    [mutations['SET_ACTION_NOTIFY']](state,{ body, title }){
      state.message = {
        title: title,
        body: body
      };
    }
  },
  actions: actions
};
