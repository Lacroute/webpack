<template lang="html">
  <div class="loading">
    <div class="container">

      <div class="locales" :data-status="localesStatus">
        <div v-if="localesStatus">
          <span>Locales {{ localesStatus }}</span>
        </div>
        <div v-else>
          <span>Locales not required</span>
        </div>
      </div>

      <div class="datas" :data-status="dbsStatus">
        <div v-if="dbsStatus">
          <span>DBs {{ dbsStatus }}</span>
        </div>
        <div v-else>
          <span>DBs not required</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      localesStatus: 'localesStatus',
      dbsStatus: 'dbsStatus'
    }),
  },
}
</script>

<style lang="css" scoped>
.loading{
  position: absolute;
  right: 0;
}
.container{
  padding: 12px;
  position: relative;
  z-index: 9999;
}
.loading [data-status="LOADED"] { color: green }
.loading [data-status="LOADING"] { color: gold }
.loading [data-status="LOAD_ERROR"] { color: red }
</style>
