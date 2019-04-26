<template>
  <div id="app">
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
  }
}
</script>

<style>
#app, html, body {
    height: 100vh;
    margin: 0;
}
</style>


