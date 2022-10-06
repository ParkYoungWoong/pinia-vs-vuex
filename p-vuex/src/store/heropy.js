const defaultState = {
  name: 'HEROPY',
  age: 85,
  isValid: false,
  emails: []
}

export default {
  namespaced: true,
  state: () => ({
    // Deep copy!
    ...defaultState
  }),
  getters: {
    reversedName(state) {
      return state.name.split('').reverse().join('')
    }
  },
  mutations: {
    setState(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    resetStore(state) {
      Object.keys(defaultState).forEach(key => {
        state[key] = defaultState[key]
      })  
    },
    pushEmails(state, payload) {
      state.emails.push(...payload)
      state.isValid = state.emails.length > 0
    }
  },
  actions: {
    reverseName({ state, commit }) {
      commit('setState', {
        name: state.name.split('').reverse().join('')
      })
      return state.name
    }
  }
}