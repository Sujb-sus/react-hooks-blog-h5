import { useEffect } from 'react';
/**
 * 封装页面的title值
 */
const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};
export default useDocumentTitle;
