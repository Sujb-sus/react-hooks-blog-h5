import React, { useState } from 'react';
import SvgIcon from '@/components/svgIcon';
import { Tabs, Search } from 'antd-mobile';
import List from '../home/components/list';
import LabelSelect from './components/labelSelect';
import useGetLabelList from '@/useHooks/useGetLabelList';
import './label.scss';

const Label = () => {
  useGetLabelList();
  const tabList = [
    { title: '全部', key: '' },
    { title: '推荐', key: 'level' },
    { title: '最新', key: 'releaseTime' },
    { title: '最热', key: 'pv' },
    { title: '最赞', key: 'likes' },
  ];
  const [params, setParams] = useState({
    keyword: '',
    sortBy: '',
    type: '',
    isMobile: true,
  });

  // 切换tab事件
  const handleChangeTab = (key) => {
    params.sortBy = key;
    setParams({ ...params });
  };
  // 搜索内容事件
  const handleSearch = (keyword) => {
    params.keyword = keyword;
    setParams({ ...params });
  };

  return (
    <div className="common-pb">
      <Search
        placeholder="请输入搜索关键词"
        clearOnCancel
        onSearch={handleSearch}
      />

      <LabelSelect params={params} setParams={setParams} />

      <Tabs
        onChange={handleChangeTab}
        style={{
          '--title-font-size': '14px',
        }}>
        {tabList.map((item) => (
          <Tabs.Tab title={item.title} key={item.key} />
        ))}
      </Tabs>
      <List hideTitle={true} params={params} />
    </div>
  );
};
export default Label;
