import React, { useEffect } from 'react';
import { getLabelList } from '@/redux/actions/label';
import { useDispatch } from 'react-redux';
import Intro from './components/intro';
import List from './components/list';

export default function Home() {
  // 获取标签数据，存储到redux
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLabelList());
  }, []);
  return (
    <div className="app-container">
      <Intro></Intro>
      <List></List>
    </div>
  );
}
