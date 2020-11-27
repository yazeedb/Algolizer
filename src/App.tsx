import React from 'react';
import './App.css';
import { BruteForce } from './arrays/findTheDuplicate/BruteForce';
import { TwoPointers } from './arrays/findTheDuplicate/TwoPointers';

const App = () => {
  return (
    <main>
      {/* <TwoPointers array={[4, 10, 2, 1, 3, 5, 5, 8, 7]} /> */}
      <BruteForce array={[1, 2, 3, 4, 5, 6, 76, 8]} />
    </main>
  );
};

export default App;
