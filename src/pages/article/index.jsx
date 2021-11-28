import React from 'react';
import { Tabs } from 'antd-mobile';

export default function Article() {
  const tabList = [
    { title: '全部', key: '' },
    { title: '推荐', key: 'level' },
    { title: '最新', key: 'releaseTime' },
    { title: '最热', key: 'pv' },
    { title: '最赞', key: 'likes' },
  ];
  return (
    <Tabs>
      {tabList.map((item) => (
        <Tabs.Tab title={item.title} key={item.key} />
      ))}
    </Tabs>
  );
}
