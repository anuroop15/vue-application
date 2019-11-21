<template>
  <div id="bankingSecurityPre">
    <SecurityPreferences/>
    <vuedal></vuedal>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import { Component as Vuedal } from "vuedals";
import SecurityPreferences from '../../views/SecurityPreferences/SecurityPreferences.vue'
export default {
  name: 'bankingSecurityPre',
  components:{
    SecurityPreferences,
    Vuedal
  },
   props:{
    lang:{
      type: String
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

<style src="../../app.css"></style>


