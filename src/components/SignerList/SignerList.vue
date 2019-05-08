<template>
  <div class="signer-list">
    <div class="signer-table-wrapper">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Signer Name</th>
            <th scope="col">Signature Date</th>
            <th scope="col">Required signatures</th>
            <th scope="col">Required signatures</th>
          </tr>
        </thead>
        <tbody>
          <tr  v-for="(doc, index) in trackDetails" :key="index">
            <td>{{doc.partyName}}</td>
            <td>{{doc.signDateTime}}</td>
            <td>{{doc.joinSigners}}</td>
            <td>
              <button @click="viewSignedDoc(doc.ecoIdDoc)" v-if="doc.ecoIdDoc">View Document</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="signer-button-wrapper">
      <button class="btn" @click="closeModal">Close</button>
    </div>
  </div>
</template>

<script src="./SignerList.js"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./SignerList.css"></style>