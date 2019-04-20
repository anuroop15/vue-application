<template>
  <div id="app">
    <TableDemo msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import TableDemo from '../../components/TableDemo/TableDemo.vue'

export default {
  name: 'app',
  components: {
    TableDemo
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
