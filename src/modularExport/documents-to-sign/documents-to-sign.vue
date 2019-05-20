<template>
  <div id="documentsToSign">
    <SignatureDocs/>
    <vuedal></vuedal>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import { Component as Vuedal } from "vuedals";
import SignatureDocs from '../../views/signatureDocs/SignatureDocs.vue'
export default {
  name: 'documentsToSign',
  components:{
    SignatureDocs,
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


