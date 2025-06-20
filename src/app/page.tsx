'use client';

import { useEffect, useMemo, useState } from 'react';
import styles from './page.module.css';

const direction = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
] as const;

const createboard = (size: number): number[][] => {
  const grid: number[][] = [];
  for (let y = 0; y < size; y++) {
    const row: number[] = [];
    for (let x = 0; x < size; x++) {
      if (y % 2 !== 0 && x % 2 !== 0) {
        row.push(1);
      } else {
        row.push(0);
      }
    }
    grid.push(row);
  }

  return grid;
};

const createMaze = (board: number[][]): number[][] => {
  const newMaze: number[][] = structuredClone(board);
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[0].length; x++) {
      if (board[y][x] === 1) {
        for (let i = 0; i === 0; ) {
          newMaze[y][x] = 1;
          const dir = Math.floor(Math.random() * 4);
          const dy = direction[dir][0] + y;
          const dx = direction[dir][1] + x;
          if (newMaze[dy][dx] === 0) {
            newMaze[dy][dx] = 1;
            i += 1;
          }
        }
      }
    }
  }
  console.log(newMaze);
  return newMaze;
};

export default function Home() {
  const board: number[][] = useMemo(() => {
    return createboard(99);
  }, []);
  const [maze, setmaze] = useState<number[][]>(structuredClone(board));

  useEffect(() => {
    setmaze(createMaze(board));
  }, [board]);

  const clickhandlar = () => {
    setmaze(createMaze(board));
  };

  return (
    <div className={styles.container}>
      <button onClick={clickhandlar}>生成</button>
      <div className={styles.board} style={{ width: board.length * 5 }}>
        {maze.map((row, y) =>
          row.map((value, x) => (
            <div
              className={styles.block}
              style={{ background: value === 1 ? '#000' : '#fff' }}
              key={`${x}-${y}`}
            />
          )),
        )}
      </div>
    </div>
  );
}
