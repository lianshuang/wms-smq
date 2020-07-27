//api.js

import http from './request.js'
// 登录
export const login = params => http.post(`auth/login/`, params)
export const getInfo = params => http.get(`auth/info/`, params)