<template>
  <div class="signer-list">
    <div class="signer-table-wrapper">
      <template v-for="(doc, index) in trackDetails">
        <div class="signer-list_item p-2" :key="index">
          <div class="row signer-list_cell mb-1 mt-1">
            <div class="col-5">{{$t('signerName')}}</div>
            <div class="col-7 text-right">{{doc.partyName}}</div>
          </div>
          <div class="row signer-list_cell mb-1 mt-1">
            <div class="col-8">{{$t('signDate')}}</div>
            <div class="col-4 text-right">{{getLocalDateFormat(doc.signDateTime)}}</div>
          </div>
          <div class="row signer-list_cell mb-1 mt-1">
            <div class="col-10">{{$t('requiredSign')}}</div>
            <div class="col-2 text-right">{{doc.joinSigners}}</div>
          </div>
          <div v-if="doc.ecoIdDoc" class="row signer-list_cell mb-1 mt-2">
            <div class="col-12 mt-2 text-right">
              <BaseButton @click="viewSignedDoc(doc.ecoIdDoc)" >{{$t('viewDoc')}}</BaseButton>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="signer-button-wrapper">
      <button class="btn" @click="closeModal">{{$t('close')}}</button>
    </div>
  </div>
</template>

<script src="./SignerList.js"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./SignerList.css"></style>