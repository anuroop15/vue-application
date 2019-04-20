import {mapActions, mapState} from "vuex";

export default {
    name: "SecurityPreferences",
    created(){
        this.fetchSecurity();
    },
    methods: {
        ...mapActions({fetchSecurity:'securityPreference/fetchSecurityPre'})
    },
    computed :{
        ...mapState(["securityPreference"])
    }
}

// https://miaecowasdev.mia.usa.sinvest/eco-pre-int/en/preferences/json/ChangeOwnUserLoginName
//ChangeOwnDisplayName