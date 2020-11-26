import React from 'react';
import './App.css';
import { TwoPointers } from './arrays/findTheDuplicate/TwoPointers';

const App = () => {
  return (
    <main>
      <TwoPointers array={[8, 4, 10, 2, 1, 7, 3, 5, 8]} />
    </main>
  );
};

export default App;
