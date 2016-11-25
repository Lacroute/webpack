<template>
  <div class="">
    <div>
      <h1>{{ first_data_file.name }}</h1>
      <div v-for="row in first_data_file.data">
        <p>
          {{ row.title }}: {{ row.name}}
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
      testD : null
    }
  },

  computed: {
    ...mapGetters({
      first_data_file: 'first_data_file'
    }),
  }
}
</script>

<style lang="css">
</style>
