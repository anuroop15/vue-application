import Vue from 'vue';
import { mapActions, mapState } from "vuex";
import {ChallengeConstant as Constant} from '../../store/utils'

export default Vue.extend({
    name: "ChallengeManager",
    data(){
        return {
            pickedMethod:''
        }
    },
    props:{
        urlBase:{
            type: String,
        },
        handler:{
            type: Function,
        },
        parameters:{
            type: Object,
        },
        start:{
            type: Boolean,
            default: false,
        }
    },
    created(){
        this._challengeInit(this.urlBase, '');
    },
    methods: {
        startChallengerNow(){
            this._challengeStart(this.urlBase,this.pickedMethod)
        },
        clickTest(){
            this.$vuedals.close()
            this.handler()
        },
        getStart(){
            return this.start;
        },
        ...mapActions("challengeManager", [
            "_challengeInit","_challengeStart"])
    },
    computed: {
        getMethods(){
            let methods = [];
            this.challengeManager.methods.forEach((method, index)=>{
                let {type, label} = method;
                let labelMethod = "CHALLENGE_METHOD_" + type;
                if (type == Constant.authenticationMethod.OOBPHONE || type == Constant.authenticationMethod.OTPPHONE) {
                    methods.push({
                        label: `${Constant.messages[labelMethod]}(${label})`,
                        value: index
                    })
                } else {
                    methods.push({
                        label: Constant.messages[labelMethod],
                        value: index
                    })
                }
            })
            return methods;
        },
        ...mapState(["challengeManager"])
    },
})
/**
 * @vue-data {boolean} show modal
 */
export default {
    name: "Modal",
    data: function (){
       return {showModal: false}
    }
}
