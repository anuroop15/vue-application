<template>
  <div class="banking-login_container">
    <Header/>
    <BaseButton @click="onUserLogOut">LogOut</BaseButton>
    <div class="banking-login_section">
      <div class="col-md-5 col-xl-4" v-if="action==='default'||action==='input'">
        <div class="banking-login_section-header p-3">
          <h3>{{$t('signin')}}</h3>
        </div>
        <div class="row p-3">
        <div class="col-11">
        <BaseInput v-model="credentias.userLoginName" :placeholder="$t('username')"/>
        </div>
        <div class="col-1">
         <img  v-tooltip.right="{ content: $t('useCurrentUser')}" src="../../assets/help14x14.gif">
        </div>
        </div>
        <BaseInput
          v-model="credentias.password"
          :placeholder="$t('Password')"
          class="p-3"
          type="password"
        />
        <div class="mt-3 d-flex justify-content-start justify-content-md-around">
          <BaseButton variant="outline">{{$t('ForgotPassword')}}</BaseButton>

          <BaseButton type="submit" variant="primary">{{$t('CreateUser')}}</BaseButton>

          <BaseButton @click="loginUser(credentias)">{{$t('signin')}}</BaseButton>
        </div>
        <div class="santanter-login_polices p-3">
          <p v-html="$t('disclaimer')"></p>
        </div>
      </div>
      <div class="col-md-6" v-if="action ==='challenge'|| action ==='already-in-session'">
        <ChallegeManagerPhone
          urlBase="security/json/LoginWeb"
          @onSuccess="handlerChallengeOnSuccess"
          @onError="handlerChallengeOnError"
          :parameters="{devicePrint:true}"
        />
      </div>
      <div class="col-md-6" v-if="action ==='BindDevice'">
        <div class="banking-login_section-header pb-3">
          <h5>{{$t('bindThisDevice')}}</h5>
        </div>
        <div>
          <div class="row pb-3 d-flex align-items-center">
            <div class="col-md-4 pt-3">
              <p>{{$t('deviceName')}}</p>
            </div>
            <div class="col-md-8">
              <BaseInput v-model.trim="deviceName"/>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value v-model="saveDevice">
                <label class="form-check-label" for="defaultCheck1">
                  <p>{{$t('bindDeviceQuestion')}}</p>
                </label>
              </div>
            </div>
            <div class="col-md-8">
              <a id="bindDeviceLink"  v-tooltip.right="{ content: $t('deviceBindMessage'), }" href="#" @click.prevent>{{$t('bindDeviceLink')}}</a>
            </div>
          </div>
          <BaseButton @click="registerDevice">{{$t('Continue')}}</BaseButton>
        </div>
      </div>
      <div class="col-md-6" v-if="action ==='enroll'">Enroll</div>
    </div>
  </div>
</template>

<script src="./Login.js"></script>
<style src="./Login.css"></style>