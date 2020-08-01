const ENV = process.env.NODE_ENV; 
// console.log('当前环境', process.env.NODE_ENV)

const apiHub = {
    //开发环境
    development: {
        BASE_URL: "http://127.0.0.1:8000/", 
        IMG_URL: "https://xx",
        BASE_UPLOAD_URL: "",
    },

    //测试环境
    test: {
        BASE_URL: "http://127.0.0.1:8000/",
        IMG_URL: "https://xxx",
        BASE_UPLOAD_URL: "",
    },

    //生产环境
    production: {
        BASE_URL: "http://manage.zhengfx.com/",
        IMG_URL: "https://xx",
        BASE_UPLOAD_URL: "",
    }
}

// 导出配置
export default {
    ENV: ENV,
    ...apiHub[ENV]
}