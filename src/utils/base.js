import { Toast } from 'antd-mobile';

const showLoading = () => {
  Toast.show({
    maskClickable: false,
    duration: 0,
    icon: 'loading',
    content: '加载中...',
  });
};

const hideLoading = () => {
  Toast.clear();
};

const toast = (content) => {
  Toast.show({
    content,
  });
};
export default {
  toast,
  showLoading,
  hideLoading,
};
