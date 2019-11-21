<template>
  <div id="app">
    <select v-model="locale" @change="$store.dispatch('i18n/changeLocale',locale)" id="banking_utils-locale">
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
    return {
      locale:"en",
      langs: ['es', 'en','pt'] 
      }
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
<style src="./app.css"></style>
