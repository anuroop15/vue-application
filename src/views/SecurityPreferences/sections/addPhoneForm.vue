<template>
  <div class="santander-security-pre_add-phone">
    <div class="santander-security-pre_add-phone-inner">
      <BaseInput
        :disabled="labelDisabled"
        class="mb-2"
        v-model="label"
        @blur="$v.label.$touch()"
        :placeholder="$t('phoneAlias')"
      />
      <div class="santander-security-pre_alert" role="alert" v-if="$v.label.$error">
        <p>label code</p>
      </div>
      <BaseInput
        regExp="^[1-9]{1}[0-9]{0,2}$"
        maxlength="3"
        class="mb-2"
        v-model="countryCode"
        @blur="$v.countryCode.$touch()"
        :placeholder="$t('phoneCountryCode')"
      />
      <div
        class="santander-security-pre_alert"
        role="alert"
        v-if="$v.countryCode.$error && !$v.countryCode.required"
      >
        <p>{{$t('countryCodeError')}}</p>
      </div>
      <div class="santander-security-pre_alert" role="alert" v-if="!$v.countryCode.numeric">
        <p>{{$t('numberOnlyError')}}</p>
      </div>
      <BaseInput
        regExp="\d*"
        maxlength="5"
        class="mb-2"
        v-model="areaCode"
        @blur="$v.areaCode.$touch()"
        :placeholder="$t('phoneAreaCode')"
      />
      <div
        class="santander-security-pre_alert"
        role="alert"
        v-if="$v.areaCode.$error && !$v.areaCode.required"
      >
        <p>{{$t('areaCodeError')}}</p>
      </div>
      <div class="santander-security-pre_alert" role="alert" v-if="!$v.areaCode.numeric">
        <p>{{$t('numberOnlyError')}}</p>
      </div>
      <BaseInput
        regExp="\d*"
        maxlength="20"
        class="mb-2"
        v-model="phoneNumber"
        @blur="$v.phoneNumber.$touch()"
        :placeholder="$t('phoneNumber')"
      />
      <div
        class="santander-security-pre_alert"
        role="alert"
        v-if="$v.phoneNumber.$error && !$v.phoneNumber.required"
      >
        <p>{{$t('phoneNumberError')}}</p>
      </div>
      <div class="santander-security-pre_alert" role="alert" v-if="!$v.phoneNumber.numeric">
        <p>{{$t('numberOnlyError')}}</p>
      </div>
    </div>
    <div class="santander-security-pre_footer">
      <BaseButton @click="cancelAdd" variant="outline">{{$t('cancel')}}</BaseButton>
      <BaseButton @click="addPhone" variant="outline">{{$t('save')}}</BaseButton>
    </div>
  </div>
</template>
<script>
import { en, es, pt } from "../i18n";
import { required, numeric, maxLength } from "vuelidate/lib/validators";
export default {
  name: "AddPhoneForm",
  i18n: {
    messages: {
      en,
      es,
      pt
    }
  },
  props: {
    phone: {
      type: Object
    }
  },
  data() {
    return {
      label: "",
      labelDisabled: false,
      countryCode: "",
      areaCode: "",
      phoneNumber: ""
    };
  },
  created() {
    this.loadState();
  },
  validations: {
    label: {
      required,
      maxLength: maxLength(50)
    },
    countryCode: {
      required,
      numeric,
      maxLength: maxLength(3)
    },
    areaCode: {
      required,
      numeric,
      maxLength: maxLength(5)
    },
    phoneNumber: {
      required,
      numeric,
      maxLength: maxLength(20)
    }
  },
  methods: {
    addPhone() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        let data = {
          label: this.label,
          countryCode: this.countryCode,
          areaCode: this.areaCode,
          phoneNumber: this.phoneNumber
        };
        this.$vuedals.close();
        this.$emit("onSave", data);
      }
    },
    cancelAdd() {
      this.label = "";
      this.countryCode = "";
      this.areaCode = "";
      this.phoneNumber = "";
      this.$emit("onCancel");
      this.$vuedals.close();
    },
    loadState() {
      if (this.phone) {
        this.labelDisabled = true;
        this.label = this.phone.label;
        this.countryCode = this.phone.countryCode;
        this.areaCode = this.phone.areaCode;
        this.phoneNumber = this.phone.phoneNumber;
      }
    }
  },
  watch: {
    phone: "loadState"
  }
};
</script>
<style scoped>
.santander-security-pre_add-phone {
  padding: 0 !important;
}
.santander-security-pre_add-phone-inner {
  padding: 0.5rem;
}
</style>

