import { useCallback } from 'react';
import { useSelector } from 'react-redux';

const useGetLabelColor = () => {
  let labelList = useSelector((state) => state.label);

  // 获取标签颜色
  const getLabelColor = useCallback(
    (labelName) => {
      if (labelList.length) {
        let labelIndex = 0;
        labelList.forEach((item, index) => {
          if (labelName === item.label) {
            labelIndex = index;
          }
        });
        return labelList[labelIndex].bgColor;
      }
      return '';
    },
    [labelList]
  );

  return {
    getLabelColor,
  };
};
export default useGetLabelColor;
