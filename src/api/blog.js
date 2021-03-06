import axios from '@/utils/request';
/**
 * 获取博客列表
 * @param data
 * @returns {AxiosPromise}
 */
export function apiGetBlogList(params) {
  return axios.get('/blog/list', params);
}
/**
 * 获取博客详情
 * @param data
 * @returns {AxiosPromise}
 */
export function apiGetBlogDetail(params) {
  return axios.get('/blog/info', params);
}
/**
 * 点赞
 * @param data
 * @returns {AxiosPromise}
 */
export function apiUpdateLikes(params) {
  return axios.post('/blog/updateLikes', params);
}
/**
 * 浏览量
 * @param data
 * @returns {AxiosPromise}
 */
export function apiUpdatePV(params) {
  return axios.post('/blog/updatePV', params);
}
