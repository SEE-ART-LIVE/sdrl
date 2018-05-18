import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

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

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
