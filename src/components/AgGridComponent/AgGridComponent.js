import { AgGridVue } from 'ag-grid-vue'
import {en, es, pt } from './i18n'
import _ from 'lodash'

const addLink = method => (params) => {
  let link = document.createElement("a")
  link.href = '#'
  link.className ='ag-grid-component_link'
  link.innerText = params.value
  link.addEventListener("click", e => {
    e.preventDefault()
    method(params)
  });
  return link
}

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
      domLayout:null,
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
    this.gridOptions = {
      columnDefs: this.gridColumnDefs,
      rowHeight: 40,
      headerHeight: 50
    }
    this.minHeight = 100
    this.gridOptions.columnDefs[1].cellRenderer = addLink(this.customerIdSelectedToView)
    this.gridOptions.columnDefs[0].cellRenderer = addLink(this.documentSelectedToView)
    this.rowSelection = 'multiple'
    this.domLayout = 'autoHeight'
  },
  mounted () {
    this.gridApi = this.gridOptions.api
    this.gridColumnApi = this.gridOptions.columnApi
  },
  watch: {
    "$store.state.i18n.locale":"onLocaleRefreshColDef",
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
    onLocaleRefreshColDef(){
      let columnDefs = this.gridColumnDefs;
      columnDefs[1].cellRenderer = addLink(this.customerIdSelectedToView);
      columnDefs[0].cellRenderer = addLink(this.documentSelectedToView);

      this.gridOptions.api.setColumnDefs(columnDefs);
      this.gridOptions.api.sizeColumnsToFit()
      this.gridOptions.api.refreshHeader();
    },
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
        if ( data === 'viewed') {
          params.node.viewed = true
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