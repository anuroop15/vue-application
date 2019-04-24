<template>
  <div>
    <h1> Signature Page </h1>
    <div>
      <div class="card">
        <h5 class="card-header">Documents to Sign</h5>
        <div class="card-body">
            <tabs @clicked="getDocuments">
                <tab name="Documents to Sign">
                  <button class="button" @click="signSelected">Sign Selected Documents</button>
                  <button class="button" @click="downloadSelected">Download Selected</button>
                    <AgGridComponent v-on:selected-document="selectedRow" :displayedDocuments="displayedDocuments"/>
                </tab>
                <tab name="File of signed Documents">
                    <AgGridComponent v-on:selected-document="selectedRow" :displayedDocuments="displayedDocuments"/>
                </tab>
                <tab name="Documents to sign for others">
                    Third tab content
                </tab>
            </tabs>
        </div>
      </div>
    </div>
    <div v-if="showModal">
      <Modal v-on:close="showModalWindow">
        <div slot="header">
          Documents to Sign
        </div>
        <div slot="body">
          You are going to sign selected documents {{selectedRowInfo.description}}
        </div>
        <div slot="footer">
          <button class="btn btn-default" @click="showModalWindow('Accept')">Accept</button>
          <button class="btn btn-default" @click="showModalWindow('cancel')">Cancel</button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script src="./SignatureDocs.js"></script>
<style src="./SignatureDocs.css"></style>
