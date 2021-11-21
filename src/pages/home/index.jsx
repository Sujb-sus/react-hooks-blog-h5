import Intro from './components/intro';
import List from './components/list';

export default function Home() {
  return (
    <>
      <div className="app-container">
        <Intro></Intro>
        <List></List>
      </div>
    </>
  );
}
