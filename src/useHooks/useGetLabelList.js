import { useEffect } from 'react';
import { getLabelList } from '@/redux/actions/label';
import { useSelector, useDispatch } from 'react-redux';

const useGetLabelList = () => {
  let labelList = useSelector((state) => state.label);
  let dispatch = useDispatch();

  // 获取标签数据，存储到redux
  useEffect(() => {
    if (!labelList.length) {
      dispatch(getLabelList());
    }
  }, []);
};
export default useGetLabelList;
