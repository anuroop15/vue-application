<template>
  <div class="santander-signature-pre_container">
    <div class="santander-signature-pre_header">
      <p>Paperless Communications</p>
    </div>
    <div class="santander-signature-pre_content">
      <div class="santander-signature-pre-left-content col-8">
        <div class="table-responsive">
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col"></th>
                <th scope="col">Information Type</th>
                <th scope="col">Description</th>
                <th scope="col">Date</th>
                <th scope="col">Reference</th>
                <th scope="col">Customer</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="delevery of deliveries.items">
                <td>
                  <input type="checkbox" />
                </td>
                <td>{{delevery.classDescription}}</td>
                <td>{{delevery.deliveryDescription}}</td>
                <td>{{delevery.bankDate}}</td>
                <td>{{delevery.reference}}</td>
                <td>{{delevery.customerDescription}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="pagination">

        </div>
      </div>
      <div class="santander-signature-pre-right-content col-4">

      </div>
    </div>
  </div>
</template>
<script src="./PaperlessCommunications.js"> </script>
<style src="./PaperlessCommunications.css"></style>
