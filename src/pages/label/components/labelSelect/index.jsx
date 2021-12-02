import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './labelSelect.scss';

export default function LabelSelect(props) {
  let { params, setParams } = props;
  const labelList = useSelector((state) => state.label);
  let [activeIndex, setActiveIndex] = useState(-1);
  let [labelName, setLabelName] = useState('');

  const handleLabel = (index, label) => {
    let name = activeIndex === index && labelName ? '' : label;
    setActiveIndex(index);
    setLabelName(name);
    params.type = name;
    setParams({ ...params });
  };
  return (
    <div className="label-body">
      <div className="label-box">
        {labelList.map((item, index) => (
          <div
            className={`label-text ${
              activeIndex === index && labelName ? 'label-text__active' : ''
            }`}
            key={item.label}
            onClick={() => handleLabel(index, item.label)}
            style={{
              backgroundColor:
                activeIndex === index && labelName ? item.bgColor : '#fff',
            }}>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
