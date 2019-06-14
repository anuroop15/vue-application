
<template>
  <div class="santander-signature-pre_container">
    <div class="santander-signature-pre_header">
      <p>{{$t('docsToSign')}} </p>
    </div>
    <div data-scope-id class="santander-signature-pre_content">
      <div class="card">
        <div class="card-body">
             <div class="pending-container">
               <div class="santander-signature-pre_top-area">
                  <div class="santander-signature-button-wrapper pl-3">
                    <button class="button" v-on:click="selectAll">{{$t('selectAll')}}</button>
                    <button class="button" @click="signSelected">{{$t('signSelectedDocs')}}</button>
                    <button class="button" @click="downloadSelected">{{$t('downloadSelected')}}</button>
                  </div>
                </div>
                <div class="santander-signature-grid-wrapper">
                  <AgGridComponent v-on:selected-document="selectedRow"
                    v-on:document-viewed="viewPDFDocument"
                    :selectedAllView="selectedAllViewed"
                    :documentsToSign="true"
                    :millenniumGrid="true"
                    :displayed-documents="displayedDocuments"
                    :gridColumnDefs="GridColumnDefsPending"
                  />
                </div>
              </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./SignatureDocsNonMillennium.js"></script>
<style scoped src="./SignatureDocsNonMillennium.css"></style>