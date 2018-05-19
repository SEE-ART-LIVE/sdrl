import Vue from 'vue';
import Router from 'vue-router';
import Index from './components/Index.vue';
import Homepage from './components/Homepage.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage,
    },
    {
      path: '/:event',
      name: 'index',
      component: Index,
    }
  ],
});
