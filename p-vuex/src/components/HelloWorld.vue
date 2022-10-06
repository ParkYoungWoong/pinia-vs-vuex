<template>
  <h1>{{ name }}</h1>
  <h2>{{ age }}</h2>
  <h3>{{ reversedName }}</h3>
  <button @click="reverseName">REVERSE!</button>
  <button @click="resetStore">RESET!</button>
  <button @click="getYounger">GET YOUNGER!</button>
</template>

<script>
import { watch } from 'vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('heropy', [
      'name',
      'age',
    ]),
    ...mapGetters('heropy', [
      'reversedName'
    ])
    // name() {
    //   return this.$store.state.heropy.name
    // },
    // age() {
    //   return this.$store.state.heropy.age
    // },
    // reversedName() {
    //   return this.$store.getters['heropy/reversedName']
    // }
  },
  watch: {
    age(newValue, oldValue) {
      console.log('watch option:', newValue, oldValue)
    }
  },
  created() {
    watch(
      () => this.$store.state.heropy.age, // target
      (newValue, oldValue) => { // callback
        console.log('watch fn:', newValue, oldValue)
      }
    )
  },
  methods: {
    // ...mapMutations('heropy', [
    //   'setState'
    // ]),
    // ...mapActions('heropy', [
    //   'reverseName'
    // ]),
    async reverseName() {
      const res = await this.$store.dispatch('heropy/reverseName')
      console.log(res)
    },
    resetStore() {
      this.$store.commit('heropy/resetStore')
    },
    getYounger() {
      // 단일
      this.$store.commit('heropy/setState', {
        age: 22
      })
      // 다중
      this.$store.commit('heropy/setState', {
        name: 'YoungWoong',
        age: 22
      })
      // ...?
      // this.$store.commit('heropy/setState', {
      //   emails: [...this.$store.state.heropy.emails, 'thesecon@gmail.com']
      // })
      // this.$store.commit('heropy/setState', {
      //   isValid: this.$store.state.heropy.emails.length > 0
      // })
      this.$store.commit('heropy/pushEmails', [
        'thesecon@gmail.com'
      ])
      console.log(this.$store.state.heropy)
    }
  }
}
</script>