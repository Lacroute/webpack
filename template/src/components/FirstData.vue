<template>
  <div class="">
    <div>
      <h1>\{{ first_data_file.name }}</h1>
      <h2>data</h2>
      <div v-for="row in first_data_file.data">
        <p>
          <span>\{{ row.title }}</span>: \{{ row.name}}
        </p>
      </div>
      <span>______________</span>
      <h2>u</h2>
      <div v-for="(value, key) in first_data_file.u">
        <p>empty ! See ~/utils/configStorage to see why.</p>
      </div>
      <span>______________</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "FirstData",

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
