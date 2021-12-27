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
    useOperations: {},
    theme: 'light'
  },
  mutations: {
    SET_THEME(state, theme) {
      state.theme = theme || 'light'
    },
    SET_GAMESTATUS(state, data) {
      state.gameStatus.strike = data.strike || 0
      state.gameStatus.mistakes = data.mistakes || 0
      state.gameStatus.correct = data.correct || 0
    },
    SET_USEOPERATIONS(state, data) {
      if (
        data.addition &&
        data.addition.enabled !== undefined &&
        data.addition.number1from &&
        data.addition.number1to &&
        data.addition.number2from &&
        data.addition.number2to
      ) {
        state.useOperations.addition = data.addition
      } else {
        state.useOperations.addition = {
          enabled: true,
          number1from: 1,
          number1to: 50,
          number2from: 1,
          number2to: 50
        }
      }
      if (
        data.subtraction &&
        data.subtraction.enabled !== undefined &&
        data.subtraction.number1from &&
        data.subtraction.number1to &&
        data.subtraction.number2from &&
        data.subtraction.number2to
      ) {
        state.useOperations.subtraction = data.subtraction
      } else {
        state.useOperations.subtraction = {
          enabled: true,
          number1from: 10,
          number1to: 100,
          number2from: 1,
          number2to: 50
        }
      }
      if (
        data.multiplication &&
        data.multiplication.enabled !== undefined &&
        data.multiplication.number1from &&
        data.multiplication.number1to &&
        data.multiplication.number2from &&
        data.multiplication.number2to
      ) {
        state.useOperations.multiplication = data.multiplication
      } else {
        state.useOperations.multiplication = {
          enabled: true,
          number1from: 1,
          number1to: 12,
          number2from: 1,
          number2to: 12
        }
      }
      if (
        data.division &&
        data.division.enabled !== undefined &&
        data.division.number1from &&
        data.division.number1to &&
        data.division.number2from &&
        data.division.number2to
      ) {
        state.useOperations.division = data.division
      } else {
        state.useOperations.division = {
          enabled: true,
          number1from: 12,
          number1to: 144,
          number2from: 2,
          number2to: 12
        }
      }
    }
  },
  actions: {
    toggleTheme({ state, commit }) {
      if (state.theme === 'light') {
        commit('SET_THEME', 'dark')
      } else {
        commit('SET_THEME', 'light')
      }
    },
    setGameStatus({ commit }, data) {
      commit('SET_GAMESTATUS', data)
    },
    handleRightAnswer({ state, commit }) {
      const gameStatus = {
        strike: state.gameStatus.strike + 1,
        mistakes: state.gameStatus.mistakes,
        correct: state.gameStatus.correct + 1
      }
      commit('SET_GAMESTATUS', gameStatus)
    },
    handleWrongAnswer({ state, commit }) {
      const gameStatus = {
        strike: 0,
        mistakes: state.gameStatus.mistakes + 1,
        correct: state.gameStatus.correct
      }
      commit('SET_GAMESTATUS', gameStatus)
    },
    readSettings({ commit }) {
      const settings = JSON.parse(localStorage.getItem('school-trainer'))
      if (
        settings &&
        Object.keys(settings).length > 0 &&
        settings.use_operations
      ) {
        //console.log(settings.use_operations)
        commit('SET_USEOPERATIONS', settings.use_operations)
      } else {
        commit('SET_USEOPERATIONS', {})
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
