import { AgGridVue } from 'ag-grid-vue'

export default {
  name: 'AgGridVueComponent',
  data: () => {
    return {
      columnDefs: null,
      rowData: null
    }
  },
  components: {
    AgGridVue
  },
  beforeMount () {
    this.gridOptions = {}
    this.columnDefs = [
      { headerName: 'Description', field: 'description', checkboxSelection: true },
      { headerName: 'Customer', field: 'customer' },
      { headerName: 'Customer Name', field: 'customerName' },
      { headerName: 'Reference', field: 'reference' },
      { headerName: 'Date', field: 'createdDate' }
    ]

    this.rowData = [
      {
        'accepted': false,
        'createdDate': '2019-04-09T17:32:31',
        'customerName': '***33 - ESCAPA ALFONSO',
        'description': 'PURCHASE OF 27 OF FREEPORT-MCMORAN INC',
        'idCompany': 'US0010001',
        'idCompanyCustomer': 'US0010001_17033',
        'idCustomer': '17033',
        'idDocTrack': 'DT1909200069',
        'idDocument': 696775,
        'reference': 'SCTRSC1205900100.6325455228-8',
        'seen': false,
        'status': 'SIGNED'
      },
      {
        'accepted': false,
        'createdDate': '2019-04-09T17:32:26',
        'customerName': '***33 - ESCAPA ALFONSO',
        'description': 'PURCHASE OF 15100 OF US TREAS NT 0.25 31MAY14 S AM-2014',
        'idCompany': 'US0010001',
        'idCompanyCustomer': 'US0010001_17033',
        'idCustomer': '17033',
        'idDocTrack': 'DT1909200067',
        'idDocument': 696773,
        'reference': 'SCTRSC1215200156.41795-4',
        'seen': false,
        'status': 'SIGNED'
      }]
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
    }
  },
  created () {
    this.rowData = this.$store.dispatch('fetchData')
  },
  computed: {
    users () {
      return this.$store.state.signatureDocs.data
    }
  }
}
