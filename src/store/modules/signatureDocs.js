import { getLocalData } from '../services'

export const signatureDocs = {
  namespaced: true,
  state: {
    data: {},
    canSign: false,
    displayedDocuments: {},
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
      if (event.data) {
        state.data = event.data
        state.displayedDocuments = event.data.PENDING.items
      } else {
        state.data = event
        state.displayedDocuments = event.PENDING.items
      }
    },
    FETCH_SIGNED (state, docs) {
      state.displayedDocuments = docs.items
    },
    FETCH_PENDING (state, docs) {
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
    async fetchSigned ({ commit }, documents) {
      commit('SET_IS_LOADING')
      if (this.state.signatureDocs.data.PENDING_BY_OTHERS) {
        commit('FETCH_SIGNED', this.state.signatureDocs.data.PENDING_BY_OTHERS)
      } else {
        commit('FETCH_SIGNED', this.state.signatureDocs.data.SIGNED)
      }
    },
    async fetchPending ({ commit }, documents) {
      commit('SET_IS_LOADING')
      commit('FETCH_PENDING', this.state.signatureDocs.data.PENDING)
    }
  }
}
