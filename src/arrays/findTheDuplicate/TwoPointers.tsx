import React, { FC, useEffect } from 'react';
import gsap from 'gsap';
import './TwoPointers.scss';

const tl = gsap.timeline();

interface TwoPointersProps {
  array: number[];
}

export const TwoPointers: FC<TwoPointersProps> = ({ array }) => {
  const sorted = [...array].sort(ascending);
  const answer = findDuplicate(sorted);
  const answerIndex = sorted.findIndex((v) => v === answer);

  useEffect(() => {
    const arrayElements = Array.from(document.querySelectorAll('.element'));

    tl.from('.first', { xPercent: -100 })
      .from('.second', { xPercent: -100 }, '+=1')
      .from('.element-second', { opacity: 0, stagger: { amount: 1.5 } }, '+=1')
      .from('.third', { xPercent: -100 })
      .to('.pointer', {
        keyframes: arrayElements.slice(0, answerIndex).map((e) => {
          const { width } = e.getBoundingClientRect();

          return {
            x: `+=${width}`,
            duration: 0.1,
            delay: 0.5
          };
        }),
        onComplete: () => {
          gsap.fromTo(
            '.pointer.one, .pointer.two',
            { y: (i) => (i % 2 ? '+=10' : '-=10') },
            { y: (i) => (i % 2 ? '-=20' : '+=20'), repeat: -1, yoyo: true }
          );
        }
      })
      .from('.four', { xPercent: -100 });
  }, []);

  return (
    <div>
      <div className="first scene">
        <h4>Receive input</h4>
        <span>[{array.join(', ')}]</span>
      </div>

      <div className="second scene">
        <h4>Sort the array</h4>[
        {sorted.map((v, index) => (
          <span className="element-second" key={index}>
            {index < sorted.length - 1 ? `${v}, ` : v}
          </span>
        ))}
        ]
      </div>

      <div className="third scene">
        <div className="two-pointers">
          <h4>March two pointers until they're equal</h4>

          <span className="pointer one" />
          <span className="pointer two" />

          <div className="container">
            [
            {sorted.map((v, index) => {
              return (
                <span className="element" key={index}>
                  {index < sorted.length - 1 ? `${v}, ` : v}
                </span>
              );
            })}
            ]
          </div>
        </div>
      </div>

      <div className="four scene">
        <p>
          {answer !== null
            ? `Duplicate found: ${answer}`
            : 'No duplicate found in array'}
        </p>
      </div>
    </div>
  );
};

const ascending = (a: number, b: number) => (a < b ? -1 : a > b ? 1 : 0);

export const findDuplicate = (arr: number[]) => {
  let p1 = 0;
  let p2 = 1;

  while (p2 < arr.length) {
    if (arr[p1] === arr[p2]) {
      return arr[p1];
    }

    p1++;
    p2++;
  }

  return null;
};
