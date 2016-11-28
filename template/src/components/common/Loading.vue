<template lang="html">
  <transition name="fade">
    <div class="loading" v-if="!isLoaded">
      <div class="container">
        <div class="content">
          <div class="loader-animation">
            <svg class="circular" viewBox="25 25 50 50">
              <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
            </svg>
          </div>
          <h1>{{$t('Loading')}}</h1>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      localesStatus: 'localesStatus',
      dbsStatus: 'dbsStatus',
      isLoaded: 'isLoaded'
    })
  },
}
</script>

<style lang="scss" scoped>
@import '~utils/global';

.loading{
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  display: table;
  background: $loading_bg;
  color: $loading_color;
}

.container{
  display: table-cell;
  vertical-align: middle;

  h1{
    font-family: $source_sans_pro;
    text-transform: uppercase;
    font-size: 0.8em;
  }
}

.loader-animation {
  position: relative;
  margin: 0 auto;
  width: 32px;
  &:before {
    content: '';
    display: block;
    padding-top: 100%;
  }
}

.circular {
  animation: rotate 2s linear infinite;
  height: 100%;
  transform-origin: center center;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.path {
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  animation: dash 1.5s ease-in-out infinite;
  stroke-linecap: round;
  stroke: $loading_color;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
.loading [data-status="LOADED"] { color: green }
.loading [data-status="LOADING"] { color: gold }
.loading [data-status="LOAD_ERROR"] { color: red }
</style>
