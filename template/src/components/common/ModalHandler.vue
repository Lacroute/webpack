<template lang="html">
  <div class="modal-handler" :style="{minWidth: minWidth + 'px'}">

    <!-- Splash screen during loading -->
    <modal v-if="!isLoaded">
        <div slot="header" class="loader-animation">
          <svg class="circular" viewBox="25 25 50 50">
            <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
          </svg>
        </div>
      <h2 slot="body">\{{ $t('loading') }}</h2>
    </modal>

    <!-- Splash screen when it's too small -->
    <modal v-if="tooSmall">
      <h1 slot="header">\{{ $t('warn_too_small') }}</h1>
      <h1 slot="body">\{{ $t('warn_too_small_tips') }}</h1>
    </modal>

    <!-- Splash screen when it's an outdated browser -->
    <modal v-if="tooOld">
      <h1 slot="header">\{{ $t('warn_obsolete') }}</h1>
      <h1 slot="body">\{{ $t('warn_obsolete_tips') }}</h1>
    </modal>

  </div>
</template>

<script>
import Modal from 'components/common/Modal'
import { mapGetters } from 'vuex'

export default {
  name: 'ModalHandler',

  components: {
    Modal
  },

  data () {
    return {
      minWidth: 300,
      windowWidth: 0
    }
  },

  computed: {
    ...mapGetters({
      isLoaded: 'isLoaded'
    }),

    tooSmall () {
      return this.windowWidth < this.minWidth
    },

    tooOld () {
      return false
    }
  },

  mounted () {
    this.$nextTick(function() {
      window.addEventListener('resize', this.getWindowWidth);
      this.getWindowWidth()
    })

  },

  methods: {
    getWindowWidth(event) {
      this.windowWidth = document.documentElement.clientWidth;
    }
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.getWindowWidth);
  }
}
</script>

<style lang="scss">

</style>
