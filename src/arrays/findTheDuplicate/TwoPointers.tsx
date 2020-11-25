import gsap from 'gsap';
import React, { FC, useEffect, useState } from 'react';
import { FinalAnswer } from '../../state';
import './TwoPointers.scss';

interface TwoPointersProps {
  sortedArray: number[];
  start: boolean;
  onComplete: (answer: FinalAnswer) => void;
}

const tl = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 0 });

export const TwoPointers: FC<TwoPointersProps> = ({
  sortedArray,
  start,
  onComplete
}) => {
  const [{ p1, p2 }, setValues] = useState({ p1: 0, p2: 1 });
  const sequenceDone = p2 === sortedArray.length - 1;
  const answerFound = sortedArray[p1] === sortedArray[p2];

  useEffect(() => {
    if (!start || sequenceDone) {
      return;
    }

    if (answerFound) {
      tl.fromTo('.pointer.one', { y: '+=10' }, { y: '-=20' });
      tl.fromTo('.pointer.two', { y: '-=10' }, { y: '+=20' }, 0);

      onComplete(sortedArray[p1].toString());

      return;
    }

    setTimeout(() => {
      setValues(({ p1, p2 }) => ({
        p1: p1 + 1,
        p2: p2 + 1
      }));
    }, 1000);
  }, [p1, p2, start]);

  return (
    <div className="two-pointers">
      <h4>March two pointers until they're equal</h4>

      <div className="container">
        [
        {sortedArray.map((v, index) => {
          const isLast = index === sortedArray.length - 1;
          const isP1 = index === p1;
          const isP2 = index === p2;

          const element = (
            <span
              className={classNames([
                ['element', true],
                ['answer', isP1 || isP2]
              ])}
            >
              {v} {isLast ? '' : ', '}
            </span>
          );

          return (
            <>
              <span
                className={classNames([
                  ['pointer', isP1 || isP2],
                  ['one', isP1],
                  ['two', isP2]
                ])}
              ></span>
              {element}
            </>
          );
        })}
        ]
      </div>
    </div>
  );
};

type ClassNameList = [string, boolean][];

const classNames = (p: ClassNameList) =>
  p.reduce((result, [cn, cond]) => (cond ? `${result} ${cn}` : result), '');
