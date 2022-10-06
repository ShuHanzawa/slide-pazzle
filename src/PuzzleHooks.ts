import {CSSProperties, useEffect, useRef, useState} from 'react';
type Position = {
  name: string,
  x: number;
  y: number;
}

type Piece = {
  name: string;
  image: string;
  ans: string;
  position: Position;
}

type Pieces = {
  a: Piece;
  b: Piece;
  c: Piece;
  d: Piece;
  e: Piece;
  f: Piece;
  g: Piece;
  h: Piece;
  i: Piece;
}

const side = 80;

export const puzzlePositon = {
  a: {x: 0, y: 0},
  b: {x: side, y: 0},
  c: {x: side * 2, y: 0},
  d: {x: 0, y: side},
  e: {x: side, y: side},
  f: {x: side * 2, y: side},
  g: {x: 0, y: side * 2},
  h: {x: side, y: side * 2},
  i: {x: side * 3, y: side * 2},
};

const empPos = {
  x: 160,
  y: 160,
};

/**
* 動かしたピースの現在のpositionを判断する関数
* @param {number} x
* @param {number} y
* @return {string}
*/
const judgePosition = (x: number, y: number): string => {
  if (puzzlePositon.a.x === x && puzzlePositon.a.y === y) {
    return 'A';
  } else if (puzzlePositon.b.x === x &&
                puzzlePositon.b.y === y) {
    return 'B';
  } else if (puzzlePositon.c.x === x &&
                puzzlePositon.c.y === y) {
    return 'C';
  } else if (puzzlePositon.d.x === x &&
                puzzlePositon.d.y === y) {
    return 'D';
  } else if (puzzlePositon.e.x === x &&
                puzzlePositon.e.y === y) {
    return 'E';
  } else if (puzzlePositon.f.x === x &&
                puzzlePositon.f.y === y) {
    return 'F';
  } else if (puzzlePositon.g.x === x &&
                puzzlePositon.g.y === y) {
    return 'G';
  } else if (puzzlePositon.h.x === x &&
                puzzlePositon.h.y === y) {
    return 'H';
  } else if (puzzlePositon.i.x === x &&
                puzzlePositon.i.y === y) {
    return 'I';
  } else {
    // 中途半端な位置
    return 'midway';
  }
};

/**
 * @param {Pieces} pieces - HTML要素の初期座標と大きさ、指定されない場合はinitPositionで指定された値になる。
 * @param {string} pushedKey
 * @param {string} movePiece
* @return {interactRef}
 */
export function slidePiece(
    pieces: Pieces,
    pushedKey: string,
    movePiece: string,
) {
  /**
  * @param {Piece} piece
  * @param {string} pushedKey
  * @param {string} movePiece
  * @return {Position}
  **/
  function slide(piece: Piece, pushedKey: string, movePiece: string) {
    let [x, y] = [piece.position.x, piece.position.y];
    if (piece.name==movePiece) {
      switch (pushedKey) {
        case 'up':
          y-=80;
          empPos.y+=80;
          break;
        case 'down':
          y+=80;
          empPos.y-=80;
          break;
        case 'right':
          x+=80;
          empPos.x-=80;
          break;
        case 'left':
          x-=80;
          empPos.x+=80;
          break;
      }
    }
    return piece.position;
  }

  useEffect(() => {
    pieces.a.position = slide(pieces.a, pushedKey, movePiece);
    pieces.b.position = slide(pieces.b, pushedKey, movePiece);
    pieces.c.position = slide(pieces.c, pushedKey, movePiece);
    pieces.d.position = slide(pieces.d, pushedKey, movePiece);
    pieces.e.position = slide(pieces.e, pushedKey, movePiece);
    pieces.f.position = slide(pieces.f, pushedKey, movePiece);
    pieces.g.position = slide(pieces.g, pushedKey, movePiece);
    pieces.h.position = slide(pieces.h, pushedKey, movePiece);
    pieces.i.position = slide(pieces.i, pushedKey, movePiece);
  });
  return pieces;
}

/**
* @param {string} pieces
* @param {string} pushedKey
* @return {string}
**/
export function selectMovePiece(
    pieces: Pieces,
    pushedKey: string,
) {
  let movePiece = 'none';
  movePiece = select(pieces.a, pushedKey, movePiece);
  movePiece = select(pieces.b, pushedKey, movePiece);
  movePiece = select(pieces.c, pushedKey, movePiece);
  movePiece = select(pieces.d, pushedKey, movePiece);
  movePiece = select(pieces.e, pushedKey, movePiece);
  movePiece = select(pieces.f, pushedKey, movePiece);
  movePiece = select(pieces.g, pushedKey, movePiece);
  movePiece = select(pieces.h, pushedKey, movePiece);
  movePiece = select(pieces.i, pushedKey, movePiece);
  movePiece = select(pieces.j, pushedKey, movePiece);

  /**
  * @param {Piece} piece
  * @param {string} pushedKey
  * @param {string} movePiece
  * @return {string}
  */
  function select(piece: Piece, pushedKey: string, movePiece:string) {
    if (pushedKey!='none' && movePiece=='none') {
      const name = piece.name;
      const [x, y] = [piece.position.x, piece.position.y];
      switch (pushedKey) {
        case 'down':
          if (y == empPos.y-80 && x == empPos.x) {
            movePiece=name;
          }
          break;
        case 'up':
          if (y == empPos.y+80 && x == empPos.x) {
            movePiece=name;
          }
          break;
        case 'right':
          if (y == empPos.y && x == empPos.x-80) {
            movePiece=name;
          }
          break;
        case 'left':
          if (y == empPos.y && x == empPos.x+80) {
            movePiece=name;
          }
          break;
      }
    }
    return movePiece;
  }
  return movePiece;
}
