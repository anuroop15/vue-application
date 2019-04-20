import Modal from '../Modal/Modal.vue'


export default {
    name: "TableDemo",
    data: function () {
        return {
            show: false
        }
    },
    components: {
        Modal
      },
    methods: {
    detaileShow(id) {
        this.$store.dispatch("fetchUser", id);
        this.show = this.show ? false : true;
      }
    },
    created() {
      this.$store.dispatch("fetchData");
    },
    computed: {
      users() {
        return this.$store.state.demo.data;
      },
      current() {
        return this.$store.state.demo.current;
      },
      isLoading(){
        return this.$store.state.demo.isLoading; 
      }
    }
  };