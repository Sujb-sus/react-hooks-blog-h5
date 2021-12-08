import React from 'react';
import Intro from './components/intro';
import List from './components/list';
import useGetLabelList from '@/useHooks/useGetLabelList';

const Home = () => {
  useGetLabelList();
  return (
    <div className="common-pb">
      <Intro></Intro>
      <List></List>
    </div>
  );
};
export default Home;
