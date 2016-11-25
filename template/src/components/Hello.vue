<template>
  <div class="hello">
    <h1>\{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem Installed</h2>
    <ul>
      {{#router}}
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      {{/router}}
      {{#resource}}
      <li><a href="https://github.com/pagekit/vue-resource" target="_blank">vue-resource</a></li>
      {{/resource}}
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/nprapps/pym.js/">Pym</a></li>
      <br>
      {{#if_eq lintConfig "standard"}}
      <li><a href="https://github.com/feross/standard">lint standard</a></li>
      {{/if_eq}}
      {{#unit}}
      <li><a href="https://github.com/karma-runner/karma">Karma</a></li>
      <li><a href="https://github.com/mochajs/mocha">Mocha</a></li>
      {{/unit}}
      {{#e2e}}
      <li><a href="https://github.com/nightwatchjs/nightwatch">Nightwatch</a></li>
      {{/e2e}}
    </ul>
    <h2>Go further</h2>
    <ul>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
