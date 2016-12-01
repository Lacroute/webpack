<template>
  <div id="app">
    <layout></layout>
  </div>
</template>

<script>
import Layout from 'components/Layout'

export default {
  name: 'app',

  components: {
    Layout
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
</style>
