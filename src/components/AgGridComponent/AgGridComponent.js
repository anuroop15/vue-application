import { AgGridVue } from "ag-grid-vue";
import { en, es, pt } from "./i18n";
import _ from "lodash";
import DocumentCell from "../DocumentCell/DocumentCell.vue";
const addLink = method => params => {
  let link = document.createElement("a");
  link.href = "#";
  link.className = "ag-grid-component_link";
  link.innerText = params.value;
  link.addEventListener("click", e => {
    e.preventDefault();
    method(params);
  });
  return link;
};
const getComponentSize = () => {
  let root = document.querySelectorAll(".ag-root-wrapper");
  for (let r of root) {
    if (r.offsetWidth > 0) {
      return r.offsetWidth;
    }
  }
};

export default {
  name: "AgGridVueComponent",
  props: [
    'displayedDocuments',
    'gridColumnDefs',
    'selectedAllView',
    'documentsToSign',
    'millenniumGrid'
  ],
  data: () => {
    return {
      columnDefs: null,
      rowData: null,
      domLayout: null,
      rowSelection: null,
      enableCheckBox: false,
      isVisible:false,
    };
  },
  i18n: {
    messages: {
      en,
      es,
      pt
    }
  },
  components: {
    AgGridVue,
    DocumentCell
  },
  beforeMount() {
    this.frameworkComponents = { DocumentCell: DocumentCell };
    this.context = { componentParent: this };
    this.gridOptions = {
      columnDefs: this.gridColumnDefs,
      rowHeight: 40,
      headerHeight: 50
    }
    this.minHeight = 100
    this.gridOptions.columnDefs[0].cellRenderer = addLink(this.documentSelectedToView)
    if (!this.millenniumGrid) {
      this.gridOptions.columnDefs[1].cellRenderer = addLink(this.customerIdSelectedToView)
    }
      
    this.rowSelection = 'multiple'
    this.domLayout = 'autoHeight'
  },
  mounted() {
    this.gridApi = this.gridOptions.api;
    this.gridColumnApi = this.gridOptions.columnApi;
  },
  watch: {
    "$store.state.i18n.locale": "onLocaleRefreshColDef",
    displayedDocuments() {
      this.getColumnsToFit()
    },
    selectedAllView() {
      this.gridOptions.api.forEachNode(node => {
        if (node.viewed === true) {
          node.setSelected(true);
        }
      });
    }
  },
  methods: {
    getColumnsToFit(){
      this.gridOptions.api.sizeColumnsToFit()
    },
    onLocaleRefreshColDef() {
      let columnDefs = this.gridColumnDefs;
      columnDefs[1].cellRenderer = addLink(this.customerIdSelectedToView);
      columnDefs[0].cellRenderer = addLink(this.documentSelectedToView);
      if(getComponentSize() < 700){
        this.setResponseCell()
      }else{
        this.gridOptions.api.setColumnDefs(columnDefs);
        this.gridOptions.api.setHeaderHeight(55)
      }

      this.gridOptions.api.sizeColumnsToFit();
      this.gridOptions.api.refreshHeader();
    },
    setResponseCell(){
      this.gridOptions.api.setHeaderHeight(0)
      this.gridOptions.api.setColumnDefs([{
        autoHeight:true,
        cellRenderer: "DocumentCell",
        cellClass: "cell-wrap-text",
        cellRendererParams:{
          headers: this.gridColumnDefs,
      }
      }])
    },
    onChange(params){
      console.log(params)
    },
    onGridReady(params) {
      this.getColumnsToFit()
      let intiColDefs = params.api.getModel().context.contextParams.seed.gridOptions.columnDefs;
      getComponentSize() < 700 
      ? this.setResponseCell()
      : null
      window.addEventListener("resize", () => {
        let size = getComponentSize()
        if(size < 700){
          this.setResponseCell();
        } else {
          params.api.setHeaderHeight(55)
          params.api.setColumnDefs(intiColDefs)
        }
        setTimeout(()=> {
          this.getColumnsToFit()
          params.api.resetRowHeights()
        });
      });
    },
    documentSelectedToView(params) {
      params.eGridCell.classList.add("ag-cell-viewed");
      const emitPromise = new Promise((resolve, reject) => {
        this.$emit("document-viewed", params.data, resolve, reject);
      });
      emitPromise.then(data => {
        if (data === "selected") {
          params.node.setSelected(true);
        }
        if (data === "viewed") {
          params.node.viewed = true;
        }
      });
    },
    customerIdSelectedToView(params) {
      params.eGridCell.classList.add("ag-cell-viewed");
      this.$emit("customer-selected", params.data);
    },
    onCellClicked(params) {
      console.log("cell");
    },
    onSelectionChanged(params) {
      this.enableCheckBox = true;
      let selectedRowDetails = params.api.getSelectedNodes();
      if (selectedRowDetails.length > 0) {
        const selectedRows = _.map(selectedRowDetails, row => {
          return row.data;
        });
        this.$emit("selected-document", selectedRows);
      } else {
        this.$emit("selected-document", null);
      }
    }
  },
  created() {
    const rowData = []; // get the data from our Vuex data store
    this.rowData = Object.freeze(
      // reduce memory footprint - see above
      rowData.map(row => {
        // copy to detach from the stores copy
        return {
          ...row
        };
      })
    );
  }
};
