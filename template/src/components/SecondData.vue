<template>
  <div class="data">
    <div>
      <h1>\{{ second_data_file.name }}</h1>
      <h2>data</h2>
      <div v-for="row in second_data_file.data">
        <p>empty ! See ~/utils/configStorage to see why.</p>
      </div>
      <span>______________</span>
      <h2>u</h2>
      <div v-for="(value, key) in second_data_file.u">
        <p>
          <span>\{{ key }}</span>: \{{ value }}
        </p>
      </div>
      <span>______________</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "SecondData",

  data () {
    return {
    }
  },

  computed: {
    ...mapGetters({
      // The right parameter is reference to utils/configStorage.js
      second_data_file: 'second_data_file'
    }),
  }
}
</script>

<style lang="scss">
p span{
  font-weight: 600
}
</style>
