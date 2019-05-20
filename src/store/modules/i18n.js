import {isValidLocale} from '../utils'

export const i18n = {
    namespaced: true,
    state: {
        locale: 'en'
    },
    mutations:{
        CHANGE_LOCALE(state, locale) {
            state.locale = locale;
        }
    },
    actions:{
        changeLocale({commit},locale){
            if(isValidLocale(locale)){
                commit('CHANGE_LOCALE', locale)
            } else {
                commit('CHANGE_LOCALE', 'en')
            }
        }
    },
}