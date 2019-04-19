<template>
  <div id="app">
    <div class="column">
      <router-view></router-view>
      <!-- <TableComponent />
      <AgGridComponent /> -->
    </div>
  </div>
</template>

<script>
import TableComponent from './components/TableComponent/TableComponent.vue'
import AgGridComponent from './components/AgGridComponent/AgGridComponent.vue'

export default {
  name: 'app',
  components: {
    TableComponent,
    AgGridComponent
  }
}
</script>
<style lang="scss">
  @import "../node_modules/ag-grid-community/dist/styles/ag-grid.css";
  @import "../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css";
</style>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
