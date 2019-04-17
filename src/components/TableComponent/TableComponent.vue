<template>
  <div>
    <h3> Documents to sign </h3>
    <button v-if="users.data.CAN_SIGN">Documents to Sign</button>
    <table class="table" v-for="user in users.data.PENDING.items">
      <thead>
        <th>
          
        </th>
        <th>
          Description
        </th>
        <th>
          Customer
        </th>
        <th>
          Customer Name
        </th>
        <th>
          Reference
        </th>
        <th>
          Date
        </th>
      </thead>
      <tbody>
        <tr>
          <td>
            <input type="checkbox" />
          </td>
          <td>
            {{user.description}}
          </td>
          <td>
            {{user.idCustomer}}
          </td>
          <td>
            {{user.customerName}}
          </td>
          <td>
            {{user.reference}}
          </td>
          <td>
            {{user.createdDate}}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script src="./TableComponent.js"></script>
<style src="./TableComponent.css"></style>
