import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isPreloading: false,
    site: [],
    isFav: [],
    cards: [],
    favButton: true,
    showNotifications: false,
    transitioning_in: false,
    transitioning_out: false,
    loaded: true,
    currProject: {},
    index: null
  },
  mutations: {
    REPLACE_QUERYDATA (state, data) {
      state.site = data
      return state
    },
    SET_PROJECT (state, data) {
      state.currProject = data
      return state
    },
    beginPreload (state) {
      state.isPreloading = true
    },
    endPreload (state) {
      state.isPreloading = false
    },
    SET_LOADED (state, loaded) {
      // console.log('loaded' + loaded)
      state.loaded = loaded || false
    },
    OPEN_NOTIFICATIONS: function (state) {
      state.showNotifications = true
    },
    CLOSE_NOTIFICATIONS: function (state) {
      state.showNotifications = false
    },
    SET_TRANSITIONING_IN (state, transitioning) {
      state.transitioning_in = transitioning
      return state
    },
    SET_TRANSITIONING_OUT (state, transitioning) {
      state.transitioning_out = transitioning
      return state
    }
  },
  actions: {
    beginPreload: ({ commit }) => commit('beginPreload'),
    endPreload: ({ commit }) => commit('endPreload'),
    favButton: function ({ commit }, value) {
      state.favButton = value
    },
    LOAD_DATA (context, payload) {
      // let url = 'http://localhost/data/wp-json/wp/v2/project'
      let url = 'http://gettylabs.org/wp-dashboard/?rest_route=/wp/v2/project'
      context.commit('SET_LOADED', false)
      // console.log(context, payload)
      axios
        .get(url)
        .then(function (response) {
          let data = response.data
  
          if (!(Object.keys(payload.params).length === 0 && payload.params.constructor === Object)) {
            if (payload.params.list) {
              data = data.filter(function (project) {
                let list = []
                if (project.acf.list.length > 0) {
                  for (var i = project.acf.list.length - 1; i >= 0; i--) {
                    if (project.acf.list[i].slug === payload.params.list) {
                      list.push(project.acf.list[i].slug)
                    }
                  }
                }
                // Find Projects in lists if there are any
                return list.indexOf(payload.params.list) !== -1
              })
            }
          }
  
          data = data.filter(function (project) {
            // Find Projects with empty titles
            return project.title.rendered !== ''
          })
  
          data = data.filter(function (project) {
            // Find Projects with empty descriptions
            return project.content.rendered !== ''
          })
  
          data = data.filter(function (project) {
            // Find Projects with empty percent completed
            return project.acf.percent_complete !== ''
          })
  
          for (var i = data.length - 1; i >= 0; i--) {
            // Add extra items to object
            let url = data[i].title.rendered.toString().trim()
            url = url.toLowerCase().replace(/[^\w\s]/gi, '').replace(/ /g, '-')
            data[i]['url'] = url
            data[i]['index'] = i
          }
  
          context.commit('REPLACE_QUERYDATA', data)
          context.commit('SET_LOADED', true)
          return response.data
        })
        .catch(function (error) {
          return error
        })
    },
    LOAD_PROJECT: function (context, payload) {
      // console.log(payload)
      context.commit('SET_PROJECT', payload)
    },
    cards: function ({ commit }, value) {
      state.cards = value
    },
    index: function ({ commit }, value) {
      state.index = value
    },
    faved: function ({ commit }, value) {
      let index = state.isFav.indexOf(value)
      if (index === -1) {
        state.isFav.push(value)
      } else {
        state.isFav.splice(index, 1)
      }
    }
  }, 
  getters: {
    loading: state => !state.loaded,
    isPreloading: state => state.isPreloading,
    isfaved: state => state.isFav,
    cards: state => state.cards,
    index: state => state.index,
    favButton: state => state.favButton
  }
});
