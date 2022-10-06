import { defineStore } from 'pinia'

export default defineStore('heropy', {
  state: () => ({
    name: 'HEROPY',
    age: 85,
    isValid: false,
    emails: []
  }),
  getters: {
    reversedName() {
      return this.name.split('').reverse().join('')
    }
  },
  actions: {
    reverseName() {
      this.name = this.name.split('').reverse().join('')
      return this.name
    }
  }
})