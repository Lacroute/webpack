{{#if_eq build "runtime"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import Pym from 'pym.js'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{#ressource}}
import VueResource from 'vue-resource'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{/ressource}}
{{#router}}
import VueRouter from 'vue-router'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import Hello from './components/Hello'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{/router}}
import App from './App'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

{{#ressource}}
Vue.use(VueResource)
{{/ressource}}
{{#router}}
Vue.use(VueRouter){{#if_eq lintConfig "airbnb"}};{{/if_eq}}

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/fr/hello' },
    { name: 'hello', path: '/:lang/hello', component: Hello }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
  ]{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
{{/router}}

/* global window */
/* eslint no-undef: "error" */
window.bus = new Vue(){{#if_eq lintConfig "airbnb"}};{{/if_eq}}

/* eslint-disable no-new */
new Pym.Child({ polling: 500 }){{#if_eq lintConfig "airbnb"}};{{/if_eq}}

new Vue({
  {{#router}}
  router,
  {{/router}}
  el: '#app',
  {{#if_eq build "runtime"}}
  render: h => h(App){{#if_eq lintConfig "airbnb"}},{{/if_eq}}
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  template: '<App/>',
  components: { App }{{#if_eq lintConfig "airbnb"}},{{/if_eq}}
  {{/if_eq}}
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
