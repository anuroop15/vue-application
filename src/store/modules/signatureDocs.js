import { getLocalData } from '../services'

export const signatureDocs = {
  state: {
    data: [{
      name: 'signatureDocs'
    }],
    current: '',
    isLoading: false
  },
  mutations: {
    SET_DATA (state, event) {
      state.data = event
    },
    SET_CURRENT (state, event) {
      state.current = event
    },
    SET_IS_LOADING (state, event) {
      state.isLoading = event
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
    }
  }
}
