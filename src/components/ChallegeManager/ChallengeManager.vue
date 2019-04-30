<template>
 <div class="santanter-challenge-manager_container">
  <div class="santander-challenge-manager_select-method" v-if="challengeManager.stage === 'CHALLENGE_SELECT_METHOD'">
    <p>For your security it is necessary to authenticate your identity. Select the registered mobile phone in which you wish to receive your security code:</p>
    <form @submit.prevent="startChallengerNow">
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
    <p>If your mobile phone is not listed, contact your banker to certify a new mobile phone in the bank's security procedure.</p>
      <button type="button" @click.prevent="cancelChallenger">Close</button>
      <button type="submit" value="submit">Accept</button>
    </form>
  </div>
  <div class="santander-challenge-manager_challenge" v-if="challengeManager.stage === 'CHALLENGE'|| challengeManager.stageAction ==='CHALLENGE_RETRY_CODE'">
    <p>You have received a text message with the security code on your mobile phone ({{challengeManager.selectedMethod.label}}) Please enter the code:</p>
    <div class="row">
    <div class="col-8">
          <BaseInput v-model="code" placeholder="Code"/>
    </div>
    <div class="col-4">
          <BaseButton @click="processOTPStart">Accept</BaseButton>
    </div>
    </div>
    <p v-if="challengeManager.stageAction ==='CHALLENGE_RETRY_CODE'">The additional authentication failed. Please try again</p>
    <p>This code will be valid for the next three (3) minutes </p>
    <p>Click "new code" to resend</p>
    <button @click="changeToAlternatePhone">Alternate phone</button>
    <button @click="startChallengerNow">New code</button>
  </div>
  <div class="santander-challenge-manager_challenge" v-if="challengeManager.stage === 'CHALLENGE_RETRY' && challengeManager.stageAction !='CHALLENGE_RETRY_CODE'">
    <p>{{challengeManager.messages}}</p>
    <button type="button" @click="cancelChallenger">Close</button>
    <button type="button" @click="startChallengerNow">Accept</button>
  </div>
 </div>
</template>

<script src="./ChallengeManager.js"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./ChallengeManager.css"></style>
