<template>
  <div class="hello">
    <h1>\{{ $t("hello") }}</h1>
    <h2>\{{ $t("links") }}</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">\{{ $t("core_docs" )}}</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">\{{ $t("template_docs") }}</a></li>
    </ul>
    <h2>\{{ $t("installed") }}</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/nprapps/pym.js/">Pym</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <br>
    </ul>
    <h2>\{{ $t("further") }}</h2>
    <ul>
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
  },

  mounted () {

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
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
