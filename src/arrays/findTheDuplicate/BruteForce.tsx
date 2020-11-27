import React, { FC, useEffect } from 'react';
import gsap from 'gsap';
import './TwoPointers.scss';

interface BruteForceProps {
  array: number[];
}

export const BruteForce: FC<BruteForceProps> = ({ array }) => {
  const result = findDuplicate(array);

  useEffect(() => {
    getAnimation(result);
  }, [result]);

  return (
    <div>
      <div className="first">
        <h4>Receive input</h4>
        <span>[{array.join(', ')}]</span>
      </div>

      <div className="second">
        <div className="two-pointers">
          <h4>For each number, search for a duplicate</h4>

          <span className="pointer one" />
          <span className="pointer two" />

          <div className="container">
            [
            {array.map((v, index) => (
              <span className="element" key={index}>
                {index < array.length - 1 ? `${v}, ` : v}
              </span>
            ))}
            ]
          </div>
        </div>
      </div>

      <div className="third">
        <p />
      </div>
    </div>
  );
};

const runCourse = (
  elements: Element[],
  startingIndex: number,
  limit: number
) => {
  const tl = gsap.timeline({ paused: true });

  return tl.to('.pointer.two', {
    // keyframes: elements.slice(startingIndex, -2).map((e) => {
    keyframes: elements.map((e) => {
      const { width } = e.getBoundingClientRect();

      return {
        x: `+=${width}`,
        duration: 1,
        delay: 1
      };
    })
  });
};

const getAnimation = (result: Result) => {
  const tl = gsap.timeline();
  const arrayElements = Array.from(document.querySelectorAll('.element'));

  const baseAnimation = tl
    .set('.pointer', { y: 0 })
    .from('.first', { xPercent: -100 })
    .from('.second', { xPercent: -100 }, '+=1');

  if (result === null) {
    const pointerTwoTimeline = gsap.timeline();

    tl.add(pointerTwoTimeline);

    pointerTwoTimeline.to('.pointer.two', {
      keyframes: arrayElements
        .slice(0, -2)
        .map((e) => {
          return {
            x: () => e.getBoundingClientRect().x + 10,
            duration: 0.1,
            delay: 0.5
          };
        })
        .concat(
          arrayElements.slice(0, -2).map((e) => {
            return {
              x: () => e.getBoundingClientRect().x + 10,
              duration: 0.1,
              delay: 0.5
            };
          })
        )
        .concat(
          arrayElements.slice(0, -2).map((e) => {
            return {
              x: () => e.getBoundingClientRect().x + 10,
              duration: 0.1,
              delay: 0.5
            };
          })
        )
    });

    // return baseAnimation
    //   .to('.pointer', { keyframes: marchPointers(arrayElements.slice(0, -2)) })
    //   .to('.pointer.one, .pointer.two', { opacity: 0 }, '+=1')
    //   .from('.four', { xPercent: -100 })
    //   .to('.four p', { text: 'This array has no duplicates!' });
  }

  //   return baseAnimation
  //     .to('.pointer', {
  //       keyframes: marchPointers(arrayElements.slice(0, result.index))
  //     })
  //     .fromTo(
  //       '.pointer.one, .pointer.two',
  //       { y: (i) => (i % 2 ? '+=10' : '-=10') },
  //       { y: (i) => (i % 2 ? '-=20' : '+=20'), repeat: -1, yoyo: true }
  //     )
  //     .from('.four', { xPercent: -100 })
  //     .to('.four p', { text: `The duplicate number is ${result.answer}` });
};

const marchPointers = (arrayElements: Element[]) =>
  arrayElements.map((e) => {
    const { width } = e.getBoundingClientRect();

    return {
      x: `+=${width}`,
      duration: 0.1,
      delay: 0.5
    };
  });

type Result = null | { answer: number; index: number };

export const findDuplicate = (arr: number[]): Result => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        return {
          answer: arr[i],
          index: i
        };
      }
    }
  }

  return null;
};
