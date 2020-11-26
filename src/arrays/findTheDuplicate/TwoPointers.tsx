import React, { FC, useEffect } from 'react';
import gsap from 'gsap';
import './TwoPointers.scss';
import { TextPlugin } from 'gsap/all';

gsap.registerPlugin(TextPlugin);

interface TwoPointersProps {
  array: number[];
}

export const TwoPointers: FC<TwoPointersProps> = ({ array }) => {
  const sorted = [...array].sort(ascending);
  const result = findDuplicate(sorted);

  useEffect(() => {
    getAnimation(result);
  }, []);

  return (
    <div>
      <div className="first">
        <h4>Receive input</h4>
        <span>[{array.join(', ')}]</span>
      </div>

      <div className="second">
        <h4>Sort the array</h4>[
        {sorted.map((v, index) => (
          <span className="element-second" key={index}>
            {index < sorted.length - 1 ? `${v}, ` : v}
          </span>
        ))}
        ]
      </div>

      <div className="third">
        <div className="two-pointers">
          <h4>March two pointers until they're equal</h4>

          <span className="pointer one" />
          <span className="pointer two" />

          <div className="container">
            [
            {sorted.map((v, index) => (
              <span className="element" key={index}>
                {index < sorted.length - 1 ? `${v}, ` : v}
              </span>
            ))}
            ]
          </div>
        </div>
      </div>

      <div className="four">
        <p />
      </div>
    </div>
  );
};

const getAnimation = (result: Result) => {
  const tl = gsap.timeline();
  const arrayElements = Array.from(document.querySelectorAll('.element'));

  const baseAnimation = tl
    .from('.first', { xPercent: -100 })
    .from('.second', { xPercent: -100 }, '+=1')
    .from('.element-second', { opacity: 0, stagger: { amount: 1.5 } }, '+=1')
    .from('.third', { xPercent: -100 });

  if (result === null) {
    return baseAnimation
      .to('.pointer', {
        keyframes: marchPointers(arrayElements.slice(0, -2)),
        onComplete: () => bouncePointers
      })
      .from('.four', { xPercent: -100 })
      .to('.four p', { text: 'This array has no duplicates!' });
  }

  return baseAnimation
    .to('.pointer', {
      keyframes: marchPointers(arrayElements.slice(0, result.index)),
      onComplete: () => bouncePointers
    })
    .from('.four', { xPercent: -100 })
    .to('.four p', { text: `Answer: ${result.answer}` });
};

const bouncePointers = gsap.fromTo(
  '.pointer.one, .pointer.two',
  { y: (i) => (i % 2 ? '+=10' : '-=10') },
  { y: (i) => (i % 2 ? '-=20' : '+=20'), repeat: -1, yoyo: true }
);

const marchPointers = (arrayElements: Element[]) =>
  arrayElements.map((e) => {
    const { width } = e.getBoundingClientRect();

    return {
      x: `+=${width}`,
      duration: 0.1,
      delay: 0.5
    };
  });

const ascending = (a: number, b: number) => (a < b ? -1 : a > b ? 1 : 0);

type Result = null | { answer: number; index: number };

export const findDuplicate = (arr: number[]): Result => {
  let p1 = 0;
  let p2 = 1;

  while (p2 < arr.length) {
    if (arr[p1] === arr[p2]) {
      return { answer: arr[p1], index: p1 };
    }

    p1++;
    p2++;
  }

  return null;
};
