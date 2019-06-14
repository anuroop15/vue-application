/* eslint-disable */
import qs from 'qs';
import { logClientSideInfo } from "../services";

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
export const getErrorMessage = response =>{
  let message = '<ul>';
  let hasError = false;
  for(let actionMessage in response.actionMessages){
    hasError = true;
    message += '<li>';
    message += response.actionMessages[actionMessage];
    message += '</li>';
  }
  for(let actionError in response.actionErrors){
    hasError = true;
    message += '<li>';
    message += response.actionErrors[actionError];
    message += '</li>';
  }
  for(let fieldError in response.fieldErrors){
    hasError = true;
    message += '<li>';
    message += response.fieldErrors[fieldError];
    message += '</li>';
  }
  message +='</ul>';
  return hasError ? messege : '';
}
export const randomString = (string_length) => {
  let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  let randomstring = '';
  for (var i=0; i<string_length; i++) {
    var rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum,rnum+1);
  }
  return randomstring;
}
export const debugExeption = (e, origen, other) => {
  try {
    var myLog = new Array();
    myLog.push("Exception at " + origen + " e= " + e);
    for (let i in e) {
      myLog.push("e[" + i + "] = " + e[i]);
      if (
        i == "message" &&
        e[i] ==
          "TypeError: Argument 1 of Window.getComputedStyle does not implement interface Element."
      ) {
        myLog.push("Window.getComputedStyle error detected, no need to follow");
        return;
      }
    }

    /*
     * To avoid javascript errors in Chrome for iPhone
     */
    if (e.stack && e.stack.indexOf("extractNewForms") >= 0) {
      myLog.push("extractNewForms error detected, no need to follow");
      return;
    }

    /*
     * To avoid javascript errors in Chrome for iPhone
     */
    if (e.stack && e.stack.indexOf("findPasswordForms") >= 0) {
      myLog.push("findPasswordForms error detected, no need to follow");
      return;
    }

    if (e.stack && e.stack.indexOf("createEventObject") >= 0) {
      myLog.push("createEventObject error detected, no need to follow");
      return;
    }

    try {
      if (e && e.response && e.response.getHeader)
        myLog.push("X-UNIQUE_ID = " + e.response.getHeader("X-UNIQUE_ID"));
    } catch (e0) {}

    try {
      if (e && e.stack) myLog.push("e.stack = " + e.stack);
    } catch (e0) {}

    try {
      if (other) {
        for (var i in other) {
          myLog.push("other[" + i + "] = " + other[i]);

          if (
            i == "errorMsg" &&
            other[i] == "Uncaught Error: Error calling method on NPObject."
          ) {
            myLog.push("NPObject error detected, no need to follow");
            return;
          }
        }
      }
    } catch (e1) {}

    var hrefPage = window.location.href;
    myLog.push("hrefPage = " + hrefPage);
    try {
      myLog.push("userAgent = " + navigator.userAgent);
    } catch (e4) {}
    logClientSideInfo(doPlain(myLog), true);
  } catch (e2) {}
};

export const doPlain = function(myObject, preffix, o, options) {
      let config = { allowDots: true , indices: false }
      try {
        o = o || {};
      } catch (e) {
        o = {};
      }
      if(options){
        config = Object.assign({},options, config)
      }

      if (preffix) {
       o[preffix]=myObject;
      } else {
        o = myObject;
      }
      if(o.indices){
        return qs.stringify(o, { allowDots: true });
      } else {
        return qs.stringify(o, config);
      }
  };
  