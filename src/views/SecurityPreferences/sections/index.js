import Vue from "vue";
import UserName from "./UserName";
import ChangePassword from "./ChangePassword";
import SecurityQuestions from "./SecurityQuestions";
import Devices from "./Devices";
import Phones from "./Phones";
import Site2User from "./Site2User";

const sectionsMap = {
  USER_PASSWORD: ChangePassword,
  SECURITY_QUESTIONS: SecurityQuestions,
  SITE_TO_USER: Site2User,
  PHONES: Phones,
  DEVICES: Devices
};

export default Vue.component("Sections", {
  functional: true,
  props: {
    sections: {
      type: Array,
      required: true
    }
  },
  render: function(h, context) {
    if (context.props.sections) {
      return h("div", [
        context.props.sections.map(s => {
          if (s === "USER_PASSWORD") {
            return h("div", [h(UserName), h(ChangePassword)]);
          } else {
            return h(sectionsMap[s]);
          }
        })
      ]);
    } else {
      return h("div", [h(UserName)]);
    }
  }
});
