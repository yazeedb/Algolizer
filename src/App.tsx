import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import './App.css';
import { TwoPointers } from './arrays/findTheDuplicate/TwoPointers';

const input = [3, 7, 5, 1, 9, 5, 6, 2, 4, 8];
const sorted = [...input].sort((a, z) => a - z);

const App = () => {
  const [showLast, setShowLast] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.set('.first', { y: -100, display: 'block' });
    tl.to('.first', { y: 0, duration: 2, ease: 'elastic' });

    tl.to(
      '.second',
      {
        display: 'block',
        y: 20,
        duration: 2,
        ease: 'elastic'
      },
      '+=2'
    ).then(() => setShowLast(true));

    tl.to(
      '.third',
      {
        display: 'block',
        y: 40,
        duration: 2,
        ease: 'elastic'
      },
      '+=2'
    );
  }, []);

  return (
    <main>
      <div className="first hide">
        <h4>Receive input</h4>[{input.join(', ')}]
      </div>
      <div className="second hide">
        <h4>Sort the array</h4>[{sorted.join(', ')}]
      </div>
      <div className="third">
        {showLast && <TwoPointers sortedArray={sorted} />}
      </div>
    </main>
  );
};

export default App;
