import Vue from "vue";
import VueI18n from 'vue-i18n';
import en from './en';
import es from './es';
import pt from './pt';

Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: 'en',
    messages:{
       en,
       es,
       pt,
      }
  });

export default i18n;