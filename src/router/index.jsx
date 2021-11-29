import { lazy, Suspense } from 'react';
import { Loading } from 'antd-mobile';
import { useRoutes } from 'react-router-dom';

import Tabbar from '@/components/tabbar';
import Article from '@/pages/article';
const Home = lazy(() => import('@/pages/home'));
const Label = lazy(() => import('@/pages/label'));
const Message = lazy(() => import('@/pages/message'));
const Myself = lazy(() => import('@/pages/myself'));

const lazyLoad = (children) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

const AppRouter = () => {
  return useRoutes([
    {
      path: '/',
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
    { path: '/article/detail/:id', element: <Article /> },
  ]);
};

export default AppRouter;
