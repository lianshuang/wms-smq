//api.js

import http from './request.js'
// 登录
export const login = params => http.post(`auth/login/`, params || {})
export const getInfo = params => http.get(`auth/info/`, params || {})


// 统一获取当前用户当前操作所在步骤
export const getStep = params => http.post(`api/scanner/get_step/`, params)


// 统一进行回车下一步操作
export const nextStep = params => http.post(`api/scanner/next_step/`, params || {})


// 拣选跳过
export const pick_ship_pick_order = params => http.post(`api/scanner/pick_ship_pick_order/`, params || {})

// 查询sku库存
export const sku_search = params => http.post(`api/scanner/sku_search/`, params || {})

// 查询库位库存
export const position_search = params => http.post(`api/scanner/position_search/`, params || {})