import React, { useState } from 'react';
import { Tabs, Search } from 'antd-mobile';
import List from '../home/components/list';
import './label.scss';

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

  const handleSearch = (keyword) => {
    console.log('keyword', keyword);
    params.keyword = keyword;
    setParams({ ...params });
  };
  return (
    <div className="app-container">
      <Search
        placeholder="请输入搜索关键词"
        showCancelButton
        clearOnCancel
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
      <List hideTitle={true} params={params}></List>
    </div>
  );
}
