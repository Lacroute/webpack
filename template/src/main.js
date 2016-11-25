import Vue from 'vue'
import Pym from 'pym.js'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueI18n from 'vue-i18n'
import Hello from './components/Hello'
import Data from './components/Data'
import store from './store'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueI18n)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/fr/hello' },
    { name: 'hello', path: '/:lang/hello', component: Hello },
    { name: 'data', path: '/:lang/data', component: Data },
  ]
})

// Global guards for dynamic translation
router.beforeEach((to, from, next) => {
  if (to.params.lang && to.params.lang != Vue.config.lang){
    try{
      store.dispatch('updateLocale', to.params.lang)
    } catch (error) {
      console.warn(error);
      console.warn(`Reroute to fallback lang: ${Vue.config.fallbackLang}.`);
      next({
        name: to.name,
        params: {
          lang: Vue.config.fallbackLang
        }
      })
    }
  }

  next()
})

/* global window */
/* eslint no-undef: "error" */
Vue.config.fallbackLang = 'fr'
Vue.config.lang = '' // Init to nothing to force update cicle.

/* eslint-disable no-new */
new Pym.Child({ polling: 500 })

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(require('./App'))
})
