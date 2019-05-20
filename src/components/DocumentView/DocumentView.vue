<template>
  <div class="document-main">
    <div class="row">
      <div class="col-md-2 col-12">
        <button v-if="parameters.documentsToSign" @click="onSelect" class="btn">{{$t('select')}}</button>
        <button @click="onDownload" class="btn">{{$t('download')}}</button>
        <button @click="onCancel" class="btn">{{$t('close')}}</button>
      </div>
      <div class="col-md-10 col-12">
        <!-- <embed :src="urlBase" type="application/pdf" width="100%" height="600px"> -->
        <object :data="urlBase" type="application/pdf" width="100%" height="600px">
          <p>
            Your web browser doesn't have a PDF plugin.
            Instead you can
            <span class="document-main_link" @click="onDownload">
              click here to
              download the PDF file.
            </span>
          </p>
        </object>
      </div>
    </div>
  </div>
</template>

<script src="./DocumentView.js"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./DocumentView.css"></style>