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
  let [hasMore, setHasMore] = useState(false);
  let editorRef = useRef();
  let pageindex = useRef(1);
  let replyCount = useRef(0);
  let total = useRef(-1);
  let pagesize = 10;

  useEffect(() => {
    initData();
  }, []);
  // 初始化数据
  const initData = () => {
    pageindex.current = 1;
    base.showLoading();
    Promise.all([handleLoadMore(), getReplyCount()])
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        base.hideLoading();
      });
  };
  // 滚动加载留言列表
  const handleLoadMore = async () => {
    try {
      const res = await apiGetMessageList({
        pageindex: pageindex.current,
        pagesize,
      });
      total.current = res?.data?.total;
      pageindex.current === 1
        ? setCommentList(res?.data?.list)
        : setCommentList((val) => [...val, ...res?.data?.list]);
      setHasMore(pageindex.current * pagesize < res?.data?.total);
      pageindex.current++;
    } catch (error) {
      console.log('error', error);
    }
  };
  // 获取回复数量
  const getReplyCount = () => {
    return apiGetReplyCount().then((res) => {
      replyCount.current = res?.data[0]?.replyCount;
    });
  };
  // 添加留言内容
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
          <span>{total.current}</span>条评论， <span>{replyCount.current}</span>
          条回复
        </div>
        {total.current > 0 &&
          commentList.map((item) => (
            <CommentItem
              commentItem={item}
              key={item._id}
              initMessageData={initData}></CommentItem>
          ))}
        <InfiniteScroll loadMore={handleLoadMore} hasMore={hasMore} />
        {!total.current && <NoData />}
      </div>
    </div>
  );
};
export default Message;
