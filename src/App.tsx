import React, { useEffect, useReducer } from 'react';
import gsap from 'gsap';
import './App.css';
import { TwoPointers } from './arrays/findTheDuplicate/TwoPointers';
import { reducer, initialState, input, sorted } from './state';

const tl = gsap.timeline({ delay: 0.5 });

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    tl.from('.first', { xPercent: -100 })
      .from('.second', { xPercent: -100 }, '+=1')
      .from('.element', { opacity: 0 }, '+=1')
      .from(
        '.third',
        {
          xPercent: -100,
          onStart: () => dispatch({ type: 'PLAY_TWO_POINTERS' })
        },
        '+=1'
      )
      .addPause()
      .from('.four', { xPercent: -100 }, '+=1');
  }, []);

  useEffect(() => {
    if (state.scene !== 'fourth') {
      return;
    }

    tl.play();
  }, [state.scene]);

  return (
    <main>
      <div className="first">
        <h4>Receive input</h4>[{input.join(', ')}]
      </div>

      <div className="second">
        <h4>Sort the array</h4>[
        {sorted.map((v, index) => (
          <span className="element">
            {v} {index !== sorted.length - 1 && ', '}
          </span>
        ))}
        ]
      </div>

      <div className="third">
        <TwoPointers
          sortedArray={sorted}
          start={state.scene === 'third'}
          onComplete={(finalAnswer) =>
            dispatch({ type: 'SCENE_END', finalAnswer })
          }
        />
      </div>

      <div className="four">
        <h4>The duplicate number is {state.finalAnswer}</h4>
      </div>
    </main>
  );
};

export default App;
