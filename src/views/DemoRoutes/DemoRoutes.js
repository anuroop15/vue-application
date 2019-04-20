import TableDemo from '../../components/TableDemo/TableDemo.vue';

export default {
    props:['id'],
    components: {
        TableDemo,
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