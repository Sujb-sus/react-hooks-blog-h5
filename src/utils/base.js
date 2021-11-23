import { Toast } from 'antd-mobile';

function showLoading() {
  Toast.show({
    maskClickable: false,
    duration: 0,
    icon: 'loading',
  });
}

function hideLoading() {
  Toast.clear();
}
export default {
  showLoading,
  hideLoading,
};
