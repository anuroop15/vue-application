<template>
  <div>
    <h3> Documents to sign </h3>
    <button v-show="users.data.CAN_SIGN">Documents to Sign</button>
    <table class="table">
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
        <tr v-for="(user, index) in users.data.PENDING.items" :key="index">
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

<script src="./DemoTable.js"></script>
<style src="./DemoTable.css"></style>
