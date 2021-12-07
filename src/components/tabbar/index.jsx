import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppOutline,
  FillinOutline,
  UserOutline,
  TagOutline,
} from 'antd-mobile-icons';
import { TabBar } from 'antd-mobile';
import { Outlet } from 'react-router-dom';
import './tabbar.scss';

const FixedBottomNavigation = () => {
  let tabs = [
    {
      path: '/home',
      title: '首页',
      icon: <AppOutline />,
    },
    {
      path: '/label',
      title: '标签',
      icon: <TagOutline />,
    },
    {
      path: '/message',
      title: '留言',
      icon: <FillinOutline />,
    },
    {
      path: '/myself',
      title: '关于我',
      icon: <UserOutline />,
    },
  ];
  let navigate = useNavigate();
  let location = useLocation();
  let { pathname } = location;
  let index = tabs.findIndex((item) => item.path === pathname);
  document.title = tabs[index].title;

  // 路由跳转
  const setRouteActive = (path) => {
    navigate(path);
  };
  return (
    <>
      <Outlet />
      <TabBar
        className="tabbar-footer btm-btn-bar-ipx"
        activeKey={pathname}
        onChange={(value) => {
          setRouteActive(value);
        }}>
        {tabs.map((item) => (
          <TabBar.Item key={item.path} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </>
  );
};
export default FixedBottomNavigation;
