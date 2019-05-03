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
import { Component as Vuedal } from "vuedals";
export default {
  name: 'app',
  components:{
    Vuedal
  },
  data () {
    return { langs: ['es', 'en','pt'] }
  }
}
</script>

<style>
#app, html, body {
    height: 100vh;
    margin: 0;
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


