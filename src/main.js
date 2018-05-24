import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import * as VueGoogleMaps from 'vue2-google-maps'
import Nav from './components/Nav'

Vue.component('Nav', Nav)
Vue.config.productionTip = false;

 
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAlHvh0ljHzcWVEh151SsW9wmc53WlCxz0',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
 
    //// If you want to set the version, you can do so:
    // v: '3.26',
  },
 
  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,
 
  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then disable the following:
  // installComponents: true,
})

require('./assets/scss/main.scss');
require('./assets/scss/main.scss')
require('../node_modules/basscss-typography/index.css')
require('../node_modules/basscss-typography/css/typography.css')
require('../node_modules/basscss-type-scale/index.css')
require('../node_modules/basscss-type-scale/css/type-scale.css')
require('../node_modules/basscss-padding/index.css')
require('../node_modules/basscss-padding/css/padding.css')
require('../node_modules/basscss-margin/index.css')
require('../node_modules/basscss-margin/css/margin.css')



new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
