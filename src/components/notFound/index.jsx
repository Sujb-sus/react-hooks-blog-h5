import React from 'react';
import notFound from '@/assets/not-found.jpeg';

const NotFound = () => {
  return (
    <div className="no-data">
      <img src={notFound} alt="no-data" />
    </div>
  );
};
export default NotFound;
