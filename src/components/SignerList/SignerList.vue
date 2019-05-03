<template>
  <div class="signer-list">
    <div class="">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Signer Name</th>
            <th scope="col">Signature Date</th>
            <th scope="col">Required signatures</th>
            <th scope="col">Required signatures</th>
          </tr>
        </thead>
        <tbody>
          <tr  v-for="(doc, index) in trackDetails" :key="index">
            <th scope="row"></th>
            <td>{{doc.partyName}}</td>
            <td>{{doc.signDateTime}}</td>
            <td>{{doc.joinSigners}}</td>
            <td>
              <button v-if="doc.ecoIdDoc">View Document</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script src="./SignerList.js"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./SignerList.css"></style>