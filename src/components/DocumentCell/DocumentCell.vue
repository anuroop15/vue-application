<template>
  <div class="santander-document-cell_container">
    <template v-for="(i, index) in params.headers">
      <div class="row santander-document-cell" :key="i.field">
        <div :class="{'col-6':(index===2), 'col-4':(index!=2)}">
          <p class="text-uppercase align-middle">{{i.headerName}}</p>
        </div>
        <div :class="{'col-6':(index===2), 'col-8':(index!=2), 'text-nowrap':true}">
          <p
            v-if="index===0"
            class="santander-document-cell_container-desc align-middle white-space"
            @click.prevent="documentSelectedToView"
          >{{params.data[i.field]}}</p>

          <a
            v-else-if="index===1"
            class="align-middle float-right"
            @click.prevent="customerIdSelectedToView"
          >
            <p>{{params.data[i.field]}}</p>
          </a>
          <div v-else-if="i.field==='createdDate'" class="text-nowrap align-middle float-right">{{formatDate(params.data[i.field])}}</div>
          <div v-else class="text-nowrap align-middle float-right">{{params.data[i.field]}}</div>
        </div>
      </div>
    </template>
    <div class="p-4 d-flex justify-content-around">
      <BaseButton @click="documentSelectedToView" variant="outline">{{$t('view')}}</BaseButton>
      <BaseButton @click="customerIdSelectedToView" variant="primary">{{$t('signers')}}</BaseButton>
    </div>
  </div>
</template>
    
<script src="./DocumentCell.js"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./DocumentCell.css"></style>