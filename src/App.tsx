import React from 'react';
import './App.css';
import { TwoPointers } from './arrays/findTheDuplicate/TwoPointers';

const App = () => {
  return (
    <main>
      <TwoPointers array={[4, 10, 2, 1, 3, 5, 8, 7]} />
    </main>
  );
};

export default App;
