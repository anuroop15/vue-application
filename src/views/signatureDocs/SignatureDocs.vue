
<template>
  <div class="banking-signature-pre_container">
    <div class="banking-signature-pre_header">
      <p>{{$t('docsToSign')}}</p>
    </div>
    <div data-scope-id class="banking-signature-pre_content">
          <div class="banking-signature-pre_top-area">
            <div class="banking-signature-pre_menu">
              <ul class="nav nav-tabs">
                <li class="nav-item">
                  <a :class="{'banking-signature_nav-link':true,'nav-link':false,active:(currentActive===0)}" href="#" @click.prevent="getDocuments(0)"><span>{{$t('docsToSign')}}</span></a>
                </li>
                <li class="nav-item">
                  <a :class="{'banking-signature_nav-link':true,'nav-link':false,active:(currentActive===1)}" href="#" @click.prevent="getDocuments(1)"><span>{{$t('fileOfSignedDocuments')}}</span></a>
                </li>
                <li class="nav-item">
                  <a :class="{'banking-signature_nav-link':true,'nav-link':false,active:(currentActive===2)}" href="#" @click.prevent="getDocuments(2)" ><span>{{$t('documentsToSignForOthers')}}</span></a>
                </li>
              </ul>
            </div>
            <div v-if="currentActive===0"  class="banking-signature-button-wrapper pl-2">
                    <button class="button" v-on:click="selectAll">{{$t('selectAll')}}</button>
                    <button class="button" @click="signSelected">{{$t('signSelectedDocs')}}</button>
                    <button class="button" @click="downloadSelected">{{$t('downloadSelected')}}</button>
            </div>
          </div>
          <div class="banking-signature-grid-wrapper">
                  <AgGridComponent
                    v-on:selected-document="selectedRow"
                    v-on:document-viewed="viewPDFDocument"
                    v-on:customer-selected="customerSelected"
                    :selectedAllView="selectedAllViewed"
                    :documentsToSign="true"
                    :displayed-documents="displayedDocuments"
                    :gridColumnDefs="ColumnDefs"
                  />
          </div>
    </div>
    <div v-if="showModal">
      <Modal v-if="acceptToSign" v-on:close="showModalWindow">
        <div slot="header">{{$t('docsToSign')}}</div>
        <div slot="body">{{$t('goingToSign')}} {{selectedRowInfo.description}}</div>
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