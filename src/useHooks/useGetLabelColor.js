import { useCallback } from 'react';
import { useSelector } from 'react-redux';
/**
 * 封装获取标签背景色逻辑
 * @description 文章Item、文章详情Detail
 */
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
