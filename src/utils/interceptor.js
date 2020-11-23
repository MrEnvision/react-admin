import axios from 'axios';
import { message } from 'antd';
import { getToken, getUsername } from './cookie';

// 第一步：创建实例
const service = axios.create({
  // baseURL: "/devApi",
  baseURL: process.env.REACT_APP_API,
  timeout: 5000,
});

// 第二步：请求拦截
service.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么 - 请求头添加内容，权限验证
    config.headers['Token'] = getToken();
    config.headers['Username'] = getUsername();
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 第三步：响应拦截
service.interceptors.response.use(
  (response) => {
    // httpCode为200时，对响应数据做点什么
    const data = response.data;
    // 约定resCode为0时，表示请求成功
    if (data.resCode === 0) {
      return response;
    }
    // 约定resCode不为0时，表示请求出现问题
    message.info(data.message); // 全局的错误拦截提示
    return Promise.reject(response); // 进入下方的逻辑，等同于httpCode不为200
  },
  (error) => {
    // httpCode不为200时，对响应错误做点什么
    return Promise.reject(error);
  }
);

export default service;
