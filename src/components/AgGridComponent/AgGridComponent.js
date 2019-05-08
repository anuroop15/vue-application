import { AgGridVue } from 'ag-grid-vue'
import {en, es, pt } from './i18n'
import _ from 'lodash'


export default {
  name: 'AgGridVueComponent',
  props: [
    'displayedDocuments',
    'gridColumnDefs',
    'selectedAllView',
    'documentsToSign'
  ],
  data: () => {
    return {
      columnDefs: null,
      rowData: null,
      rowSelection: null,
      enableCheckBox: false
    }
  },
  i18n:{
    messages:{
        en,
        es,
        pt
    }
  },
  components: {
    AgGridVue
  },
  beforeMount () {
    const i18nColumnDefs = _.map(this.gridColumnDefs, (obj) => {
      if(obj.headerName) {
        obj['headerName'] = this.$t(obj.headerName)
      }
      return obj
    })
    this.gridOptions = {
      columnDefs: i18nColumnDefs,
      rowHeight: 40,
      headerHeight: 50
    }
    this.gridOptions.columnDefs[1].cellRenderer = (params) => {
        let link = document.createElement("a")
        link.href = '#'
        link.innerText = params.value
        link.addEventListener("click", e => {
          e.preventDefault()
          this.customerIdSelectedToView(params)
        });
        return link
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
  watch: {
    displayedDocuments() {
      this.gridOptions.api.sizeColumnsToFit()
    },
    selectedAllView () {
      this.gridOptions.api.forEachNode(node => {
        if(node.viewed === true) {
          node.setSelected(true)
        }
      })
    }
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
      params.node.viewed = true
      const emitPromise = new Promise((resolve, reject) => {
        this.$emit('document-viewed', params.data, resolve, reject)
      })
      emitPromise.then(data => {
        if (data === 'selected') {
          params.node.setSelected(true)
        }
      })
    },
    customerIdSelectedToView(params) {
      params.eGridCell.classList.add('ag-cell-viewed')
      this.$emit('customer-selected', params.data)
    },
    onCellClicked(params) {
      console.log('cell')
    },
    onSelectionChanged(params) {
      this.enableCheckBox = true
      let selectedRowDetails = params.api.getSelectedNodes()
      if (selectedRowDetails.length > 0) {
        const selectedRows = _.map(selectedRowDetails, (row) => {
          return row.data
        })
        this.$emit('selected-document', selectedRows)
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
