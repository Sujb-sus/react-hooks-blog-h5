import React, { useState, useEffect } from 'react';
import { apiUpdateLikes, apiUpdateReplys } from '@/api/message';
import SvgIcon from '@/components/svgIcon';
import { formatTime, formatNumber } from '@/utils/filter';
import useClickLikes from '@/useHooks/useClickLikes';
import ReplyItem from '../replyItem';
import './commentItem.scss';

export default function CommentItem(props) {
  const { commentItem } = props;
  let { getLikesNumber, getLikesColor, handleLikes } =
    useClickLikes(apiUpdateLikes);
  let [hasEdit, setHasEdit] = useState(false);
  const handleReply = () => {};

  return (
    <div className="comment-item">
      <div className="comment-part">
        <div className="item-img" style={{ color: commentItem.headerColor }}>
          <SvgIcon name="icon-user03"></SvgIcon>
        </div>
        <div className="item-box">
          <div className="box-title">
            {commentItem.nickname}
            <span>
              {formatTime(commentItem.createTime, 'yyyy-MM-dd hh:mm')}
            </span>
          </div>
          <div
            className="box-content"
            dangerouslySetInnerHTML={{ __html: commentItem.content }}></div>
          <div className="item-icon">
            <div
              className={`box-icon ${
                getLikesColor(commentItem._id) ? 'icon-likes' : ''
              }`}
              onClick={() => handleLikes(commentItem._id)}>
              <SvgIcon name="icon-like02"></SvgIcon>
              <span>
                {formatNumber(
                  getLikesNumber(commentItem._id, commentItem.likes)
                )}
              </span>
            </div>
            <div
              className="box-icon box-reply"
              onClick={() =>
                handleReply(commentItem._id, commentItem.nickname)
              }>
              <SvgIcon name="icon-reply02"></SvgIcon>
              <span>{hasEdit ? '取消' : '回复'}</span>
              <span>
                {commentItem.replyList?.length
                  ? commentItem.replyList?.length
                  : ''}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* <CommentEditor
      v-show="isEdit"
      @submitSuccess="addReply"
      ref="editorRef"
    ></CommentEditor> */}
      <div className="reply-list">
        {commentItem.replyList.map((reply, index) => (
          <ReplyItem replyItem={reply} key={reply._id + index}></ReplyItem>
        ))}
      </div>
    </div>
  );
}
