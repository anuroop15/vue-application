<template>
  <div class="container-fluid santander-security-pre_container">
    <div class="santander-security-pre_header">
      <p>Security Preferences</p>
    </div>
    <div class="santander-security-pre_content">
      <section class="santander-security-pre_section">
        <div class="santander-security-pre_section-name">
          <h3>Username</h3>
        </div>
        <div class="santander-security-pre_section-content p-2">
          <div class="row mb-2">
            <div class="col">
              <label for="Username">Username</label>
            </div>
            <div class="col">
              <BaseInput v-model="securityPreference.userName" disabled/>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col">
              <label for="User Login Name">User Login Name</label>
            </div>
            <div class="col">
              <BaseInput v-model="securityPreference.userLoginName"/>
            </div>
          </div>
          <div class="row justify-content-end mb-2">
            <div class="col-sm-2 align-self-end">
              <BaseButton @click="updateUserLoginName">Save</BaseButton>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col">
              <label for="Display Name">Display Name</label>
            </div>
            <div class="col">
              <BaseInput v-model="securityPreference.displayName"/>
            </div>
          </div>
          <div class="row justify-content-end mb-2">
            <div class="col-sm-2 align-self-end">
              <BaseButton @click="updateOwnDisplayName">Save</BaseButton>
            </div>
          </div>
        </div>
      </section>
      <section class="santander-security-pre_section">
        <div class="santander-security-pre_section-name">
          <h3>Change Password</h3>
        </div>
        <div class="santander-security-pre_section-content p-2">
          <div class="row mb-2">
            <div class="col">
              <label for="Username">Old password</label>
            </div>
            <div class="col">
              <BaseInput type="password"/>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col">
              <label for="User Login Name">New password</label>
            </div>
            <div class="col">
              <BaseInput type="password"/>
            </div>
          </div>
          <div class="row mb-2">
            <div class="col">
              <label for="Display Name">Verify password</label>
            </div>
            <div class="col">
              <BaseInput type="password"/>
            </div>
          </div>
          <div class="row justify-content-end mb-2">
            <div class="col-sm-2 align-self-end">
              <BaseButton>Save</BaseButton>
            </div>
          </div>
        </div>
      </section>
      <section class="santander-security-pre_section">
        <div class="santander-security-pre_section-name">
          <h3>Security Questions</h3>
        </div>
        <div class="santander-security-pre_section-content p-2">
          <template v-for="questionsInfo in securityPreference.securityInfo.questionsInfo">
            <div class="row mb-2" :key="questionsInfo[0].id">
              <div class="col">
                <label for="Username">Question</label>
              </div>
              <div class="col">
                <BaseSelect
                  :options="questionsInfo"
                  identifier="id"
                  text="text"
                  :defaultValue="questionsInfo[0].id"
                />
              </div>
            </div>
            <div class="row mb-2" :key="questionsInfo[1].id">
              <div class="col">
                <label for="Display Name">Answer</label>
              </div>
              <div class="col">
                <BaseInput/>
              </div>
            </div>
          </template>
          <div class="row justify-content-end mb-2">
            <div class="col-sm-2 align-self-end">
              <BaseButton>Save</BaseButton>
            </div>
          </div>
        </div>
      </section>
      <section class="santander-security-pre_section">
        <div class="santander-security-pre_section-name">
          <h3>Registered Computers</h3>
        </div>
        <div class="santander-security-pre_section-content p-2">
          <p>If at anytime you would like to unregister any or all of your computers (for example, if you buy a new home computer), select an option below and click Unregister</p>
          <div class="row mb-2">
            <div class="col">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Label</th>
                    <th scope="col">Binding Type</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="device in securityPreference.securityInfo.devicesInfo">
                    <tr :key="device.label">
                      <td>{{device.label}}</td>
                      <td>{{device.bindingType}}</td>
                      <td>
                        <BaseButton @click="unbindDeviceStart(device.label)">X</BaseButton>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <section class="santander-security-pre_section" style="margin-bottom:40px;">
        <div class="santander-security-pre_section-name">
          <h3>Registered Phones</h3>
        </div>
        <div class="santander-security-pre_section-content p-2">
          <p>The updated telephone numbers will be used by the Bank for security procedures. Please select your preferred phone number using the check on the left.</p>
        </div>
        <template v-for="phone in securityPreference.phones">
          <div class="santander-security-pre_phone" :key="phone.key">
            <div class="row mt-4">
              <div class="col">
                <BaseSelect
                  placeholder="Country Prefix"
                  v-model="phone.phoneCountryCode"
                  :disabled="enablePhoneEdit"
                  :options="securityPreference.countryPrefixList.items || []"
                  :defaultValue="phone.phoneCountryCode"
                  keyI="uniqueId"
                  identifier="countryPrefix"
                  text="countryName"
                />
              </div>
            </div>
            <div class="row mt-4">
              <div class="col-sm-6">
                <BaseInput :disabled="enablePhoneEdit"  placeholder="Phone Number" v-model="phone.phoneNumber"/>
              </div>
              <div class="col-sm-4">
                <BaseInput :disabled="enablePhoneEdit" placeholder="Ext."/>
              </div>
              <div class="col-sm-2">
                <BaseButton :disabled="enablePhoneEdit" @click="phoneDelete(phone.key)">-</BaseButton>
              </div>
            </div>
          </div>
        </template>
        <div class="mt-5 d-flex justify-content-around">
          <BaseButton @click="phonesEditHandle">Edit</BaseButton>

          <BaseButton :disabled="enablePhoneEdit" >Save</BaseButton>

          <BaseButton @click="phoneAddInputs" :disabled="enablePhoneEdit" >Add</BaseButton>
        </div>
      </section>
    </div>
    <BaseButton @click="startChallengeDemo">StartChallenge</BaseButton>
  </div>
</template>


<script src="./SecurityPreferences.js"></script>
<style scoped src="./SecurityPreferences.css"></style>
