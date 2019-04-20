import { mapActions, mapState } from "vuex";
import { AgGridVue } from "ag-grid-vue";

const getSize = () => {
  return document.querySelector(".ag-root-wrapper").offsetWidth;
};

export default {
  name: "FundsTransfer",
  created() {
    this.fetchData();
  },
  data: function() {
    return {
      gridOptions: null,
      gridApi: null,
      columnApi: null,
      columnDefs: null,
      rowSelection: null,
      rowData: null
    };
  },
  beforeMount() {
    this.gridOptions = {};
    this.rowSelection = "single";
  },
  mounted() {
    this.gridApi = this.gridOptions.api;
    this.gridColumnApi = this.gridOptions.columnApi;
  },
  methods: {
    onGridReady(params) {
      this.reSizeGrid(params);
      params.api.sizeColumnsToFit();
      params.api.sizeColumnsToFit();
      window.addEventListener("resize", () => this.reSizeGrid(params));
    },
    reSizeGrid(params) {
       //Grid resize on mobile brake point
      let size = getSize();
      if (size < 800 && size > 600) {
        //from 600-800px  reDefind the Column on the Table and Size ColumnsToFit the content area
        params.api.setColumnDefs(this.getTableColSize());
        params.api.sizeColumnsToFit();
      } else if (size < 600) {
        // less that 600px
        params.api.setColumnDefs([
          { headerName: "CUSTOMER", field: "debitCustomerNameMask" },
          { headerName: "ACCOUNT", field: "debitAccountMask" }
        ]);
        params.api.sizeColumnsToFit();
      } else {
        setTimeout(function() {
          params.api.sizeColumnsToFit();
        });
      }
    },
    onSelectionChanged(params) {
       // On row selection event
      var selectedRows = params.api.getSelectedRows();
      var selectedRowsString = "";
      selectedRows.forEach(function(selectedRow, index) {
        if (index !== 0) {
          selectedRowsString += ", ";
        }
        selectedRowsString += selectedRow.debitCustomerNameMask;
      });
      //you can call a action on handel the click
      // eslint-disable-next-line
      console.log(selectedRowsString);
    },
    getTableColSize() {
      return [
        { headerName: "CUSTOMER", field: "debitCustomerNameMask" },
        { headerName: "ACCOUNT", field: "debitAccountMask" },
        { headerName: "AMOUNT", field: "debitAmount" },
        { headerName: "CURRENCY", field: "debitCurrency" }
      ];
    },
    ...mapActions({ fetchData: "fundsTransfers/fetchData" })
  },
  components: {
    AgGridVue
  },
  computed: {
    getNumRows() {
      if (this.fundsTransfers.data.numRows) {
        return this.fundsTransfers.data.numRows;
      }
      return 0;
    },
    getTableData() {
      return this.fundsTransfers.data.items;
    },
    getTableOptions() {
      return {
        filterable: false,
        perPage: 200,
        pagination: {
          chunk: 200
        },
        skin: "table-hover",
        headings: {
          debitCustomerNameMask: "CUSTOMER",
          debitAccountMask: "ACCOUNT",
          debitAmount: "AMOUNT",
          debitCurrency: "CURRENCY",
          debitReference: "DEBIT REFERENCE",
          creditReference: "CREDIT REFERENCE",
          paymentReason: "BENEFICIARY",
          account: "ACCOUNT",
          type: "TYPE",
          status: "STATUS",
          createDate: "CREATE DATE"
        }
      };
    },
    getTableCol() {
      return [
        { headerName: "CUSTOMER", field: "debitCustomerNameMask" },
        { headerName: "ACCOUNT", field: "debitAccountMask" },
        { headerName: "AMOUNT", field: "debitAmount" },
        { headerName: "CURRENCY", field: "debitCurrency" },
        { headerName: "DEBIT REFERENCE", field: "debitReference" },
        { headerName: "CREDIT REFERENCE", field: "creditReference" },
        { headerName: "BENEFICIARY", field: "paymentReason" },
        { headerName: "ACCOUNT", field: "account" },
        { headerName: "TYPE", field: "type" },
        { headerName: "STATUS", field: "status" },
        { headerName: "CREATE DATE", field: "createDate" }
      ];
    },

    ...mapState(["fundsTransfers"])
  }
};
