
export let global_url = 'http://manage.zhengfx.com/api/';
export let header = {
	'Authorization': 'Bearer ' + tokon
}


export function get(url,data){
    return request('get',{},global_url+url,data)
}

export function post(url,data){
    let header = {
        "content-type":'application/x-www-form-urlencoded'
    }
    return request('post',header,global_url+url,data)
}

function request(requestParams){
	const {method='get',header,url,data} = requestParams
    return new Promise((resolve,reject) => {
        uni.request({
            header:header,
            url:url,
            data:method==='post'?data:null,
            method:method,
            dataType:'json',
            success(e) {
                resolve(e);
            },
            fail(e) {
                reject(e)
            }
        })
    })
}