import React, { useState, useRef } from 'react';
import { apiUpdateLikes, apiUpdateReplys } from '@/api/message';
import SvgIcon from '@/components/svgIcon';
import { formatTime, formatNumber } from '@/utils/filter';
import useClickLikes from '@/useHooks/useClickLikes';
import CommentEditor from '../commentEditor';
import ReplyItem from '../replyItem';
import './commentItem.scss';

export default function CommentItem(props) {
  const { commentItem, initData } = props;
  const { getLikesNumber, getLikesColor, handleLikes } =
    useClickLikes(apiUpdateLikes);
  let [isEdit, setIsEdit] = useState(false);
  let [currentId, setCurrentId] = useState('');
  let [byReplyUser, setByReplyUser] = useState('');
  const editorRef = useRef();
  const colorList = [
    '#EB6841',
    '#3FB8AF',
    '#464646',
    '#FC9D9A',
    '#ED8901',
    '#C8C8A9',
    '#83AF9B',
    '#036564',
  ];
  // 点击回复
  const handleReply = (id, name) => {
    setIsEdit(!isEdit);
    setCurrentId(id);
    setByReplyUser(name);
  };
  // 添加回复
  const addReply = (replyItem) => {
    const params = {
      _id: currentId,
      replyTime: new Date().getTime() + '',
      replyContent: replyItem.content,
      replyUser: replyItem.nickname,
      byReplyUser,
      replyHeaderColor: colorList[Math.floor(Math.random() * 7)],
    };
    return apiUpdateReplys(params)
      .then(() => {
        editorRef.current.resetData();
        setIsEdit(false);
        initData();
      })
      .catch((err) => console.log(err))
      .finally(() => {});
  };

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
              <span>{isEdit ? '取消' : '回复'}</span>
              <span>
                {commentItem.replyList?.length
                  ? commentItem.replyList?.length
                  : ''}
              </span>
            </div>
          </div>
        </div>
      </div>
      {isEdit && <CommentEditor submitSuccess={addReply} ref={editorRef} />}
      <div className="reply-list">
        {commentItem.replyList.map((reply, index) => (
          <ReplyItem replyItem={reply} key={reply._id + index}></ReplyItem>
        ))}
      </div>
    </div>
  );
}
