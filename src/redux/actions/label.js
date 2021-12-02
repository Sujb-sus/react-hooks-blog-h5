import { SET_LABEL_LIST } from '../constant';
import { apiGetLabelList } from '@/api/label';

export const setLabelList = (data) => ({ type: SET_LABEL_LIST, data });
//异步action，就是指action的值为函数,异步action中一般都会调用同步action，异步action不是必须要用的。
export const getLabelList = () => {
  return (dispatch) => {
    let params = {
      pageindex: 1,
      pagesize: 50,
    };
    apiGetLabelList(params)
      .then((res) => {
        dispatch(setLabelList(res?.data?.list));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
