<template>
  <div class="santander-main_container">
    <Header />
    <div class="santander-main_routes">
    <h4>Available Routes</h4>
    <template v-for="item in items">
      <router-link :key="item.path" :to="item.path">{{item.name}}</router-link>
    </template>
    </div>
  </div>
</template>

<script src="./DemoRoutes.js"></script>
<style src="./DemoRoutes.css" scoped></style>
