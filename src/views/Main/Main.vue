<template>
  <div class="banking-main_container">
    <Header />
    <div class="banking-main_routes">
    <h4>Available Routes</h4>
    <template v-for="item in items">
      <router-link :key="item.path" :to="item.path">{{item.name}}</router-link>
    </template>
    </div>
  </div>
</template>

<script>
import Header from '../../components/Header/Header.vue';

export default {
    props:['id'],
    components: {
        Header
    },
    created() {
        this.$router.options.routes.forEach(route => {
            this.items.push({
                name: route.name
                , path: route.path
            })
        })
    }
    , data() {
        return {
            items: []
        }
    }
}
</script>
<style scoped>
.banking-main_container {
    display: flex;
    flex-direction: column;
    padding: 10px;;
    height: 100vh;
    margin: 0;
    background-color: #f5f6f7;
}
.banking-main_logo {
    width: 195px;
}

.banking-main_routes {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
}
</style>
