<template>
  <div>
    <h1> Signature Page </h1>
    <div>
      <div class="card">
        <h5 class="card-header">Documents to Sign</h5>
        <div class="card-body">
            <vue-tabs @clicked="getDocuments">
                <v-tab title="Documents to Sign">
                  <button class="button" @click="signSelected">Sign Selected Documents</button>
                  <button class="button" @click="downloadSelected">Download Selected</button>
                    <AgGridComponent v-on:selected-document="selectedRow"
                      :displayed-documents="displayedDocuments"
                      :grid-column-defs="gridColumnDefsPending"
                    />
                </v-tab>
                <v-tab title="File of signed Documents">
                    <AgGridComponent v-on:selected-document="selectedRow"
                      :displayedDocuments="displayedDocuments"
                      :gridColumnDefs="gridColumnDefsSigned"
                    />
                </v-tab>
                <v-tab title="Documents to sign for others">
                    Third tab content
                </v-tab>
            </vue-tabs>
        </div>
      </div>
    </div>
    <div v-if="showModal">
      <Modal v-if="acceptToSign" v-on:close="showModalWindow">
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
      <Modal v-if="!acceptToSign && challengeAuth" v-on:close="showModalWindow">
        <div slot="header">
          Additional Authentication Required
        </div>
        <div slot="body">
          For you security it is necessary to authenticate your identity. Select the registered mobile phone in which
          you wish to receive your security code:
          <p>
            <input type="radio" />
            one Time password (+31 ********7 56)
          </p>
          <p>
            if your mobile phone is not listed, contact your banker to certify a new mobile phone in the bank's
            security procedure.
          </p>
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
