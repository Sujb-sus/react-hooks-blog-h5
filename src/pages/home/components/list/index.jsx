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
  let [total, setTotal] = useState(0);
  let [hasMore, setHasMore] = useState(true);
  let [hasFirst, setHasFirst] = useState(true);
  let pagesize = 10;
  // 分页加载文章数据
  useEffect(() => {
    getBlogList(pageindex === 1);
  }, [pageindex]);
  // 作为子组件接收参数，刷新列表
  useEffect(() => {
    if (props.params && !hasFirst) {
      pageindex === 1 ? getBlogList(true) : setPageindex(1);
    }
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
          setHasFirst(false);
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
  const handleLoadMore = async () => {
    setPageindex(pageindex + 1);
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
        {list.length > 0 ? (
          list.map((item) => (
            <Link to={`/article/detail/${item._id}`} key={item._id}>
              <ListItem item={item} />
            </Link>
          ))
        ) : (
          <NoData />
        )}
        {list.length > 0 && (
          <InfiniteScroll loadMore={handleLoadMore} hasMore={hasMore} />
        )}
      </PullToRefresh>
    </div>
  );
};
export default List;
