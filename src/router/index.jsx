import React from 'react';
import { lazy, Suspense } from 'react';
import { Loading } from 'antd-mobile';
import { useRoutes } from 'react-router-dom';
import Tabbar from '@/components/tabbar';
import NotFound from '@/components/notFound';

const Home = lazy(() => import('@/pages/home'));
const Label = lazy(() => import('@/pages/label'));
const Message = lazy(() => import('@/pages/message'));
const Myself = lazy(() => import('@/pages/myself'));
const Article = lazy(() => import('@/pages/article'));
// 路由懒加载，需配合Suspense使用
const lazyLoad = (children) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

const AppRouter = () => {
  return useRoutes([
    {
      path: '/',
      exact: true,
      element: <Tabbar />,
      children: [
        {
          path: 'home',
          element: lazyLoad(<Home />),
        },
        {
          path: 'label',
          element: lazyLoad(<Label />),
        },
        {
          path: 'message',
          element: lazyLoad(<Message />),
        },
        {
          path: 'myself',
          element: lazyLoad(<Myself />),
        },
      ],
    },
    { path: '/article/detail/:id', element: lazyLoad(<Article />) },
    { path: '*', element: <NotFound /> },
  ]);
};

export default AppRouter;
