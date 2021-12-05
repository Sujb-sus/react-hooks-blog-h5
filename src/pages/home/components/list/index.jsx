import React, { useState, useEffect } from 'react';
import { InfiniteScroll, PullToRefresh } from 'antd-mobile';
import { Link } from 'react-router-dom';
import SvgIcon from '@/components/svgIcon';
import NoData from '@/components/noData';
import ListItem from '../listItem';
import { apiGetBlogList } from '@/api/blog';
import base from '@/utils/base';
import './list.scss';

const List = (props) => {
  let [list, setList] = useState([]);
  let [pageindex, setPageindex] = useState(1);
  let [total, setTotal] = useState(-1);
  let [hasMore, setHasMore] = useState(false);
  let [isFirst, setIsFirst] = useState(true); // 是否首次加载
  let pagesize = 10;

  // 兼容label页传值场景
  useEffect(() => {
    pageindex === 1 && handleLoadMore();
  }, [pageindex]);
  // 监听label页传下来的值，重新更新列表
  useEffect(() => {
    if (!isFirst && props.params) {
      pageindex === 1 ? handleLoadMore() : setPageindex(1);
    }
  }, [props.params]);
  // 滚动加载文章列表
  const handleLoadMore = async (reload = true) => {
    try {
      reload && base.showLoading();
      const res = await apiGetBlogList({
        pageindex,
        pagesize,
        ...props.params,
      });
      reload && base.hideLoading();
      setIsFirst(false);
      pageindex === 1
        ? setList(res?.data?.list)
        : setList((val) => [...val, ...res?.data?.list]);
      setTotal(res?.data?.total);
      setHasMore(pageindex * pagesize < res?.data?.total);
      setPageindex(pageindex + 1);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div className="list-container">
      {!props.hideTitle && (
        <div className="list-title">
          <SvgIcon name="icon-label01" />
          <span>最新文章({total})</span>
        </div>
      )}

      <PullToRefresh onRefresh={() => setPageindex(1)}>
        {total > 0 &&
          list.map((item) => (
            <Link to={`/article/detail/${item._id}`} key={item._id}>
              <ListItem item={item} />
            </Link>
          ))}
        <InfiniteScroll
          loadMore={() => handleLoadMore(false)}
          hasMore={hasMore}
        />
      </PullToRefresh>
      {!total && <NoData />}
    </div>
  );
};
export default List;
