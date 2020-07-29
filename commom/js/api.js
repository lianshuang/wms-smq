//api.js

import http from './request.js'
// 登录
export const login = params => http.post(`auth/login/`, params || {})
export const getInfo = params => http.get(`auth/info/`, params || {})


// 统一获取当前用户当前操作所在步骤
export const getStep = params => http.post(`api/scanner/get_step/`, params)


// 统一进行回车下一步操作
export const nextStep = params => http.post(`api/scanner/next_step/`, params || {})
