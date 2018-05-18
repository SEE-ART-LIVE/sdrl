<template>
<div id="app">
  <div v-if="this.$store.getters.loading" id="load-component" :class="{ 'fadeout' : !this.$store.getters.loading }">
    <!-- <img :src="require('@/assets/gg_lockup_v3@3x.svg')">-->
  </div>
  <router-view v-if="!this.$store.getters.loading" :arr="this.$store.state.site" v-cloak>
  </router-view>
</div>
</template>

<script>
import store from './router/store'

export default {
  name: 'app',
  props: ['arr'],
  created () {
    store.dispatch('LOAD_DATA', this.$route)
  }
}
</script>

<style>
#app {
}
[v-cloak] {
  display: none;
}
</style>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
