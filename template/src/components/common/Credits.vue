<template lang="html">
    <transition name="modal">
      <section v-if="show">
        <div class="container-close">
          <button @click="show = !show">
            <s class="UI-icon UI-close-alt"></s>
          </button>
        </div>
        <div class="container">

          <article>
            <h2>\{{ $t('last_update') }}</h2>
            <p>\{{ lastUpdate }}</p>
          </article>

          <article v-if="about">
            <h2>\{{ $t('about') }}</h2>
            <p>\{{ about }}</p>
          </article>

          <article v-if="sources">
            <h2>\{{ $t('sources') }}</h2>
            <p>\{{ sources }}</p>
          </article>

          <article>
            <ul  class="who">
              <li v-for="entry in who">
                <h2>\{{ $t(entry[0]) }}</h2>
                <a :href="twitterUrl(entry[1].username)" target="_blank">
                  \{{ entry[1].name }}
                </a>
              </li>
            </ul>
          </article>

          <article>
            <a href="https://twitter.com/AFPgraphics" target="_blank">
              <s class="UI-icon UI-twitter"></s> Suivre @AFPGraphics sur Twitter
            </a>
          </article>
        </div>
      </section>
    </transition>
</template>

<script>
import eventEmitter from 'Emitter'
import { mapGetters } from 'vuex'

export default {

  data () {
    return {
      show: false
    }
  },

  computed: {
    ...mapGetters({
      commons: 'commons_data_file'
    }),

    lastUpdate () {return this.getByKey('last_update')},
    about      () {return this.getByKey('about')},
    sources    () {return this.getByKey('sources')},
    who        () {return this.getByKey('who')},
  },

  created () {
    eventEmitter.$on('toggle-credits', this.toggle)
  },

  methods: {
    getByKey (key) {
      if (!this.commons.data) return
      let row = this.commons.data.find( row => row.title === key )
      if (!row) return
      if (row.value !== 'nested') return row.value
      row = Object.entries(row).filter( (entry) => {
        entry[0] = entry[0].replace('.', '_')
        let identity = entry[1].split(' @')
        entry[1] = { name: identity[0] }
        entry[1].username = identity[1] === undefined ? null : identity[1]
        return entry[0] !== 'title' && entry[0] !== 'value'
      })

      return row
    },

    twitterUrl (username) {
      if (!username) return
      return 'https://www.twitter.com/' + username
    },

    toggle () {
      this.show = !this.show
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~utils/fonts';
@import '~utils/metas';

section{
  @include themeColors('light');
  display: block;
  position: absolute;
  height: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50px;
  padding: $meta_padding;
  transition: opacity .4s ease;
  z-index: 1;

  .container-close{
    position: relative;

    button{
      @extend %reset-button;
      position: absolute;
      right: 0;
      color: inherit;

      s{
        font-size: $close_size;
        color: $loading_color;
        transition: color .3s ease;
      }
      s:hover{
        color: inherit;
      }
    }
  }

  .container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100%;
  }

  article{
    text-align: left;
    flex: 1;
    display: flex;
    justify-content: center;
    flex-direction: column;
    font-family: $source_sans_pro;
  }

  // Handle the close overlay
  article:first-child{
    margin-right: $close_size + 0.5em;
  }

  h2 {
    margin: 10px 0;
    text-transform: uppercase;
    font-size: 1.2em;
    font-weight: 600;
  }

  p{
    margin: 0
  }

  .who{
    list-style: none;
    margin: 0;
    padding: 0;
    h2, span{
      display: inline-block;
      text-transform: none;
    }
    a[href]{
      text-decoration: underline;
      color: #4099FF;
    }
  }

  a{
    text-decoration: none;
    color: inherit;
  }
}

.modal-enter, .modal-leave-active {
  opacity: 0;
}
</style>
