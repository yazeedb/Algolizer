import React, { useEffect, useReducer, useState } from 'react';
import gsap from 'gsap';
import './App.css';
import { TwoPointers } from './arrays/findTheDuplicate/TwoPointers';

const input = [3, 7, 5, 1, 9, 5, 6, 2, 4, 8];
const sorted = [...input].sort((a, z) => a - z);

export type FinalAnswer = string;

type State = {
  scene: Scene;
  finalAnswer: FinalAnswer;
};

type Scene = 'first' | 'second' | 'third' | 'fourth';

type Action =
  | { type: 'PLAY_TWO_POINTERS' }
  | { type: 'SCENE_END'; finalAnswer: FinalAnswer };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'PLAY_TWO_POINTERS':
      return {
        ...state,
        scene: 'third'
      };

    case 'SCENE_END':
      return {
        ...state,
        scene: 'fourth',
        finalAnswer: action.finalAnswer
      };
  }
};

const initialState: State = {
  scene: 'first',
  finalAnswer: ''
};

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
