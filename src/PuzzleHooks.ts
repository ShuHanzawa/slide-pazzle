import {CSSProperties, useEffect, useRef, useState} from 'react';

type Position = {
  x: number;
  y: number;
}

// 正方形の一辺
const side = 80;

// アルファベットと配置の関係
// 各ピースの初期値とサイズ
// サイズ : side×sideで固定
// 座標 : 四角形の左上の座標
// A B C
// D E F
// G H I J
export const puzzlePositon = {
  a: {x: 0, y: 0},
  b: {x: side, y: 0},
  c: {x: side * 2, y: 0},
  d: {x: 0, y: side},
  e: {x: side, y: side},
  f: {x: side * 2, y: side},
  g: {x: 0, y: side * 2},
  h: {x: side, y: side * 2},
  i: {x: side * 2, y: side * 2},
  j: {x: side * 3, y: side * 2},
};

// デフォルトの位置（Aの位置）
const initPosition : Position = puzzlePositon.a;

const empPos = {
  x: 160,
  y: 160,
};

/**
 * 動かしたピースの現在のpositionを判断する関数
 * @param {number} x
 * @param {number} y
 * @return {String}
 */
const judgePosition = (x: number, y: number): String => {
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
  } else if (puzzlePositon.j.x === x &&
                puzzlePositon.j.y === y) {
    return 'J';
  } else {
    // 中途半端な位置
    return 'midway';
  }
};

/**
 * HTML要素を動かせるようにする
 * 返り値で取得できるinteractRefと、interactStyleをそれぞれ対象となるHTML要素の
 * refとstyleに指定することで、そのHTML要素の(リサイズ)と移動が可能になる
 * @param {Partial} position - HTML要素の初期座標と大きさ、指定されない場合はinitPositionで指定された値になる。
 * @return {interactRef}
 */
export function useInteractJS(
    position: Position = initPosition,
) {
  // スプレット演算子の特性で後半のpositionの方が優先される。（initPositionの方は必要ないかも）
  const [_position, setPosition] = useState({
    ...initPosition,
    ...position,
  });

  const interactRef = useRef(null);
  let {x, y} = _position;

  const move = () => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // 下キー入力の場合処理を行う
      if (event.key === 'ArrowDown') {
        if (y == empPos.y-80 && x == empPos.x) {
          y+=80;
          empPos.y-=80;
          setPosisions(x, y, empPos.x, empPos.y, event.key);
        }
      }
      // 上キー入力の場合処理を行う
      if (event.key === 'ArrowUp') {
        if (y == empPos.y+80 && x == empPos.x) {
          y-=80;
          empPos.y+=80;
          setPosisions(x, y, empPos.x, empPos.y, event.key);
        }
      }
      // 右キー入力の場合処理を行う
      if (event.key === 'ArrowRight') {
        if (y == empPos.y && x == empPos.x-80) {
          x+=80;
          empPos.x-=80;
          setPosisions(x, y, empPos.x, empPos.y, event.key);
        }
      }
      // 左キー入力の場合処理を行う
      if (event.key === 'ArrowLeft') {
        if (y == empPos.y && x == empPos.x+80) {
          x-=80;
          empPos.x+=80;
          setPosisions(x, y, empPos.x, empPos.y, event.key);
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown, false);
  };

  /**
   * @param {number} x ピースのx座標
   * @param {number} y ピースのy座標
   * @param {number} X 空白ピースのx座標
   * @param {number} Y 空白ピースのy座標
   * @param {string} key 空白ピースのy座標
   * @return {void}
   */
  function setPosisions(
      x: number, y: number, X: number, Y: number, key: string): void {
    setPosition({
      x,
      y,
    });
    console.log('press:'+key);
    console.log('ピース'+(x/80+1)+','+(y/80+1));
    const empX=X/80+1;
    const empY=Y/80+1;
    console.log('空白'+empX+','+empY);
    const tempPositionName = judgePosition(x, y);
    console.log(tempPositionName);
  }

  useEffect(() => {
    move();
  } );

  return {
    ref: interactRef,
    style: {
      transform: `translate3D(${_position.x}px, ${_position.y}px, 0)`,
      width: 80 + 'px',
      height: 80 + 'px',
      position: 'absolute' as CSSProperties['position'],
    },
    positionName: judgePosition(_position.x, _position.y),
    position: _position,
  };
}
