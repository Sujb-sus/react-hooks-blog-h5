import React from 'react';
import SvgIcon from '@/components/svgIcon';
import { formatTime, formatNumber } from '@/utils/filter';
import useGetLabelColor from '@/useHooks/useGetLabelColor';
import { useNavigate } from 'react-router-dom';

const ListItem = (props) => {
  const { item } = props;
  const { getLikesNumber, getLikeColor, handleLikes } = props;
  const { getLabelColor } = useGetLabelColor();
  const navigate = useNavigate();

  return (
    <div
      className="list-item"
      onClick={() => navigate(`/article/detail/${item._id}`)}>
      <div className="item-content">
        <img src={item.fileCoverImgUrl} />
        <div className="content-box">
          <div className="content-top">
            <div className="content-title">{item.title}</div>
            <div className="content-desc">{item.desc}</div>
          </div>
          <div className="content-label">
            {item.type.map((label) => (
              <div
                className="label-text"
                style={{ backgroundColor: getLabelColor(label) }}
                key={label}>
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="item-footer">
        <div className="footer-item">
          <SvgIcon name="icon-date02" />
          <div className="footer-text">{formatTime(item.releaseTime)}</div>
        </div>
        <div className="footer-item">
          <SvgIcon name="icon-browse02" />
          <div className="footer-text">{formatNumber(item.pv)}</div>
        </div>
        <div
          className={`footer-item ${getLikeColor(item._id) && 'icon-likes'}`}
          onClick={(e) => handleLikes(e, item._id)}>
          <SvgIcon name="icon-like02" />
          <div className="footer-text">
            {formatNumber(getLikesNumber(item._id, item.likes))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ListItem;
