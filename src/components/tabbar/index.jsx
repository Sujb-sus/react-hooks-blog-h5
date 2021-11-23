import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppOutline,
  FillinOutline,
  UserOutline,
  TagOutline,
} from 'antd-mobile-icons';
import { TabBar } from 'antd-mobile';
import { Outlet } from 'react-router-dom';
import './tabbar.scss';

export default function FixedBottomNavigation() {
  let [key, setKey] = useState('/home');
  const navigate = useNavigate();
  useEffect(() => {
    navigate(key);
  }, [key]);

  const tabs = [
    {
      key: '/home',
      title: '首页',
      icon: <AppOutline />,
    },
    {
      key: '/label',
      title: '标签',
      icon: <TagOutline />,
    },
    {
      key: '/message',
      title: '留言',
      icon: <FillinOutline />,
    },
    {
      key: '/myself',
      title: '关于我',
      icon: <UserOutline />,
    },
  ];
  return (
    <>
      <Outlet />
      <TabBar
        className="tabbar-footer btm-btn-bar-ipx"
        activeKey={key}
        onChange={(newKey) => {
          setKey(newKey);
        }}>
        {tabs.map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </>
  );
}
