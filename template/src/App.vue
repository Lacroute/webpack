<template>
  <div id="app">
    <loading></loading>
    <div class="">
      <router-link to="data">Data</router-link>
      <router-link to="hello">Hello</router-link>
    </div>
    <div class="lang-selector">
      <router-link :to="{name: $route.name, params: {lang: 'fr'}}">
        fr
      </router-link>
      <router-link :to="{name: $route.name, params: {lang: 'en'}}">
        en
      </router-link>
      <router-link :to="{name: $route.name, params: {lang: 'es'}}">
        es
      </router-link>
      <router-link :to="{name: $route.name, params: {lang: 'nimp'}}">
        nimp
      </router-link>
    </div>
    <img src="~assets/img/logo.png">
    <router-view></router-view>
    <modal></modal>
    <logo></logo>
  </div>
</template>

<script>
import Hello from './components/Hello'
import Logo from './components/common/Logo'
import Modal from './components/common/Modal'
import Loading from './components/common/Loading'

export default {
  name: 'app',

  components: {
    Hello,
    Logo,
    Modal,
    Loading
  },

  created () {
    // this.$store.dispatch('fetchLocale')
  },
}
</script>

<style src="normalize.css"></style>
<style lang="scss">
  @import '~utils/global';

  #app {
    font-family: $source_sans_pro;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .lang-selector a + a{
    margin-left: 10px
  }
</style>
