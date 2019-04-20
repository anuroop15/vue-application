<template>
  <div>
    <h1>Fund Transfer</h1>
    <p>{{fundsTransfers.data.identifier}}</p>
    <p>{{getNumRows}}</p>
    <p>current</p>
    <div style="height:100%;">
      <div style="display: flex; flex-direction: row">
        <div style=" overflow: hidden; flex-grow: 1">
          <ag-grid-vue
            style="width: 100%; height: 600px;"
            class="ag-theme-balham"
            :columnDefs="getTableCol"
            :rowData="getTableData"
            :rowSelection="rowSelection"
            @grid-ready="onGridReady"
            @selection-changed="onSelectionChanged"
          ></ag-grid-vue>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./FundsTransfers.js"></script>
<style scoped src="./FundsTransfers.css"></style>


