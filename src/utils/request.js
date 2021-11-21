import axios from 'axios';
import qs from 'qs';

axios.defaults.withCredentials = true;
// 发送时
axios.interceptors.request.use(
  (config) => config,
  (err) => Promise.reject(err)
);

// 响应时
axios.interceptors.response.use(
  (response) => response,
  (err) => Promise.resolve(err.response)
);

// 检查状态码
function checkStatus(res) {
  if (res.status === 200 || res.status === 304) {
    return res.data;
  }
  return {
    code: 0,
    msg: res.statusText,
    data: res.statusText,
  };
}

// 检查CODE值
function checkCode(res) {
  if (res.code === 0) {
    throw new Error(res.msg);
  }
  return res;
}

function get(url, params) {
  return axios({
    method: 'get',
    url: prefix + url,
    params,
    timeout: 30000,
  })
    .then(checkStatus)
    .then(checkCode);
}

function post(url, data) {
  return axios({
    method: 'post',
    url: prefix + url,
    data: qs.stringify(data),
    timeout: 30000,
  })
    .then(checkStatus)
    .then(checkCode);
}

const prefix = '/client_api';

export default {
  get,
  post,
};
