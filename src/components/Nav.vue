<template>
    <div v-bind:class="{ 'hide-overlay': this.$store.state.nav }">
      <nav>
          <ul>
            <li v-on:click="showNav()" class="list one"></li>
          </ul>
      </nav>
      <div class="overlay">
          <div class="overlay-content">
              <div id="close" v-on:click="showNav()"><span>close</span></div>
              <ul id="weblist">
              	<li style="background-color: rgb(17, 17, 17);" v-for="(value, key, index) in this.data.arr" v-bind:data="key">
                  <router-link :to="value.link" :key="index" v-on:click.native="showNav()">
                    <p>{{value.title}}</p>
                  </router-link>
                </li>
              </ul>
          </div>
      </div>
    </div>
</template>

<script>
import navItems from '../assets/data/nav.json'
// import store from '../store'

export default {
  name: 'Nav',
  data () {
    return {
      data: {
        arr: navItems,
        isActive: true
      }
    }
  },
  methods: {
    toggleClass () {
      this.data.isActive = !this.data.isActive
    },
    showNav () {
      console.log('showNav')
      this.$store.commit(
        this.$store.state.nav ? 'OPEN_NAV' : 'CLOSE_NAV'
      )
    }
  }
}
</script>

<style lang="scss" scoped>

#weblist {
  margin:0;
}

.overlay {
    z-index: 9999;
}
</style>