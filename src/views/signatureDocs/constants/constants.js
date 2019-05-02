
export const GridColumnDefsPending = [
    { headerName: 'Description', field: 'description', checkboxSelection: true,
      sortable: true
    },
    { headerName: 'Customer', field: 'idCustomer', sortable: true },
    { headerName: 'Customer Name', field: 'customerName', sortable: true },
    { headerName: 'Reference', field: 'reference', sortable: true },
    { headerName: 'Date', field: 'createdDate', sortable: true,
      cellRenderer: (data) => {
          return data.value ? (new Date(data.value)).toLocaleDateString() : ''
      }
    }
  ]

  export const GridColumnDefsSigned = [
    { headerName: 'Description', field: 'description'},
    { headerName: 'Customer', field: 'idCustomer' },
    { headerName: 'Customer Name', field: 'customerName' },
    { headerName: 'Reference', field: 'reference' },
    { headerName: 'Date', field: 'createdDate',
      cellRenderer: (data) => {
          return data.value ? (new Date(data.value)).toLocaleDateString() : ''
      }
    }
  ]
