import {CSSProperties, useEffect, useState} from 'react';

// 位置の型宣言
type Position = {
  name: string,
  x: number;
  y: number;
}

// ピースの型宣言
type Piece = {
  name: string;
  position: Position;
}

// ピースの集合の型宣言
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

// ピースの集合の変数宣言
const side = 80;
export const pieces = {
  a: {name: 'a', position: {name: 'A', x: 0, y: 0}},
  b: {name: 'b', position: {name: 'B', x: side, y: 0}},
  c: {name: 'c', position: {name: 'C', x: side * 2, y: 0}},
  d: {name: 'd', position: {name: 'D', x: 0, y: side}},
  e: {name: 'e', position: {name: 'E', x: side, y: side}},
  f: {name: 'f', position: {name: 'F', x: side * 2, y: side}},
  g: {name: 'g', position: {name: 'G', x: 0, y: side * 2}},
  h: {name: 'h', position: {name: 'H', x: side, y: side * 2}},
  i: {name: 'i', position: {name: 'J', x: side * 3, y: side * 2}},
};

// ピースの初期値
const initPiece : Piece = pieces.a;

// 隙間の変数宣言
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
  if (pieces.a.position.x === x && pieces.a.position.y === y) {
    return 'A';
  } else if (pieces.b.position.x === x &&
    pieces.b.position.y === y) {
    return 'B';
  } else if (pieces.c.position.x === x &&
    pieces.c.position.y === y) {
    return 'C';
  } else if (pieces.d.position.x === x &&
    pieces.d.position.y === y) {
    return 'D';
  } else if (pieces.e.position.x === x &&
    pieces.e.position.y === y) {
    return 'E';
  } else if (pieces.f.position.x === x &&
    pieces.f.position.y === y) {
    return 'F';
  } else if (pieces.g.position.x === x &&
    pieces.g.position.y === y) {
    return 'G';
  } else if (pieces.h.position.x === x &&
    pieces.h.position.y === y) {
    return 'H';
  } else if (pieces.i.position.x === x &&
    pieces.i.position.y === y) {
    return 'I';
  } else {
    // 中途半端な位置
    return 'midway';
  }
};


/**
* 位置を含むCSSを更新する関数
* @param {Piece} piece
* @param {string} movePiece
* @param {string} pushedKey
* @return {Style}
*/
export function updateStyle(
    piece: Piece = initPiece,
    movePiece: string,
    pushedKey: string,
) {
  // ピースの状態を_pieceに保持
  const [_piece, setPiece] = useState({
    ...initPiece,
    ...piece,
  });
  const {name, position} = _piece;

  // 押されたキーによって、隙間とピースを交換する
  const slide = () => {
    switch (pushedKey) {
      case 'up':
        position.y-=80;
        empPos.y+=80;
        break;
      case 'down':
        position.y+=80;
        empPos.y-=80;
        break;
      case 'right':
        position.x+=80;
        empPos.x-=80;
        break;
      case 'left':
        position.x-=80;
        empPos.x+=80;
        break;
    }
    position.name = judgePosition(position.x, position.y);
    // console.log('tempPos:'+position.name);
    // pieceの状態を更新
    setPiece({name, position});
  };

  useEffect(() => {
    // ピースの名前と動かすべきピースが一致した場合にスライドを実行
    if (_piece.name==movePiece) {
      slide();
    }
  });

  return {
    width: '80px',
    height: '80px',
    position: 'absolute' as CSSProperties['position'],
    top: _piece.position.y,
    left: _piece.position.x,
  };
}

/**
* どのピースを動かすべきか判定
* @param {string} pieces
* @param {string} movePiece
* @param {string} pushedKey
* @return {string}
**/
export function selectMovePiece(
    pieces: Pieces,
    movePiece: string,
    pushedKey: string,
) {
  // 各ピースに対して、判定を実行
  movePiece = select(pieces.a, pushedKey, movePiece);
  movePiece = select(pieces.b, pushedKey, movePiece);
  movePiece = select(pieces.c, pushedKey, movePiece);
  movePiece = select(pieces.d, pushedKey, movePiece);
  movePiece = select(pieces.e, pushedKey, movePiece);
  movePiece = select(pieces.f, pushedKey, movePiece);
  movePiece = select(pieces.g, pushedKey, movePiece);
  movePiece = select(pieces.h, pushedKey, movePiece);
  movePiece = select(pieces.i, pushedKey, movePiece);
  /**
  * 押されたキーと隙間の位置に対して、ピースが動かすべきか判定する関数
  * @param {Piece} piece
  * @param {string} pushedKey
  * @param {string} movePiece
  * @return {string}
  */
  function select(piece: Piece, pushedKey: string, movePiece:string) {
    // movePieceがnoneの時だけ実行
    // これを行わないと複数ピース同時に動いてしまう
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
