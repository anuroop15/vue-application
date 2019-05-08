<template>
  <div id="app">
    <select v-model="$i18n.locale">
      <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{ lang }}</option>
    </select>
    <router-view :key="$route.fullPath" />
    <vuedal></vuedal>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import { Component as Vuedal } from "vuedals";
export default {
  sync:true,
  name: 'app',
  components:{
    Vuedal
  },
  props:{
    lang:{
      type: String
    }
  },
  data () {
    return { langs: ['es', 'en','pt'] }
  },
  methods:{
    onChangeLocale(locale){
      this.$i18n.locale = locale;
    }
  },
   computed: {
    ...mapState(["i18n"])
  },
  watch:{
    "i18n.locale":"onChangeLocale"
  }
}
</script>

<style>
@font-face {
  font-family: 'OpenSans-Regular';
  src:  url('./assets/fonts/OpenSans-Regular.ttf') format('truetype');
}
@font-face {
  font-family: 'OpenSans-Light';
  src:  url('./assets/fonts/OpenSans-Light.ttf') format('truetype');
}
@font-face {
  font-family: 'OpenSans-SemiBold';
  src:  url('./assets/fonts/OpenSans-SemiBold.ttf') format('truetype');
}
@font-face {
  font-family: 'OpenSans-Bold';
  src:  url('./assets/fonts/OpenSans-Bold.ttf') format('truetype');
}
#app, html, body {
    height: 100vh;
    margin: 0;
    font-family: OpenSans-Regular, sans-serif;
}
.vuedal {
  padding: 0px;
}
.vuedal header {
  padding: 20px;
  color: #fff;
  background-color: rgb(87, 108, 129);
}
.vuedal header span {
  color: #fff;
}
.vuedal .close:not(:disabled):not(.disabled):hover,
.vuedal .close:not(:disabled):not(.disabled):focus {
  color: #fff;
}
.vuedal header ~ p,
.vuedal header ~ h6,
.vuedal header ~ div {
  padding: 20px;
}
@media (max-width: 850px){
  .vuedal.lg {
    width: 650px;
  }
  .vuedal.xl {
    width: 650px;
  }
}

@media (max-width: 650px){
  .vuedal.md {
    width: 550px;
  }
    .vuedal.lg {
    width: 550px;
  }
  .vuedal.xl {
    width: 550px;
  }
}
@media (max-width: 550px){
  .vuedal.md {
    width: 400px;
  }
    .vuedal.lg {
    width: 400px;
  }
  .vuedal.xl {
    width: 400px;
  }
}
@media (max-width: 400px){
  .vuedal.sm {
     width: 350px
  }
  .vuedal.md {
    width: 350px;
  }
    .vuedal.lg {
    width: 350px;
  }
  .vuedal.xl {
    width: 350px;
  }
}

</style>
