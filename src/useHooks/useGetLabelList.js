import { useEffect } from 'react';
import { getLabelList } from '@/redux/actions/label';
import { useSelector, useDispatch } from 'react-redux';

export default function useGetLabelList() {
  const labelList = useSelector((state) => state.label);
  const dispatch = useDispatch();
  // 获取标签数据，存储到redux
  useEffect(() => {
    if (!labelList.length) {
      dispatch(getLabelList());
    }
  }, []);
}
