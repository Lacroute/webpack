<template>
  <div id="app">
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
    <meta-container></meta-container>
  </div>
</template>

<script>
import Hello from 'components/Hello'
import MetaContainer from 'components/common/MetaContainer'

export default {
  name: 'app',

  components: {
    Hello,
    MetaContainer
  }
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
    position: relative;
    min-height: 618px;
  }

  .lang-selector a + a{
    margin-left: 10px
  }
</style>
