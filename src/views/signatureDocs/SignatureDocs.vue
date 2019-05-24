
<template>
  <div class="santander-signature-pre_container">
    <div class="santander-signature-pre_header">
      <p>{{$t('docsToSign')}} </p>
    </div>
    <div data-scopeId class="santander-signature-pre_content">
      <div class="card">
        <div class="card-body">
            <vue-tabs @tab-change="getDocuments">
                <v-tab :title="$t('docsToSign')">
                  <div class="pending-container">
                    <div class="santander-signature-button-wrapper pl-2">
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
                        :gridColumnDefs="GridColumnDefsPending"
                      />
                    </div>
                  </div>
                </v-tab>
                <v-tab :title="$t('fileOfSignedDocuments')">
                  <div class="signed-container">
                    <AgGridComponent v-on:selected-document="selectedRow"
                      v-on:document-viewed="viewPDFDocument"
                      v-on:customer-selected="customerSelected"
                      :documentsToSign="false"
                      :displayedDocuments="displayedDocuments"
                      :gridColumnDefs="GridColumnDefsSigned"
                    />
                  </div>
                </v-tab>
                <v-tab :title="$t('documentsToSignForOthers')">
                  <div class="pending_others-container">
                    <AgGridComponent v-on:selected-document="selectedRow"
                      v-on:document-viewed="viewPDFDocument"
                      v-on:customer-selected="customerSelected"
                      :documentsToSign="false"
                      :displayedDocuments="displayedDocuments"
                      :gridColumnDefs="GridColumnDefsSigned"
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
    </div>
  </div>
</template>

<script src="./SignatureDocs.js"></script>
<style scoped src="./SignatureDocs.css"></style>