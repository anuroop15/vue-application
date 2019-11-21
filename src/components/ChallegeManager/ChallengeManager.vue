<template>
  <div class="santanter-challenge-manager_container">
    <div  v-if="challengeManager.isLoading" class="santanter-challenge-manager-spinner">
       <BaseSpinner />
    </div>
    <div v-else class="santanter-challenge-manager_container-cont">
    <div
      class="banking-challenge-manager_select-method"
      v-if="challengeManager.stage === 'CHALLENGE_SELECT_METHOD'"
    >
      <form class="p-4">
        <p>{{$t('pleaseSelectAnAdditionalAuthenticationProcedure')}}</p>
        <template v-for="method in getMethods">
          <div class="form-check" :key="method.label">
            <input
              class="form-check-input"
              type="radio"
              v-model="pickedMethod"
              name="CHALLENGE_SELECT_METHOD"
              :value="method.value"
            >
            <label class="form-check-label" for="CHALLENGE_SELECT_METHOD">{{method.label}}</label>
          </div>
        </template>
        <p class="mt-3">{{$t('OTPPHONE_message_dontSeeMyPhone')}}</p>
      </form>
      <div class="pt-3 d-flex justify-content-around banking-challenge-manager_footer">
        <BaseButton
          variant="outline"
          type="button"
          @click.prevent="cancelChallenger"
        >{{$t('close')}}</BaseButton>
        <BaseButton
          variant="outline"
          type="button"
          @click.prevent="startChallengerNow"
        >{{$t('accept')}}</BaseButton>
      </div>
    </div>
    <div
      class="banking-challenge-manager_challenge"
      v-else-if="challengeManager.stage === 'CHALLENGE_RETRY' && challengeManager.stageAction !='CHALLENGE_RETRY_CODE'"
    >
      <div class="p-4">
        <p>{{challengeManager.messages}}</p>
      </div>
      <div class="pt-3 d-flex justify-content-around banking-challenge-manager_footer">
        <BaseButton variant="outline" type="button" @click="cancelChallenger">{{$t('close')}}</BaseButton>
        <BaseButton variant="outline" type="button" @click="startChallengerNow">{{$t('accept')}}</BaseButton>
      </div>
    </div>
    <div class="banking-challenge-manager_challenge" v-else>
      <div class="p-4">
        <p
          v-html="$t('youHaveReceivedMessage_OTPPHONE',{label:challengeManager.selectedMethod.label})"
        ></p>

        <div class="input-group mb-3">
          <input
            v-model="code"
            type="text"
            class="form-control"
            :placeholder="$t('code')"
            :aria-label="$t('code')"
          >
          <div class="ml-3 pppinput-group-append">
            <BaseButton
              variant="primary"
              class="banking-challenge-manager_button-accept"
              @click="processOTPStart"
            >{{$t('accept')}}</BaseButton>
          </div>
        </div>
        <p
          class="banking-challenge-manager_alert"
          v-if="challengeManager.stageAction ==='CHALLENGE_RETRY_CODE'"
        >{{$t('theAdditionalAuthenticationFailedPleaseTryAgain')}}</p>
        <p v-html="$t('youHaveNotReceivedMessage_OTPPHONE')"></p>
      </div>
      <div class="pt-3 d-flex justify-content-around banking-challenge-manager_footer">
        <BaseButton
          variant="outline"
          class="banking-challenge-manager_button"
          @click="changeToAlternatePhone"
        >{{$t('newChallengeMethod')}}</BaseButton>
        <BaseButton
          variant="outline"
          class="banking-challenge-manager_button"
          @click="startChallengerNow"
        >{{$t('newToken')}}</BaseButton>
      </div>
    </div>
  </div>
  </div>
</template>

<script src="./ChallengeManager.js"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./ChallengeManager.css"></style>
