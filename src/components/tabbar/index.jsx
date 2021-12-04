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

export default function FixedBottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const setRouteActive = (path) => {
    navigate(path);
  };

  const tabs = [
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
}
