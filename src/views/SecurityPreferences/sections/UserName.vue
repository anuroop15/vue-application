<template>
  <section class="santander-security-pre_section">
    <div class="santander-security-pre_section-name">
      <h3>{{$t('username')}}</h3>
    </div>
    <div class="santander-security-pre_section-content p-3">
      <div v-if="userName" class="row mb-2">
        <div class="col-12 col-md-6">
          <label for="Username">{{$t('username')}}</label>
        </div>
        <div class="col-12 col-md-6">
          <BaseInput :value="userName" disabled/>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-12 col-md-6">
          <label for="User Login Name">{{$t('userLoginName')}}</label>
        </div>
        <div class="col-12 col-md-6">
          <BaseInput v-model="userLoginName"/>
        </div>
      </div>
      <div class="row justify-content-end mb-2">
        <div class="col-sm-2 align-self-end">
          <BaseButton variant="primary" @click="updateUserLoginName(userLoginName)">{{$t('save')}}</BaseButton>
        </div>
      </div>
      <div class="row mb-2">
        <div class="col-12 col-md-6">
          <label for="Display Name">{{$t('displayName')}}</label>
        </div>
        <div class="col-12 col-md-6">
          <BaseInput v-model="displayName"/>
        </div>
      </div>
      <div class="row justify-content-end mb-2">
        <div class="col-sm-2 align-self-end">
          <BaseButton variant="primary" @click="updateOwnDisplayName(displayName)">{{$t('save')}}</BaseButton>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapActions, mapState } from "vuex";
import {en, es, pt} from '../i18n'
export default {
  name: "UserName",
  i18n:{
    messages:{
        en,
        es,
        pt
    }
   },
  data() {
    return {
      userName: "",
      userLoginName: "",
      displayName: ""
    };
  },
  created(){
      this.fetchUserName()
      this.fetchUserLoginName()
      this.fetchDisplayName()
  },
  computed: {
    ...mapState(["securityPreference"])
  },
  methods: {
    fetchUserName() {
      this.userName = this.$store.getters["securityPreference/getStateProp"](
        "userName"
      );
    },
    fetchUserLoginName() {
      this.userLoginName = this.$store.getters[
        "securityPreference/getStateProp"
      ]("userLoginName");
    },
    fetchDisplayName() {
      this.displayName = this.$store.getters["securityPreference/getStateProp"](
        "displayName"
      );
    },
    ...mapActions("securityPreference", [
      "updateUserLoginName",
      "updateOwnDisplayName"
    ])
  },
  watch: {
    "securityPreference.userName": "fetchUserName",
    "securityPreference.userLoginName": "fetchUserLoginName",
    "securityPreference.displayName": "fetchDisplayName"
  }
};
</script>