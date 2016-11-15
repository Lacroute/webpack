<template lang="html">
  <div class="modal-mask" v-if="tooSmall">
    <div class="modal-wrapper">
      <div class="modal-container">
        <span>Désolé mec mais c'est trop petit la..</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      minWidth: 300,
      windowWidth: 0
    }
  },

  computed: {
    tooSmall () {
      return this.windowWidth < this.minWidth
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

<style lang="css">
  .modal-mask {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-wrapper {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .8);
    width: 100%;
  }

  .modal-container {
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  }
</style>
