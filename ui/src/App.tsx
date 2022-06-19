import './App.css';
import React, { useEffect } from "react";
import useFeedStore from './store/feedStore';
import FeedView from './views/FeedView';

function App() {
  const { init } = useFeedStore();

  useEffect(() => {
    init()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="App">
      <FeedView />
    </div>
  );
}

export default App;
