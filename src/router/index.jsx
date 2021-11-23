import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '@/pages/home';
import Label from '@/pages/label';
import Message from '@/pages/message';
import Myself from '@/pages/myself';
import Article from '@/pages/article';
import Tabbar from '@/components/tabbar';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Tabbar />}>
          <Route path="home" element={<Home />}></Route>
          <Route path="label" element={<Label />}></Route>
          <Route path="message" element={<Message />}></Route>
          <Route path="myself" element={<Myself />}></Route>
        </Route>
        <Route path="/article/detail" element={<Article />}></Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
