import React from 'react';
import noData from '@/assets/no-data.jpg';

const NoData = () => {
  return (
    <div className="no-data">
      <img src={noData} alt="no-data" />
    </div>
  );
};
export default NoData;
