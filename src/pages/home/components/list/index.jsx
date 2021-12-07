import React, { useState, useEffect, useRef } from 'react';
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
  let [hasMore, setHasMore] = useState(false);
  let total = useRef(-1);
  let pageindex = useRef(1);
  let pagesize = 10;

  // 监听label页传params参数
  useEffect(() => {
    // params参数变化，需要重置pageindex
    pageindex.current !== 1 && (pageindex.current = 1);
    handleLoadMore();
  }, [props.params]);

  // 滚动加载文章列表
  const handleLoadMore = async (reload = true) => {
    try {
      if (reload) {
        base.showLoading();
        pageindex.current = 1; // 下拉刷新重置pageindex
      }
      const res = await apiGetBlogList({
        pageindex: pageindex.current,
        pagesize,
        ...props.params,
      });
      reload && base.hideLoading();
      pageindex.current === 1
        ? setList(res?.data?.list)
        : setList((val) => [...val, ...res?.data?.list]);
      setHasMore(pageindex.current * pagesize < res?.data?.total);
      total.current = res?.data?.total;
      pageindex.current++;
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div className="list-container">
      {!props.hideTitle && (
        <div className="list-title">
          <SvgIcon name="icon-label01" />
          <span>最新文章({total.current})</span>
        </div>
      )}

      <PullToRefresh onRefresh={handleLoadMore}>
        {total.current > 0 &&
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
      {!total.current && <NoData />}
    </div>
  );
};
export default List;
