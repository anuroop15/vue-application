import { AgGridVue } from 'ag-grid-vue'

export default {
  name: 'AgGridVueComponent',
  props: ['displayedDocuments', 'gridColumnDefs'],
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
    this.gridOptions = {
      columnDefs: this.gridColumnDefs
    }
    this.autoGroupColumnDef = {
      headerName: "Description",
      field: "description",
      cellRenderer: (params) => {
        const route = {
          name: "route-name",
          params: { id: params.value }
        };

        const link = document.createElement("a");
        link.href = this.$router.resolve(route).href;
        link.innerText = params.value;
        link.addEventListener("click", e => {
          e.preventDefault();
          this.$router.push(route);
        });
        return link;
      },
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
      window.addEventListener('resize', function () {
        setTimeout(function () {
          params.api.sizeColumnsToFit()
        })
      })
    },
    onCellClicked(params) {
      console.log('cell')
    },
    onSelectionChanged(params) {
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