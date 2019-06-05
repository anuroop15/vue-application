<template>
  <div class="santanter-challenge-manager_container">
    <div
      class="santander-challenge-manager_select-method"
      v-if="step ==='SELECT_METHOD'"
    >
      <p>{{$t('PleaseSelectAnAdditionalAuthenticationProcedure')}}</p>
      <form @submit.prevent="startChallengerNow">
        <template v-for="method in getMethods">
          <div class="form-check mt-2" :key="method.label">
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
        <div class="mt-3 d-flex justify-content-end">
          <BaseButton variant="primary" type="submit" value="submit">{{$t('Accept')}}</BaseButton>
        </div>
      </form>
    </div>
    <div
      class="santander-challenge-manager_challenge"
      v-else-if="step==='QUESTION'"
    >
      <template v-for="(question, index) in info.challengeQuestions">
        <div :key="question.id">
          <p>{{question.text}}</p>
          <BaseInput v-model.trim="answers[index]"/>
        </div>
      </template>
      <div class="alert alert-info mt-2" v-if="info.stage ==='CHALLENGE_RETRY'" role="alert">{{$t('TheAdditionalAuthenticationFailedPleaseTryAgain')}}</div>
      <div class="mt-3 d-flex justify-content-end">
        <BaseButton variant="primary" type="button" @click="checkSqChallengerNow">{{$t('Accept')}}</BaseButton>
      </div>
    </div>
    <div
      class="santander-challenge-manager_challenge"
      v-else-if="step==='OOBPHONE'"
      v-html="$t('YouWillReceiveACallShortly',{label:info.selectedMethod.label, code:info.oobToken})"
    ></div>
  </div>
</template>

<script src="./ChallegeManagerPhone.js"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./ChallegeManagerPhone.css"></style>