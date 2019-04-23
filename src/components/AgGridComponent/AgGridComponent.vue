<template>
  <div class="ag-grid">
    <div style="width: 100%; height: 100%">
            <div style="display: flex; flex-direction: row">
              <div style=" overflow: hidden; flex-grow: 2">
                <ag-grid-vue style="width: 100%; height: 215px;"
                   class="ag-theme-balham" id="myGrid"
                   :gridOptions="gridOptions"
                   @grid-ready="onGridReady"
                    @selection-changed="onSelectionChanged"
                   :columnDefs="columnDefs"
                   :rowData="displayedDocuments"
                   v-model="rowData">
                </ag-grid-vue>
              </div>
            </div>
        </div>
  </div>
</template>

<script src="./AgGridComponent.js"></script>
<style src="./AgGridComponent.css"></style>
