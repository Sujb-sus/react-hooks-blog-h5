import { SET_LABEL_LIST } from '../constant';

const initState = [];

export default function label(preState = initState, action) {
  const { type, data } = action;
  switch (type) {
    case SET_LABEL_LIST:
      return data;
    default:
      return preState;
  }
}
