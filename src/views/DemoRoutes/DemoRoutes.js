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