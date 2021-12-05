import SvgIcon from '@/components/svgIcon';
import { formatTime } from '@/utils/filter';
import './replyItem.scss';

const ReplyItem = (props) => {
  const { replyItem } = props;
  return (
    <div className="reply-item">
      <div className="item-img" style={{ color: replyItem.replyHeaderColor }}>
        <SvgIcon name="icon-user02"></SvgIcon>
      </div>
      <div className="reply-box">
        <div className="box-content">
          <div className="reply-user">
            <span className="reply-name">{replyItem.replyUser}</span>
            <span className="by-reply-name"> @ {replyItem.byReplyUser}：</span>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: replyItem.replyContent }}
            className="reply-content"></div>
        </div>
        <div className="reply-date">
          {formatTime(replyItem.replyTime, 'yyyy-MM-dd hh:mm:ss')}
        </div>
      </div>
    </div>
  );
};
export default ReplyItem;
