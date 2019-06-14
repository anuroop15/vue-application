<template>
    <a :title="params.value"
       class="ag-grid-component_link" href="#" @click.prevent="onLinkClick">{{params.value}}</a>
</template>
<script>
import Vue from "vue";
export default Vue.extend({
  name: "CellToolTip",
  methods:{
      onLinkClick(){
          this.params.context.componentParent.documentSelectedToView(this.params)
      }
  }
});
</script>
