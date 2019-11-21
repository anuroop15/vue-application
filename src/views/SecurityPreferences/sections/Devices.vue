<template>
  <section class="banking-security-pre_section">
    <div class="banking-security-pre_section-name">
      <h3>{{$t('registeredComputers')}}</h3>
    </div>
    <div class="banking-security-pre_section-content p-3">
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
              <template v-for="(device, i) in securityPreference.securityInfo.devicesInfo">
                <tr :key="device.label">
                  <td>{{device.label}}</td>
                  <td>{{device.bindingType}}</td>
                  <td>
                    <BaseButton
                      class="banking-security-pre_phone-delete"
                      @click="unbindDeviceStart(device.label, i)"
                    >
                      <img src="../../../assets/delete.gif">
                    </BaseButton>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { en, es, pt } from "../i18n";
export default {
  name: "Devices",
  i18n: {
    messages: {
      en,
      es,
      pt
    }
  },
  data() {
    return {
      unbindSelected: {}
    };
  },
  methods: {
    unbindDeviceStart(label, index) {
      this.unbindSelected = {label,index};
      this.$vuedals.open({
        title: "Confirmation",
        size: "sm",
        component: {
          name: "prompt-modal-security",

          render: h => {
            return h("div", { style: "padding:0!important" }, [
              h(
                "p",
                { style: "padding:20px" },
                this.$t("confirmDeleteDevice", { label: label })
              ),
              h("div", { class: "banking-security-pre_footer" }, [
                h(
                  "BaseButton",
                  {
                    on: { click: this.unbindDeviceCancel },
                    props: {
                      variant: "outline",
                      className: "ml-3"
                    }
                  },
                  this.$t("cancel")
                ),
                h(
                  "BaseButton",
                  {
                    on: { click: this.unbindDeviceProcess },
                    props: { variant: "outline", className: "ml-3" }
                  },
                  "OK"
                )
              ])
            ]);
          }
        }
      });
    },
    unbindDeviceProcess() {
      this.$vuedals.close();
      this.deleteDevice(this.unbindSelected);
      this.unbindSelected = "";
    },
    unbindDeviceCancel() {
      this.$vuedals.close();
      this.unbindSelected = "";
    },
    ...mapActions("securityPreference", ["deleteDevice"])
  },
  computed: {
    ...mapState(["securityPreference"])
  }
};
</script>
