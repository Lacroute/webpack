<template lang="html">
  <div class="layout">
    <header>
      <ul class="three">
        <li><router-link to="firstdata">FirstData</router-link></li>
        <li><router-link to="seconddata">SecondData</router-link></li>
        <li><router-link to="hello">Hello</router-link></li>
      </ul>
      <div class="lang-selector">
        <select name="language-picker" v-model="lang" v-on:change="test">
          <option value="fr">fr</option>
          <option value="en">en</option>
          <option value="es">es</option>
          <option value="aa">aa</option>
        </select>
      </div>
    </header>

    <section class="body">
      <router-view></router-view>
    </section>

    <footer>

    </footer>

  </div>
</template>

<script>
import Hello from 'components/Hello'

export default {
  name: 'Layout',

  components: {
    Hello,
  },

  data () {
    return {
      lang: this.$route.params.lang
    }
  },

  methods: {
    test () {
      this.$router.push({ name: this.$route.name, params: { lang: this.lang }})
    }
  }
}
</script>

<style lang="scss" scoped>
.layout{
  padding: 60px 0 20px;
}

section.body{
  margin-top: 40px
}

.three {
  list-style: none;
  margin: 0 10px;
  padding: 0;
  display: inline-block;

  li {
    display: inline-block;
  }

  li + li {
    margin-left: 10px;
  }

}
.lang-selector{
  display: inline-block;
}
</style>
