import React from 'react';

const SvgIcon = (prop) => {
  let iconName = `#${prop.name}`;
  return (
    <svg className="icon" aria-hidden="true">
      <use xlinkHref={iconName}></use>
    </svg>
  );
};
export default React.memo(SvgIcon);
