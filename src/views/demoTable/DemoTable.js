export default {
  name: 'DemoTable',
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
