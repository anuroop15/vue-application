<template>
  <div>
    <h1> Signature Page </h1>
    <div>
      <div class="card">
        <h5 class="card-header">Documents to Sign</h5>
        <div class="card-body">
            <tabs>
                <tab name="Documents to Sign">
                  <button class="button" @click="getDocuments(!signatureDocs.CAN_SIGN)">Documents to Sign</button>
                  <button class="button" @click="getDocuments(signatureDocs.CAN_SIGN)">File of Signed Documents</button>
                    <AgGridComponent v-on:selected-document="showModalWindow" :displayedDocuments="displayedDocuments"/>
                </tab>
                <tab name="File of signed Documents">
                    Second tab content
                </tab>
                <tab name="Documents to sigb for others">
                    Third tab content
                </tab>
            </tabs>
        </div>
      </div>
    </div>
    <div v-if="showModal">
      <Modal />
    </div>
  </div>
</template>

<script src="./SignatureDocs.js"></script>
<style src="./SignatureDocs.css"></style>
