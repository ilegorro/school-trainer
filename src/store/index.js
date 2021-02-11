import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    gameStatus: {
      strike: 0,
      mistakes: 0,
      correct: 0
    },
    useOperations: {
      addition: true,
      subtraction: true,
      multiplication: true
    }
  },
  mutations: {
    SET_GAMESTATUS(state, data) {
      state.gameStatus.strike = data.strike || 0
      state.gameStatus.mistakes = data.mistakes || 0
      state.gameStatus.correct = data.correct || 0
    },
    SET_USEOPERATIONS(state, data) {
      state.useOperations.addition = !!data.addition
      state.useOperations.subtraction = !!data.subtraction
      state.useOperations.multiplication = !!data.multiplication
    }
  },
  actions: {
    setGameStatus({ commit }, data) {
      commit('SET_GAMESTATUS', data)
    },
    readSettings({ commit }) {
      const settings = JSON.parse(localStorage.getItem('school-trainer'))
      if (Object.keys(settings).length > 0 && settings.use_operations) {
        commit('SET_USEOPERATIONS', settings.use_operations)
      }
    },
    saveSettings({ commit }, data) {
      commit('SET_USEOPERATIONS', data)
      const settings = {
        use_operations: data
      }
      localStorage.setItem('school-trainer', JSON.stringify(settings))
    }
  },
  modules: {}
})
