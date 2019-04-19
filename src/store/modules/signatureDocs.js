import { getLocalData } from '../services'

export const signatureDocs = {
  state: {
    data: {},
    canSign: false,
    signedDocuments: {},
    pendingDocuments: {},
    current: '',
    isLoading: false
  },
  getters: {
    documents: state => {
      return state.data
    }
  },
  mutations: {
    SET_DATA (state, event) {
      state.data = event
    },
    FETCH_SIGNED (state, docs) {
      state.signedDocuments = docs
    },
    FETCH_PENDING (state, docs) {
      state.pendingDocuments = docs
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
        console.log(err)
      }
    },
    async fetchSigned ({ commit }, documents) {
      commit('SET_IS_LOADING')
      if(documents) {
        commit('FETCH_SIGNED', documents.data.SIGNED)
      }
    },
    async fetchPending ({ commit }, documents) {
      commit('SET_IS_LOADING')
      if(documents) {
        commit('FETCH_PENDING', documents.data.PENDING)
      }
    }
  }
}
