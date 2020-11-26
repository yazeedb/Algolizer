import React, { FC } from 'react';
import './TwoPointers.scss';

interface TwoPointersProps {
  sortedArray: number[];
}

export const TwoPointers: FC<TwoPointersProps> = ({ sortedArray }) => {
  return (
    <div className="two-pointers">
      <h4>March two pointers until they're equal</h4>

      <div className="pointers">
        <span className="pointer one"></span>
        <span className="pointer two"></span>
      </div>

      <div className="container">
        [
        {sortedArray.map((v, index) => {
          return (
            <span className="element" key={index}>
              {v},{' '}
            </span>
          );
        })}
        ]
      </div>
    </div>
  );
};

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
