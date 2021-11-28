import React, { useState, useEffect } from 'react';
import { InfiniteScroll, PullToRefresh } from 'antd-mobile';
import SvgIcon from '@/components/svgIcon';
import NoData from '@/components/noData';
import ListItem from '../listItem';
import { apiGetBlogList } from '@/api/blog';
import base from '@/utils/base';
import './list.scss';

export default function List(props) {
  let [list, setList] = useState([]);
  let [pageindex, setPageindex] = useState(1);
  let [total, setTotal] = useState(0);
  let [hasMore, setHasMore] = useState(false);
  let pagesize = 10;

  useEffect(() => {
    getBlogList(pageindex === 1);
  }, [pageindex]);

  useEffect(() => {
    console.log('props.params', props.params);
    setPageindex(1);
  }, [props.params]);

  // 获取文章列表
  const getBlogList = (reload = true) => {
    reload && base.showLoading();
    return apiGetBlogList({
      pageindex,
      pagesize,
      ...props.params,
    })
      .then((res) => {
        if (pageindex === 1) {
          setList(res?.data?.list);
        } else {
          setList(list.concat(res?.data?.list));
        }
        setTotal(res?.data?.total);
        setHasMore(pageindex * pagesize < res?.data?.total);
      })
      .catch((err) => console.log('err', err))
      .finally(() => {
        reload && base.hideLoading();
      });
  };
  // 下拉刷新
  const handlePullToRefresh = () => {
    setPageindex(1);
  };
  // 滚动加载
  const handleLoadMore = () => {
    setPageindex(pageindex + 1);
  };

  return (
    <>
      <div className="list-container">
        {props.showTitle && (
          <div className="list-title">
            <SvgIcon name="icon-label01" />
            <span>最新文章({total})</span>
          </div>
        )}

        <PullToRefresh onRefresh={handlePullToRefresh}>
          {list.length ? (
            list.map((item) => <ListItem item={item} key={item._id} />)
          ) : (
            <NoData />
          )}
          <InfiniteScroll loadMore={handleLoadMore} hasMore={hasMore} />
        </PullToRefresh>
      </div>
    </>
  );
}
