<template>
  <div>
    <h1> Signature Page </h1>
    <button class="button" @click="getDocuments(signatureDocs.data.data.CAN_SIGN)">Documents to Sign</button>
    <button class="button" @click="getDocuments(!signatureDocs.data.data.CAN_SIGN)">File of Signed Documents</button>
    <AgGridComponent :displayedDocuments="displayedDocuments"/>
  </div>
</template>

<script src="./SignatureDocs.js"></script>
<style src="./SignatureDocs.css"></style>
