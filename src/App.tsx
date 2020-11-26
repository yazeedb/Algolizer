import React, { useEffect } from 'react';
import gsap from 'gsap';
import './App.css';
import {
  findDuplicate,
  TwoPointers
} from './arrays/findTheDuplicate/TwoPointers';
import { input, sorted } from './state';

const tl = gsap.timeline();

const App = () => {
  const answer = findDuplicate(sorted);
  const answerIndex = sorted.findIndex((v) => v === answer);

  useEffect(() => {
    const arrayElements = Array.from(document.querySelectorAll('.element'));

    tl.from('.first', { xPercent: -100 })
      .from('.second', { xPercent: -100 }, '+=1')
      .from('.element-second', { opacity: 0, stagger: { amount: 1.5 } }, '+=1')
      .from('.third', { xPercent: -100 })
      .to('.pointers', {
        keyframes: arrayElements.slice(0, answerIndex).map((e) => {
          const { width } = e.getBoundingClientRect();

          return {
            x: `+=${width}`,
            duration: 0.1,
            delay: 0.5
          };
        })
      })
      .from('.four', { xPercent: -100 })
      .fromTo(
        '.pointer.one',
        { y: '+=10', repeat: -1, yoyo: true, repeatDelay: 0 },
        { y: '-=20', repeat: -1, yoyo: true, repeatDelay: 0 }
      )
      .fromTo(
        '.pointer.two',
        { y: '-=10', repeat: -1, yoyo: true, repeatDelay: 0 },
        { y: '+=20', repeat: -1, yoyo: true, repeatDelay: 0 },
        '<'
      );
  }, []);

  return (
    <main>
      <div className="first scene">
        <h4>Receive input</h4>
        <span>[{input.join(', ')}]</span>
      </div>

      <div className="second scene">
        <h4>Sort the array</h4>[
        {sorted.map((v, index) => (
          <span className="element-second" key={index}>
            {v} {index !== sorted.length - 1 && ', '}
          </span>
        ))}
        ]
      </div>

      <div className="third scene">
        <TwoPointers sortedArray={sorted} />
      </div>

      <div className="four scene">
        <p>
          {answer !== null
            ? `Duplicate found: ${answer}`
            : 'No duplicate found in array'}
        </p>
      </div>
    </main>
  );
};

export default App;
