<template>
  <div>
    <BaseInput lable="demo" />
    <BaseSpinner />
    <Modal v-if="show && !isLoading" @close="show=false">
      <p slot="header">id:{{current.id}} userID:{{current.userId}}</p>
      <h1 slot="body">{{current.title}}</h1>
      <p slot="footer">{{current.completed}}</p>
    </Modal>
    <template v-if="current">
      <h1>{{current.title}}</h1>
      <p>{{current.id}}</p>
    </template>
    <table>
      <template v-for="user in users">
        <tr :key="user.id" @click="detaileShow(user.id)">
          <td>{{user.id}}</td>
          <td>{{user.userId}}</td>
          <td>
            <p>{{user.title}}</p>
          </td>
          <td>{{user.completed}}</td>
        </tr>
      </template>
    </table>
  </div>
</template>

<script src="./TableDemo.js" ></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./TableDemo.css"></style>
