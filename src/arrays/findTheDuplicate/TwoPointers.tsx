import gsap from 'gsap';
import React, { FC, useEffect, useState } from 'react';
import './TwoPointers.scss';

interface TwoPointersProps {
  sortedArray: any[];
}

const tl = gsap.timeline({ repeat: -1, yoyo: true, repeatDelay: 0 });

export const TwoPointers: FC<TwoPointersProps> = ({ sortedArray }) => {
  const [{ p1, p2 }, setValues] = useState({ p1: 0, p2: 1 });

  useEffect(() => {
    if (p2 === sortedArray.length - 1) {
      return;
    }

    if (sortedArray[p1] === sortedArray[p2]) {
      tl.fromTo('.pointer', { y: '-=5' }, { y: '+=5' });

      return;
    }

    setTimeout(() => {
      setValues(({ p1, p2 }) => ({
        p1: p1 + 1,
        p2: p2 + 1
      }));
    }, 1000);
  }, [p1, p2]);

  return (
    <div className="two-pointers">
      <h4>March two pointers until they're equal</h4>

      <div className="container">
        [
        {sortedArray.map((v, index) => {
          const isLast = index === sortedArray.length - 1;
          const element = (
            <span className="element">
              {v} {isLast ? '' : ', '}
            </span>
          );

          if (p1 === index) {
            return (
              <>
                <span className="pointer one" />
                {element}
              </>
            );
          }

          if (p2 === index) {
            return (
              <>
                <span className="pointer two" />
                {element}
              </>
            );
          }

          return element;
        })}
        ]
      </div>
    </div>
  );
};
