import React, { useEffect, useReducer } from 'react';
import gsap from 'gsap';
import './App.css';
import { TwoPointers } from './arrays/findTheDuplicate/TwoPointers';
import { reducer, initialState, input, sorted } from './state';

const tl = gsap.timeline({ defaults: { xPercent: -100 } });

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    tl.from('.first', {})
      .from('.second', {}, '+=1')
      .from('.element', { opacity: 0, stagger: { amount: 3 } }, '+=1')
      .from('.third', {
        xPercent: -100,
        onStart: () => dispatch({ type: 'PLAY_TWO_POINTERS' })
      })
      .addPause()
      .from('.four', {});
  }, []);

  useEffect(() => {
    if (state.scene !== 'fourth') {
      return;
    }

    tl.play();
  }, [state.scene]);

  return (
    <main>
      <div className="first scene">
        <h4>Receive input</h4>
        <span>[{input.join(', ')}]</span>
      </div>

      <div className="second scene">
        <h4>Sort the array</h4>[
        {sorted.map((v, index) => (
          <span className="element" key={index}>
            {v} {index !== sorted.length - 1 && ', '}
          </span>
        ))}
        ]
      </div>

      <div className="third scene">
        <TwoPointers
          sortedArray={sorted}
          start={state.scene === 'third'}
          onComplete={(finalAnswer) =>
            dispatch({ type: 'SCENE_END', finalAnswer })
          }
        />
      </div>

      <div className="four scene">
        <p>
          {state.finalAnswer !== null
            ? `Duplicate found: ${state.finalAnswer}`
            : 'No duplicate found in array'}
        </p>
      </div>
    </main>
  );
};

export default App;
