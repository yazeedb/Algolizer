import React, { useEffect, useReducer } from 'react';
import gsap from 'gsap';
import './App.css';
import { TwoPointers } from './arrays/findTheDuplicate/TwoPointers';
import { reducer, initialState, input, sorted } from './state';

const tl = gsap.timeline();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    tl.from('.first', { xPercent: -100 })
      .from('.second', { xPercent: -100 }, '+=1')
      .from('.element', { opacity: 0, stagger: { amount: 3 } })
      .from('.third', {
        xPercent: -100,
        onStart: () => dispatch({ type: 'PLAY_TWO_POINTERS' })
      })
      .addPause()
      .from('.four', { xPercent: -100 });
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
        <h4>Receive input</h4>[{input.join(', ')}]
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
          Duplicate number: <b>{state.finalAnswer}</b>
        </p>
      </div>
    </main>
  );
};

export default App;
