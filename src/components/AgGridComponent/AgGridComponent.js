import { AgGridVue } from 'ag-grid-vue'

export default {
  name: 'AgGridVueComponent',
  props: ['displayedDocuments'],
  data: () => {
    return {
      columnDefs: null,
      rowData: null,
      autoGroupColumnDef: null
    }
  },
  components: {
    AgGridVue
  },
  beforeMount () {
    this.gridOptions = {}
    this.columnDefs = [
      { headerName: 'Description', field: 'description', checkboxSelection: true },
      { headerName: 'Customer', field: 'idCustomer' },
      { headerName: 'Customer Name', field: 'customerName' },
      { headerName: 'Reference', field: 'reference' },
      { headerName: 'Date', field: 'createdDate' }
    ]
    this.autoGroupColumnDef = {
      headerName: "Description",
      field: "description",
      width: 200,
      cellRenderer: "agGroupCellRenderer",
      cellRendererParams: { checkbox: true }
    };
  },
  mounted () {
    this.gridApi = this.gridOptions.api
    this.gridColumnApi = this.gridOptions.columnApi
  },
  methods: {
    onGridReady (params) {
      params.api.sizeColumnsToFit()

      params.api.sizeColumnsToFit()
      window.addEventListener('resize', function () {
        setTimeout(function () {
          params.api.sizeColumnsToFit()
        })
      })
    },
    onSelectionChanged() {
      this.$emit('selected-document', {})
    }
  },
  created () {
    this.$store.dispatch('fetchData')
    const rowData = [];  // get the data from our Vuex data store
    this.rowData = Object.freeze(                 // reduce memory footprint - see above
        rowData.map(row => {                      // copy to detach from the stores copy
            return {
                ...row
            }
        })
    )
  }
}
