<template>
  <div class="container-fluid santander-security-pre_container">
    <div class="santander-security-pre_header">
      <p>{{$t('securityPreferences')}}</p>
    </div>
    <div class="santander-security-pre_content mb-2">
      <Sections
        v-if="securityPreference.challengeType"
        :sections="securityPreference.sections||[]"
      />
      <div v-if="!securityPreference.challengeType && !securityPreference.isLoading" class="santander-security-pre_load-net-error">
        <p>{{$t('networkError',{section:"Security Preferences"})}}</p>
      </div>
      <div class="santander-security-pre_spinner-container">
        <BaseSpinner v-if="securityPreference.isLoading"/>
      </div>
    </div>
  </div>
</template>


<script src="./SecurityPreferences.js"></script>
<style src="./SecurityPreferences.css"></style>