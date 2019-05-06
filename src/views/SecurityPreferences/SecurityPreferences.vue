<template>
  <div class="container-fluid santander-security-pre_container">
    <div class="santander-security-pre_header">
      <p>{{$t('securityPreferences')}}</p>
    </div>
    <div class="santander-security-pre_content">
      <section class="santander-security-pre_section">
        <div class="santander-security-pre_section-name">
          <h3>{{$t('username')}}</h3>
        </div>
        <div class="santander-security-pre_section-content p-3">
          <div class="row mb-2">
            <div class="col-12 col-md-6">
              <label for="Username">{{$t('username')}}</label>
            </div>
            <div class="col-12 col-md-6">
              <BaseInput :value="securityPreference.userName" disabled/>
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
      <section class="santander-security-pre_section">
        <div class="santander-security-pre_section-name">
          <h3>{{$t('changePassword')}}</h3>
        </div>
        <form @submit.prevent="startChallengeChangePassword">
          <div class="santander-security-pre_section-content p-3">
            <div class="row mb-2">
              <div class="col-12 col-md-6">
                <label for="oldPassword">{{$t('oldPassword')}}</label>
              </div>
              <div class="col-12 col-md-6">
                <BaseInput
                  v-model="$v.password.oldPassword.$model"
                  @blur="$v.password.oldPassword.$touch()"
                  type="password"
                />
                <div
                  v-if="$v.password.oldPassword.$error"
                  class="santander-security-pre_alert"
                  role="alert"
                >
                  <p>{{$t('oldPasswordError')}}</p>
                </div>
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-12 col-md-6">
                <label for="New Password">{{$t('newPassword')}}</label>
              </div>
              <div class="col-12 col-md-6">
                <BaseInput
                  v-model="$v.password.newPassword.$model"
                  @blur="$v.password.newPassword.$touch()"
                  type="password"
                />
                <div
                  v-if="$v.password.newPassword.$error"
                  class="santander-security-pre_alert"
                  role="alert"
                >
                  <p>{{$t('newPasswordError')}}</p>
                </div>
              </div>
            </div>
            <div class="row mb-2">
              <div class="col-12 col-md-6">
                <label for="Verify password">{{$t('repeatNewPassword')}}</label>
                <div
                  v-if="!$v.password.verifyPassword.same && $v.password.verifyPassword.$error"
                  class="santander-security-pre_alert"
                  role="alert"
                >
                  <p>{{$t('passwordsDontMatch')}}</p>
                </div>
              </div>
              <div class="col-12 col-md-6">
                <BaseInput
                  v-model="$v.password.verifyPassword.$model"
                  @blur="$v.password.verifyPassword.$touch()"
                  type="password"
                />
                  <div
                  v-if="$v.password.verifyPassword.$error"
                  class="santander-security-pre_alert"
                  role="alert"
                >
                  <p>{{$t('repeatNewPasswordError')}}</p>
                </div>
              </div>
            </div>
            <div class="row justify-content-end mb-2">
              <div class="col-sm-2 align-self-end">
                <BaseButton variant="primary">{{$t('save')}}</BaseButton>
              </div>
            </div>
          </div>
        </form>
      </section>
      <section class="santander-security-pre_section">
        <div class="santander-security-pre_section-name">
          <h3>{{$t('securityQuestions')}}</h3>
        </div>
        <form @submit.prevent="startChallengeSQ">
          <div class="santander-security-pre_section-content p-3">
            <template
              v-for="(questionsInfo, index) in securityPreference.securityInfo.questionsInfo"
            >
              <div class="row mb-2" :key="questionsInfo[0].id">
                <div class="col">
                  <label for="Username">{{$t('question')}}</label>
                </div>
                <div class="col-12 col-md-6">
                  <BaseSelect
                    :options="questionsInfo"
                    identifier="id"
                    text="text"
                    v-model="securityInfo.question[index]"
                    :defaultValue="questionsInfo[0].id"
                  />
                </div>
              </div>
              <div class="row mb-2" :key="questionsInfo.id">
                <div class="col-12 col-md-6">
                  <label for="Display Name">{{$t('answer')}}</label>
                </div>
                <div class="col-12 col-md-6">
                  <BaseInput
                    @blur="$v.securityInfo.answer.$touch()" 
                    v-model.trim="securityInfo.answer[index]"/>
                </div>
              </div>
            </template>
            <div class="santander-security-pre_alert">
            <p v-if="securityInfo.submitError">{{$t('securityQuestionsError')}}</p>
            </div>
            <div class="row justify-content-end mb-2">
              <div class="col-sm-2 align-self-end">
                <BaseButton variant="primary">{{$t('save')}}</BaseButton>
              </div>
            </div>
          </div>
        </form>
      </section>
      <section class="santander-security-pre_section">
        <div class="santander-security-pre_section-name">
          <h3>{{$t('registeredComputers')}}</h3>
        </div>
        <div class="santander-security-pre_section-content p-3">
          <p>{{$t('unregisterDisclaimer')}}</p>
          <div class="row mb-2">
            <div class="col">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">{{$t('label')}}</th>
                    <th scope="col">{{$t('bindingType')}}</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="device in securityPreference.securityInfo.devicesInfo">
                    <tr :key="device.label">
                      <td>{{device.label}}</td>
                      <td>{{device.bindingType}}</td>
                      <td>
                        <BaseButton className="santander-security-pre_phone-delete" @click="unbindDeviceStart(device.label)"><img src="../../assets/delete.gif"></BaseButton>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <section class="santander-security-pre_section">
        <form @submit.prevent="startPhoneChanges">
          <div class="santander-security-pre_section-name">
            <h3>{{$t('registeredPhones')}}</h3>
          </div>
          <div class="santander-security-pre_section-content p-3">
            <p>{{$t('phonesDescription')}}</p>
          <template v-for="(phone, i) in $v.phones.$each.$iter">
            <div class="santander-security-pre_phone" :key="phone.$model.key">
              <div class="row mt-4">
                <div class="col-2 col-md-1 order-1 order-md-1 santander-security-pre_phone-item">
                  <input type="radio" :value="phone.$model.phoneNumber" v-model="preferred" :disabled="enablePhoneEdit">
                </div>
                <div class="col-8 col-md-4 order-2 order-md-2 santander-security-pre_phone-item">
                  <cool-select
                    v-model="phone.phoneCountryCode.$model"
                    :items="securityPreference.countryPrefixList.items || []"
                    item-value="countryPrefix"
                    item-text="countryName"
                    :disabled="enablePhoneEdit"
                  >
                    <p slot="item" slot-scope="{ item }">{{item.countryName}}</p>
                  </cool-select>
                    <div
                    class="santander-security-pre_alert"
                    role="alert"
                    v-if="!phone.phoneCountryCode.required"
                  ><p>{{$t('areaCodeError')}}</p></div>
                </div>
                <div class="col-6 col-md-4 offset-2 offset-md-0 order-4 order-md-3 santander-security-pre_phone-item">
                  <BaseInput
                    :disabled="enablePhoneEdit"
                    placeholder="Phone Number"
                    v-model="phone.$model.phoneNumber"
                  />
                  <div
                    class="santander-security-pre_alert"
                    role="alert"
                    v-if="!phone.phoneNumber.required"
                  ><p>{{t('phoneNumberError')}}</p></div>
                  <div
                    class="santander-security-pre_alert"
                    role="alert"
                    v-if="!phone.phoneNumber.numeric"
                  ><p>{{$t('numberOnlyError')}}</p></div>
                  <div
                    class="santander-security-pre_alert"
                    role="alert"
                    v-if="!phone.phoneNumber.maxLength"
                  ><p>{{$t('invalidPhone')}}</p></div>
                </div>
                <div class="col-4 col-md-2 order-5 order-md-4 santander-security-pre_phone-item">
                  <BaseInput
                    :disabled="enablePhoneEdit"
                    v-model="phones[i].extension"
                    placeholder="Ext."
                  />
                </div>
                <div class="col-2 col-md-1 order-3 order-md-4 santander-security-pre_phone-item">
                  <BaseButton className="santander-security-pre_phone-delete" :disabled="enablePhoneEdit" @click="phoneDelete(i)"><img src="../../assets/delete.gif"></BaseButton>
                </div>
              </div>
            </div>
          </template>
          <div class="mt-5 d-flex justify-content-around">
            <BaseButton variant="outline" @click.prevent="phonesEditHandle">{{$t('edit')}}</BaseButton>

            <BaseButton type="submit" variant="primary" :disabled="enablePhoneEdit">{{$t('save')}}</BaseButton>

            <BaseButton @click.prevent="phoneAddInputs" :disabled="enablePhoneEdit">Add</BaseButton>
          </div>
          </div>
        </form>
      </section>
    </div>
    <div class="santander-security-pre_footer">
    </div>
  </div>
</template>


<script src="./SecurityPreferences.js"></script>
<style src="./SecurityPreferences.css"></style>