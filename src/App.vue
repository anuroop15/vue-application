<template>
  <div id="app">
    <div class="column">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>


export default {
  name: 'app'
}
</script>

<style>
#app, html, body {
    height: 100vh;
    margin: 0;
}
</style>


