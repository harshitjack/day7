import React, { useState } from 'react';
import FacialExpression from './components/FacialExpression';
import MoodSongs from './components/MoodSongs';
import './App.css';

function App() {
  const [songs, setSongs] = useState([
 
  ]);

  return (
    <>
      <FacialExpression setSongs={setSongs} />
      <MoodSongs songs={songs} />
    </>
  );
}

export default App;
