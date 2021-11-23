import SvgIcon from '@/components/svgIcon';
import { formatTime, formatNumber } from '@/utils/filter';

export default function ListItem(props) {
  let { item } = props;
  return (
    <>
      <div className="list-item">
        <div className="item-content">
          <img src={item.fileCoverImgUrl} />
          <div className="content-box">
            <div className="content-top">
              <div className="content-title">{item.title}</div>
              <div className="content-desc">{item.desc}</div>
            </div>
            <div className="content-label">
              {/* <div className="label-text">{item.type}</div> */}
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
          <div className="footer-item">
            <SvgIcon name="icon-like02" />
            <div className="footer-text">{formatNumber(item.likes)}</div>
          </div>
        </div>
      </div>
    </>
  );
}
