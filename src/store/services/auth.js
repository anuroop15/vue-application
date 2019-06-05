import api from './api';

export const GetCompanyInfoList = (locale) =>{
    return api({
        url:`${locale}/security/json/GetCompanyInfoList`,
        method: 'post',
    })
}

export const LoginWebStart = (data)=>{
    return api({
        url: '/security/json/LoginWebStart',
        method:'post',
        data: data
    })
}

export const LoginWebBindCurrentDevice = (data, locale)=>{
    return api({
        url:`${locale}/security/json/LoginWebBindCurrentDevice`,
        method: 'post',
        data: data
    })
}

export const Logout = (locale) =>{
    return api({
        url: `${locale}/security/json/Logout`,
        method: 'post'
    })
}