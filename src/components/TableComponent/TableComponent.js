export default {
    name: 'TableComponent',
    data: () => {
      return {
        show: false
      }
    },
    methods: {
      //
    },
    created () {
      this.$store.dispatch('fetchData')
    },
    computed: {
      users () {
        return this.$store.state.signatureDocs.data
      }
    }
  }