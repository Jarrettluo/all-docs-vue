import axios from 'axios'
import Vue from 'vue';
// import store from '../store';
import router from '../router/index';

let vm = new Vue();

const instance = axios.create({
    // baseURL: 'http://81.69.247.172:8082',
    baseURL: 'http://localhost:8082',
    timeout: 100000,
    headers: {
        post: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }
})

// 请求拦截
instance.interceptors.request.use(config => {
    // 自定义header，可添加项目token
    // if (store.state.app.token) {
    //   config.headers.token = store.state.app.token;
    //   config.headers.timestamp = new Date().getTime();
    // }
    if (localStorage.getItem("token")) {
        config.headers.authorization = localStorage.getItem("token");
        config.headers.id = localStorage.getItem("id")
        config.headers.username = localStorage.getItem("username")
    }
    return config;
}, error => {
    return Promise.reject(error);
})

// 响应拦截
instance.interceptors.response.use(response => {
    const resCode = response.status;
    if (resCode === 200) {
        return Promise.resolve(response);
    } else if (resCode === 401) {
        // this.$route().push()

        return Promise.reject(response);
    } else {
        return Promise.reject(response);
    }

}, error => {
    const resCode = error.response.status;
    switch (resCode) {
        case 401:
            vm.$Notice.error({
                title: '权限不足',
                desc: '你没有登录，或者权限不足，请登录！'
            });
            setTimeout(() => {
                router.replace({
                    name: 'Login'
                }).then(r => console.log(r));
            }, 3000)
            break;
        case 404:
            vm.$Message.error('网络请求不存在');
            break;
        case 500:
            vm.$Message.error('服务器连接错误');
            break;
        // 其他状态码错误提示
        default:
            vm.$Message.error(error.response.data.message);
    }
    return Promise.reject(error);
})

/*
 *封装get方法
 *@param{String} url [请求地址]
 *@param{Object} params 请求参数
 */
export function Get(url, params) {
    return new Promise((resolve, reject) => {
        instance.get(url, {
            params: params
        }).then((res) => {
            resolve(res.data);
        }).catch((error) => {
            reject(error.data);
        })
    })
}

/*
 *封装get方法
 *@param{String} url [请求地址]
 *@param{Object} params 请求参数
 */
export function Download(url, config) {
    return new Promise((resolve, reject) => {
        instance.get(url, config).then((res) => {
            resolve(res.data);
        }).catch((error) => {
            reject(error.data);
        })
    })
}


/**
 *封装post方法
 *@param{String} url 请求地址
 *@param{Object} params 请求参数
 */
export function Post(url, params) {
    return new Promise((resolve, reject) => {
        instance.post(url, params).then((res) => {
            resolve(res.data);
        }).catch((error) => {
            reject(error.data);
        })
    })
}

/**
 *封装put方法
 *@param{String} url 请求地址
 *@param{Object} params 请求参数
 */
export function Put(url, params) {
    return new Promise((resolve, reject) => {
        instance.put(url, params).then((res) => {
            resolve(res.data);
        }).catch((error) => {
            reject(error.data);
        })
    })
}

/**
 *封装patch方法
 *@param{String} url 请求地址
 *@param{Object} params 请求参数
 */
export function Patch(url, params) {
    return new Promise((resolve, reject) => {
        instance.put(url, params).then((res) => {
            resolve(res.data);
        }).catch((error) => {
            reject(error.data);
        })
    })
}

/**
 *封装delete方法
 *@param{String} url [请求地址]
 *@param{Object} params [请求参数]
 */
export function Delete(url, params) {
    return new Promise((resolve, reject) => {
        instance.delete(url, {data: params}).then((res) => {
            resolve(res.data);
        }).catch((error) => {
            reject(error.data);
        })
    })
}