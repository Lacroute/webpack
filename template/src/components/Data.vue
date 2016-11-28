<template>
  <div class="">
    <div>
      <h1>\{{ first_data_file.name }}</h1>
      <div v-for="row in first_data_file.data">
        <p>
          \{{ row.title }}: \{{ row.name}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "Data",

  data () {
    return {
    }
  },

  computed: {
    ...mapGetters({
      first_data_file: 'first_data_file'
    }),
  }
}
</script>

<style {{#if cssPreprocessor}}{{#if_eq cssPreprocessorConfig "scss"}}lang="scss"{{/if_eq}}{{#if_eq cssPreprocessorConfig "sass"}}lang="sass"{{/if_eq}}{{/if}}>
</style>
