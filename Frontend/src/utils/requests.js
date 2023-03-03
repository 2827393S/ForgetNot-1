import React from 'react'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.headers.post["Content-Type"] = "application/json"
axios.defaults.timeout = 100000
axios.defaults.baseURL = "http://localhost:8000/"

/**
 * get method - > get requests
 * @param {String} url
 * @param {Object} params
 */
export function get(url, params){
    return new Promise((resolve, reject) =>{
        axios.get(url, {
            params: params,
            withCredentials:true
        }).then(res => {
            resolve(res.data);
        }).catch(err =>{
            reject(err.data)
        })
    });
}
/**
 * post method -> post requests
 * @param {String} url
 * @param {Object} params
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params,{
            withCredentials:true
        })
            .then(res => {
                resolve(res.data);
            })
            .catch(err =>{
                reject(err.data)
            })
    });
}
export default {
    get,
    post
};
