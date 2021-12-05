import React, { useState, useEffect, useRef } from 'react';
import SvgIcon from '@/components/svgIcon';
import CommentItem from './components/commentItem';
import CommentEditor from './components/commentEditor';
import { InfiniteScroll } from 'antd-mobile';
import {
  apiGetMessageList,
  apiGetReplyCount,
  apiAddMessage,
} from '@/api/message';
import base from '@/utils/base';
import NoData from '@/components/noData';
import './message.scss';

const Message = () => {
  let [commentList, setCommentList] = useState([]);
  let [pageindex, setPageindex] = useState(1);
  let [total, setTotal] = useState(0);
  let [replyCount, setReplyCount] = useState(0);
  let [hasMore, setHasMore] = useState(false);
  let editorRef = useRef();
  let pagesize = 10;

  // 分页加载留言数据
  useEffect(() => {
    pageindex === 1 ? initData() : getMessageList();
  }, [pageindex]);

  // 获取留言列表
  const getMessageList = () => {
    return apiGetMessageList({
      pageindex,
      pagesize,
    }).then((res) => {
      if (pageindex === 1) {
        setCommentList(res?.data?.list);
      } else {
        setCommentList(commentList.concat(res?.data?.list));
      }
      setTotal(res?.data?.total);
      setHasMore(pageindex * pagesize < res?.data?.total);
    });
  };
  // 获取回复数量
  const getReplyCount = () => {
    return apiGetReplyCount().then((res) => {
      setReplyCount(res?.data[0]?.replyCount);
    });
  };
  const initData = () => {
    base.showLoading();
    Promise.all([getMessageList(), getReplyCount()])
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        base.hideLoading();
      });
  };
  // 添加留言
  const addMessage = (params) => {
    base.showLoading();
    return apiAddMessage(params)
      .then(() => {
        editorRef.current.resetData();
        initData();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        base.hideLoading();
      });
  };
  return (
    <div className="app-container">
      <CommentEditor submitSuccess={addMessage} ref={editorRef} />
      <div className="comment-list">
        <div className="side-title">
          <SvgIcon name="icon-comment"></SvgIcon>
          <span>{total}</span>条评论， <span>{replyCount}</span>条回复
        </div>
        {commentList.length > 0 ? (
          commentList.map((item) => (
            <CommentItem
              commentItem={item}
              key={item._id}
              initData={initData}></CommentItem>
          ))
        ) : (
          <NoData />
        )}
        {commentList.length > 0 && (
          <InfiniteScroll
            loadMore={() => setPageindex(pageindex + 1)}
            hasMore={hasMore}
          />
        )}
      </div>
    </div>
  );
};
export default Message;
