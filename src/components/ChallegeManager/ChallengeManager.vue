<template>
  <div>
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
      <button type="button" @click.prevent="clickTest">Close</button>
      <button type="submit" value="submit">Accept</button>
    </form>
  </div>
</template>

<script src="./ChallengeManager.js"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./ChallengeManager.css"></style>
