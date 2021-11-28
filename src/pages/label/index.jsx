import React, { useState, useRef } from 'react';
import { Tabs, Search } from 'antd-mobile';
import List from '../home/components/list';
export default function Label() {
  const tabList = [
    { title: '全部', key: '' },
    { title: '推荐', key: 'level' },
    { title: '最新', key: 'releaseTime' },
    { title: '最热', key: 'pv' },
    { title: '最赞', key: 'likes' },
  ];
  let [params, setParams] = useState({
    keyword: '',
    sortBy: '',
    type: '',
    isMobile: true,
  });
  // 点击tab
  const handleChange = (key) => {
    params.sortBy = key;
    setParams({ ...params });
  };

  const searchRef = useRef(null);
  const handleSearch = (keyword) => {
    console.log('keyword', keyword);
    params.keyword = keyword;
    setParams({ ...params });
  };
  return (
    <>
      <Search
        placeholder="请输入内容"
        ref={searchRef}
        onSearch={handleSearch}
        onCancel={handleSearch}
      />

      <Tabs
        onChange={handleChange}
        style={{
          '--title-font-size': '14px',
        }}>
        {tabList.map((item) => (
          <Tabs.Tab title={item.title} key={item.key} />
        ))}
      </Tabs>
      <List showTitle={false} params={params}></List>
    </>
  );
}
