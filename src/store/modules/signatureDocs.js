import { getLocalData, GetDocTrackDetail, DownloadPDFsConcatenated, GetDocumentsToAccept, CheckDocumentExistence, SeePublishedDocument } from '../services'

export const signatureDocs = {
  namespaced: true,
  state: {
    data: {},
    canSign: false,
    displayedDocuments: {},
    trackDetails: {},
    current: '',
    documentPath: '',
    isLoading: false
  },
  getters: {
    documents: state => {
      return state.data
    }
  },
  mutations: {
    SET_DATA (state, payload) {
      if (payload.data) {
        state.data = payload.data
        state.displayedDocuments = payload.data.PENDING.items
      } else {
        state.data = payload
        state.displayedDocuments = payload.PENDING.items
      }
    },
    SET_DOCUMENT_PDF (state, payload) {
      const blobContent = new Blob([payload], {type: 'application/pdf'})
      const fileUrl = window.URL.createObjectURL(blobContent)
      state.documentPath = fileUrl
    },
    SET_TRACK_DETAILS (state, payload) {
      state.trackDetails = payload.data
    },
    FETCH_SIGNED (state) {
      if (state.data.SIGNED) {
        state.displayedDocuments = state.data.SIGNED.items
      } else {
        state.displayedDocuments = []
      }
    },
    FETCH_PENDING (state, payload) {
      if (payload) {
        state.displayedDocuments = payload.items
      } else {
        state.displayedDocuments = []
      }
    },
    FETCH_PENDING_BY_OTHERS (state, payload) {
      if (state.data.PENDING_BY_OTHERS) {
        state.displayedDocuments = state.data.PENDING_BY_OTHERS.items
      } else {
        state.displayedDocuments = []
      }
    },
    SET_CURRENT (state, payload) {
      state.current = payload
    },
    SET_IS_LOADING (state, payload) {
      state.isLoading = payload === state.isLoading
    }
  },
  actions: {
    async fetchData ({ commit }) {
      commit('SET_IS_LOADING')
      try {
        let response = await GetDocumentsToAccept()
        if (response) {
          commit('SET_IS_LOADING')
          commit('SET_DATA', response.data)
        }
      } catch (err) {
        // console.log(err)
      }
    },
    async fetchDocumentPDF({commit}, documetDetailsObj) {
      commit('SET_IS_LOADING')

      return new Promise((resolve, reject) => {
        SeePublishedDocument(documetDetailsObj.documentDetailsArg, documetDetailsObj.forSignedArg).then(response => {
          resolve(response.data)
        }, error => {
          reject(error)
        })
      })
    },
    async fetchPDFsConcatenated({commit}, documetDetailsObj) {
      commit('SET_IS_LOADING')

      return new Promise((resolve, reject) => {
        DownloadPDFsConcatenated(documetDetailsObj).then(response => {
          resolve(response.data)
        }, error => {
          reject(error)
        })
      })
    },
    async fetchDocumentExistence({commit}, documentDetails) {
      commit('SET_IS_LOADING')
      return new Promise((resolve, reject) => {
        CheckDocumentExistence(documentDetails).then(response => {
          resolve(response.data)
        }, error => {
          reject(error)
        })
      })
    },
    async fetchDocTrackDetails({commit}, documentDetails) {
      commit('SET_IS_LOADING')
      return new Promise((resolve, reject) => {
        GetDocTrackDetail(documentDetails).then(response => {
          commit('SET_TRACK_DETAILS', response.data)
          resolve(response.data)
        }, error => {
          reject(error)
        })
      })
    },
    async fetchSigned ({ commit }) {
      commit('SET_IS_LOADING')
      commit('FETCH_SIGNED')
    },
    async fetchPending ({ commit }) {
      commit('SET_IS_LOADING')
      commit('FETCH_PENDING', this.state.signatureDocs.data.PENDING)
    },
    async fetchPendingByOthers ({ commit }) {
      commit('SET_IS_LOADING')
      commit('FETCH_PENDING_BY_OTHERS')
    }
  }
}