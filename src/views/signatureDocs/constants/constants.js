import moment from 'moment'
export const GridColumnDefsPending = [
  { headerName: 'Description', field: 'description', checkboxSelection: true,
    sortable: true, width: 310
  },
  { headerName: 'Customer', field: 'idCustomer', sortable: true, width: 80 },

  { headerName: 'CustomerName', field: 'customerName', sortable: true, width: 200 },
  { headerName: 'Reference', field: 'reference', sortable: true },
  { headerName: 'Date', field: 'createdDate', sortable: true, width: 80,
    cellRenderer: (data) => {
        return  data.value ? moment(data.value).format('DD-MMM-YY') : ""
    }
  }
]

export const GridColumnDefsSigned = [
  { headerName: 'Description', field: 'description', width: 310},
  { headerName: 'Customer', field: 'idCustomer', width: 80 },
  { headerName: 'Customer Name', field: 'customerName',  width: 200  },
  { headerName: 'Reference', field: 'reference' },
  { headerName: 'Date', field: 'createdDate', width: 80,
    cellRenderer: (data) => {
        return data.value ? moment(data.value).format('DD-MMM-YY') : ""
    }
  }
]