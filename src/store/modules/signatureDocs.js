import { getLocalData, GetDocumentsToAccept, SeePublishedDocument } from '../services'

export const signatureDocs = {
  namespaced: true,
  state: {
    data: {},
    canSign: false,
    displayedDocuments: {},
    current: '',
    document: '',
    isLoading: false
  },
  getters: {
    documents: state => {
      return state.data
    }
  },
  mutations: {
    SET_DATA (state, event) {
      if (event.data) {
        state.data = event.data
        state.displayedDocuments = event.data.PENDING.items
      } else {
        state.data = event
        state.displayedDocuments = event.PENDING.items
      }
    },
    SET_DOCUMENT_PDF (state, event) {
      state.document = event
    },
    FETCH_SIGNED (state, docs) {
      state.displayedDocuments = docs.items
    },
    FETCH_PENDING (state, docs) {
      state.displayedDocuments = docs.items
    },
    FETCH_PENDING_BY_OTHERS (state, docs) {
      state.displayedDocuments = docs.items
    },
    SET_CURRENT (state, event) {
      state.current = event
    },
    SET_IS_LOADING (state, event) {
      state.isLoading = event === state.isLoading
    }
  },
  actions: {
    async fetchData ({ commit }) {
      commit('SET_IS_LOADING')
      try {
        let response = await getLocalData()
        if (response) {
          commit('SET_IS_LOADING')
          commit('SET_DATA', response.data)
        }
      } catch (err) {
        // console.log(err)
      }
    },
    async fetchDocumentPDF({commit}, documentDetails) {
      commit('SET_IS_LOADING')
      try {
        let response = await SeePublishedDocument(documentDetails)
        if (response) {
          commit('SET_IS_LOADING')
          commit('SET_DOCUMENT_PDF', response.data)
        }
      } catch (err) {
        // console.log(err)
      }
    },
    async fetchSigned ({ commit }, documents) {
      commit('SET_IS_LOADING')
      commit('FETCH_SIGNED', this.state.signatureDocs.data.SIGNED)
    },
    async fetchPending ({ commit }, documents) {
      commit('SET_IS_LOADING')
      commit('FETCH_PENDING', this.state.signatureDocs.data.PENDING)
    },
    async fetchPendingByOthers ({ commit }, documents) {
      commit('SET_IS_LOADING')
      commit('FETCH_PENDING_BY_OTHERS', this.state.signatureDocs.data.PENDING_BY_OTHERS)
    }
  }
}
