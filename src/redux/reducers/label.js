import { SET_LABEL_LIST } from '../constant';

const initState = [];
// 存储label数据
const label = (preState = initState, action) => {
  const { type, data } = action;
  switch (type) {
    case SET_LABEL_LIST:
      return data;
    default:
      return preState;
  }
};
export default label;
