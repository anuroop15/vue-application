import {debugExeption} from './common';
import i18n from '../../i18n';
export const handleError = fn => (...params) =>fn(...params).catch((err)=>{
    debugExeption(err);
    let error = {
      title: "Error",
      body: i18n.t('networkError')
    };
    params.commit("SET_ACTION_NOTIFY", error);
})
