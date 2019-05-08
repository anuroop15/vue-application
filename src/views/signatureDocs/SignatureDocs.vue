<template>
  <div class="santander-signature-pre_container">
    <div class="santander-signature-pre_header">
      <p> {{$t('signaturePage')}} </p>
    </div>
    <div data-scopeId class="santander-signature-pre_content">
      <div class="card">
        <h5 class="card-header">{{$t('docsToSign')}}</h5>
        <div class="card-body">
            <vue-tabs @tab-change="getDocuments">
                <v-tab :title="$t('docsToSign')">
                  <div class="col">
                    <div class="santander-signature-button-wrapper">
                      <button class="button" v-on:click="selectAll">{{$t('selectAll')}}</button>
                      <button class="button" @click="signSelected">{{$t('signSelectedDocs')}}</button>
                      <button class="button" @click="downloadSelected">{{$t('downloadSelected')}}</button>
                    </div>
                    <div class="santander-signature-grid-wrapper">
                      <AgGridComponent v-on:selected-document="selectedRow"
                        v-on:document-viewed="viewPDFDocument"
                        v-on:customer-selected="customerSelected"
                        :selectedAllView="selectedAllViewed"
                        :documentsToSign="true"
                        :displayed-documents="displayedDocuments"
                        :grid-column-defs="gridColumnDefsPending"
                      />
                    </div>
                  </div>
                </v-tab>
                <v-tab :title="$t('fileOfSignedDocuments')">
                  <div class="col">
                    <AgGridComponent v-on:selected-document="selectedRow"
                      v-on:document-viewed="viewPDFDocument"
                      v-on:customer-selected="customerSelected"
                      :documentsToSign="false"
                      :displayedDocuments="displayedDocuments"
                      :gridColumnDefs="gridColumnDefsSigned"
                    />
                  </div>
                </v-tab>
                <v-tab :title="$t('documentsToSignForOthers')">
                  <div class="col">
                    <AgGridComponent v-on:selected-document="selectedRow"
                      v-on:document-viewed="viewPDFDocument"
                      v-on:customer-selected="customerSelected"
                      :documentsToSign="false"
                      :displayedDocuments="displayedDocuments"
                      :gridColumnDefs="gridColumnDefsSigned"
                    />
                  </div>
                </v-tab>
            </vue-tabs>
        </div>
      </div>
    </div>
    <div v-if="showModal">
      <Modal v-if="acceptToSign" v-on:close="showModalWindow">
        <div slot="header">
          {{$t('docsToSign')}}
        </div>
        <div slot="body">
          {{$t('goingToSign')}} {{selectedRowInfo.description}}
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
<style scoped src="./SignatureDocs.css"></style>
