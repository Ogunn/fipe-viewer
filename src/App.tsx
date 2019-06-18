import React from 'react';
import logo from './logo.svg';
import './App.css';
import SearchPanel from './components/SearchPanel';

const App: React.FC = () => {
  return (
    <div className="App">
      <SearchPanel />
    </div>
  );
};

export default App;
