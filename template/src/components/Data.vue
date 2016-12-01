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
      // The right parameter is reference to utils/configStorage.js
      first_data_file: 'first_data_file'
    }),
  }
}
</script>

<style lang="scss">
</style>
