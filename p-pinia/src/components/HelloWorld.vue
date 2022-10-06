<template>
  <h1>{{ heropyStore.name }}</h1>
  <h2>{{ heropyStore.age }}</h2>
  <h3>{{ heropyStore.reversedName }}</h3>
  <button @click="reverseName">REVERSE!</button>
  <button @click="resetStore">RESET!</button>
  <button @click="getYounger">GET YOUNGER!</button>
</template>

<script>
import { watch } from 'vue'
import { mapState, mapActions, mapStores } from 'pinia'
import useHeropyStore from '../store/heropy.js'

export default {
  computed: {
    ...mapState(useHeropyStore, [
      'name',
      'age',
      'reversedName'
    ]),
    ...mapStores(useHeropyStore)
  },
  watch: {
    age(newValue, oldValue) {
      console.log('watch option:', newValue, oldValue)
    }
  },
  created() {
    watch(
      () => this.heropyStore.age, // target
      (newValue, oldValue) => { // callback
        console.log('watch fn:', newValue, oldValue)
      }
    )
  },
  methods: {
    // ...mapActions(useHeropyStore, [
    //   'reverseName'
    // ]),
    reverseName() {
      const res = this.heropyStore.reverseName()
      console.log(res)
    },
    resetStore() {
      this.heropyStore.$reset()
    },
    getYounger() {
      // 단일
      this.heropyStore.age = 22
      this.heropyStore.$state.age = 22
      // 다중
      this.heropyStore.$patch({
        name: 'YoungWoong',
        age: 22,
      })
      // 콜백
      this.heropyStore.$patch(state => {
        state.emails.push('thesecon@gmail.com')
        state.isValid = state.emails.length > 0
      })
      console.log(this.heropyStore.$state)
    }
  }
}
</script>