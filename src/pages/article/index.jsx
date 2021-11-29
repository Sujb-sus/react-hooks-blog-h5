import React from 'react';
import { useParams } from 'react-router-dom';

export default function Article() {
  let params = useParams();
  console.log('params', params);
  return <div className="app-container">detail</div>;
}
