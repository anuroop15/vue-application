<template>
  <div class="ag-grid">
    <div style="width: 100%; height: 100%">
              <div style="min-height: 60vh">
                <ag-grid-vue
                   class="ag-theme-balham" id="ag-grid_component"
                   :gridOptions="gridOptions"
                   @grid-ready="onGridReady"
                   @row-selected="onCellClicked"
                   @selection-changed="onSelectionChanged"
                   @column-event="onChange"
                   :columnDefs="gridOptions.columnDef"
                   :rowData="displayedDocuments"
                   :rowSelection="rowSelection"
                   :context="context"
                   :suppressRowClickSelection="true"
                   :frameworkComponents="frameworkComponents"
                   v-model="rowData" />
              </div>
        </div>
  </div>
</template>

<script src="./AgGridComponent.js"></script>
<style src="./AgGridComponent.css"></style>