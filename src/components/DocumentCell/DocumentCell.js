import Vue from "vue";
import moment from 'moment';

export default Vue.extend({
    name:"DocumentCell",
    methods:{
        refresh(params) {
            this.params = params;
            return true;
        },
        customerIdSelectedToView(){
            this.params.context.componentParent.customerIdSelectedToView(this.params)
        },
        documentSelectedToView(){
            this.params.context.componentParent.documentSelectedToView(this.params)
        },
        formatDate(data){
            return  data ? moment(data).format('DD-MMM-YY') : ""
        }
    },
    data(){
        return {

        }
    }
})