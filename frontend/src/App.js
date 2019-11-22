import React from 'react';
import Bubble from './components/MainBubble'
import './App.css';

const users = [
  {
    name: 'Artur',
    id: 1,
  },
  {
    name: 'Tomek',
    id: 0,
  },
  {
    name: 'Christian',
    id: 2,
  }
]

function App() {
  return (
    <div className="App">
      <Bubble title="Appjobs" color="#f7a504" users={users}/>
    </div>
  );
}

export default App;
