import { useCallback } from 'react';
import { useSelector } from 'react-redux';

export default function useGetLabelColor() {
  const labelList = useSelector((state) => state.label);
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
}
