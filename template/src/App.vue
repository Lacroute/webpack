<template>
  <div id="app">
    <img src="./assets/logo.png">
    {{#router}}
    <router-view></router-view>
    {{/router}}
    <modal></modal>
    <logo></logo>
  </div>
</template>

<script>
import Hello from './components/Hello'
import Logo from './components/common/Logo'
import Modal from './components/common/Modal'

export default {
  name: 'app',
  components: {
    Hello,
    Logo,
    Modal
  }
}
</script>

<style src="normalize.css"></style>
<style {{#if_eq cssPreprocessorConfig "sass"}}lang="sass"{{/if_eq}}{{#if_eq cssPreprocessorConfig "scss"}}lang="scss"{{/if_eq}}>

  {{#if_eq cssPreprocessorConfig "scss"}}
  @import 'fonts';
  #app {
    font-family: $source_sans_pro;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  {{/if_eq}}
  {{#if_eq cssPreprocessorConfig "sass"}}
  @import fonts
  #app
    font-family: $source_sans_pro
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    color: #2c3e50
    margin-top: 60px
  {{/if_eq}}
</style>
