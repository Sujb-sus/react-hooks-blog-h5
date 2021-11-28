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

function toast(content) {
  Toast.show({
    content,
  });
}
export default {
  toast,
  showLoading,
  hideLoading,
};
