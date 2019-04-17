<template>
  <div id="app">
    <div class="column">
      <router-view></router-view>
      <TableComponent />
    </div>
  </div>
</template>

<script>
import TableComponent from './components/TableComponent/TableComponent.vue'
export default {
  name: 'app',
  components: {
    TableComponent
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
