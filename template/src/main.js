{{#if_eq build "runtime"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'
import Pym from 'pym.js'
{{#ressource}}
import VueResource from 'vue-resource'
{{/ressource}}
{{#router}}
import VueRouter from 'vue-router'
import Hello from './components/Hello'
{{/router}}
import App from './App'

{{#ressource}}
Vue.use(VueResource)
{{/ressource}}
{{#router}}
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/fr/hello' },
    { name: 'hello', path: '/:lang/hello', component: Hello }
  ]
})
{{/router}}

/* global window */
/* eslint no-undef: "error" */
window.bus = new Vue()

/* eslint-disable no-new */
new Pym.Child({ polling: 500 })

new Vue({
  {{#router}}
  router,
  {{/router}}
  el: '#app',
  {{#if_eq build "runtime"}}
  render: h => h(App)
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  template: '<App/>',
  components: { App }
  {{/if_eq}}
})
