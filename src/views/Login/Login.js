import { mapState, mapActions } from "vuex";
import Header from '../../components/Header/Header.vue';
import {en, es, pt} from './i18n'
import ChallegeManagerPhone from "../../components/ChallegeManagerPhone/ChallegeManagerPhone.vue";
export default {
    name:"Login",
    data(){
        return {
            credentias:{
                password:"Miami123",
                userLoginName:"02K4XXYB",
            },
            action:'BindDevice',
            deviceName:"",
            saveDevice: false,
        }
    },
    components:{
        Header,
        ChallegeManagerPhone
    },
    i18n:{
        messages:{
            en,
            es,
            pt
        }
      },
    created() {
        this.fetchCompanyInfoList();
    },
    methods: {
        onUserLogOut(){
            this.action ='default'
            this.logOutUser()
        },
        registerDevice(){
            if(this.saveDevice && this.deviceName){
                this.loginWebBindDevice(this.deviceName)
            } else {
                //redirect to dashboard view
            }
        },
        startChallenge(){
            this.$vuedals.open({
                title: 'challenger',
                size: "md",
                component: ChallegeManagerPhone,
                props: {
                  urlBase: "security/json/LoginWeb",
                  parameters: {devicePrint:true},
                  onSuccess: this.handlerChallengeOnSuccess,
                  onError: this.handlerChallengeOnError
                },
                dismissable: false,
                escapable: true
              });
        },
        handlerChallengeOnSuccess(data){
            // eslint-disable-next-line
            console.log('onSuccessEnven:login js', data)
                this.action = "BindDevice";
        },
        handlerChallengeOnError({actionErrors, actionMessages}){
            this.onUserLogOut();
            actionMessages !=null && actionMessages.length > 0
          ? this.showAlert(actionMessages) 
          : this.showAlert(actionErrors)
        },
        showAlert(m){
            this.$vuedals.open({
                size: "xs",
                component: {
                  name: "user_lockout",
                  render: h => {
                    return h('ul', m.map(function (item) {
                        return h('li', item)
                      }))
                  }
                }
              })
        },
        handlerAction(action){
            this.action = action;
            if(action==="challenge"){
                //centerURL redirect
                //this.startChallenge()
            }
            /* Cases :198
            already-in-session
            eco.message.handled.as.json
            input
            change-center
            challenge
            ENROLL
            */
        },
        ...mapActions("auth", [
            "fetchCompanyInfoList","loginUser","logOutUser", "loginWebBindDevice"])
    },
    computed:{
        ...mapState(["auth"])
    },
    watch: {
        "auth.actionType":"handlerAction"
    },
}