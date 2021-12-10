import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import './labelSelect.scss';

const LabelSelect = (props) => {
  let { params, setParams } = props;
  let labelList = useSelector((state) => state.label);
  let activeIndex = useRef(-1);
  let labelName = useRef('');

  // 选择label类型
  const handleLabel = (index, label) => {
    let name = activeIndex.current === index && labelName.current ? '' : label;
    activeIndex.current = index;
    labelName.current = name;
    params.type = name;
    setParams({ ...params });
  };

  return (
    <div className="label-box">
      {labelList.map((item, index) => (
        <div
          className={`label-text ${
            activeIndex.current === index &&
            labelName.current &&
            'label-text__active'
          }`}
          key={item.label}
          onClick={() => handleLabel(index, item.label)}
          style={{
            backgroundColor:
              activeIndex.current === index && labelName.current
                ? item.bgColor
                : '#fff',
          }}>
          {item.label}
        </div>
      ))}
    </div>
  );
};
export default LabelSelect;
