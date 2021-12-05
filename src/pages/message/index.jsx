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
  let [total, setTotal] = useState(-1);
  let [replyCount, setReplyCount] = useState(0);
  let [hasMore, setHasMore] = useState(false);
  let editorRef = useRef();
  let pagesize = 10;

  useEffect(() => {
    pageindex === 1 && initData();
  }, [pageindex]);
  // 初始化数据
  const initData = () => {
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
        pageindex,
        pagesize,
      });
      pageindex === 1
        ? setCommentList(res?.data?.list)
        : setCommentList((val) => [...val, ...res?.data?.list]);
      setTotal(res?.data?.total);
      setHasMore(pageindex * pagesize < res?.data?.total);
      setPageindex(pageindex + 1);
    } catch (error) {
      console.log('error', error);
    }
  };
  // 获取回复数量
  const getReplyCount = () => {
    return apiGetReplyCount().then((res) => {
      setReplyCount(res?.data[0]?.replyCount);
    });
  };
  // 添加留言内容
  const addMessage = (params) => {
    base.showLoading();
    return apiAddMessage(params)
      .then(() => {
        editorRef.current.resetData();
        setPageindex(1);
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
        {total > 0 &&
          commentList.map((item) => (
            <CommentItem
              commentItem={item}
              key={item._id}
              setPageindex={setPageindex}></CommentItem>
          ))}
        <InfiniteScroll loadMore={handleLoadMore} hasMore={hasMore} />
        {!total && <NoData />}
      </div>
    </div>
  );
};
export default Message;
