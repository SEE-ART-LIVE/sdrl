<template>
  <div id="app" class="Prose">
    <div v-if="this.$store.getters.loading" id="load-component"><div class="parent"><div class="child">Loading ...</div></div></div>
  	<Nav v-if="!this.$store.getters.loading" v-cloak></Nav>
    <main>
      <router-view v-if="!this.$store.getters.loading" :arr="this.$store.state.site" v-cloak></router-view>
    </main>
  </div>
</template>

<script>
import store from './store'

export default {
  name: 'app',
  props: ['arr'],
  created () {
    store.dispatch('LOAD_DATA', this.$route)
  }
}
</script>

<style lang="scss"></style>
