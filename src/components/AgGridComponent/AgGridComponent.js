import { AgGridVue } from 'ag-grid-vue'

export default {
  name: 'AgGridVueComponent',
  props: ['displayedDocuments', 'gridColumnDefs'],
  data: () => {
    return {
      columnDefs: null,
      rowData: null,
      rowSelection: null,
      enableCheckBox: false
    }
  },
  components: {
    AgGridVue
  },
  beforeMount () {
    this.gridOptions = {
      columnDefs: this.gridColumnDefs
    }
    this.gridOptions.columnDefs[0].cellRenderer = (params) => {
        let link = document.createElement("a")
        link.href = '#'
        link.innerText = params.value
        link.addEventListener("click", e => {
          e.preventDefault()
          this.documentSelectedToView(params)
        });
        return link
    }
    this.rowSelection = 'multiple'
  },
  mounted () {
    this.gridApi = this.gridOptions.api
    this.gridColumnApi = this.gridOptions.columnApi
  },
  methods: {
    onGridReady (params) {
      params.api.sizeColumnsToFit()
      window.addEventListener('resize', function () {
        setTimeout(function () {
          params.api.sizeColumnsToFit()
        })
      })
    },
    documentSelectedToView(params) {
      params.eGridCell.classList.add('ag-cell-viewed')
      const emitPromise = new Promise((resolve, reject) => {
        this.$emit('document-viewed', params.data, resolve, reject)
      })
      emitPromise.then(data => {
        if (data === 'selected') {
          params.node.setSelected(true)
        }
      })
    },
    onCellClicked(params) {
      console.log('cell')
    },
    onSelectionChanged(params) {
      this.enableCheckBox = true
      let selectedRowDetails = params.api.getSelectedNodes()
      if (selectedRowDetails.length > 0) {
        this.$emit('selected-document', selectedRowDetails[0].data)
      } else {
        this.$emit('selected-document', null)
      }
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