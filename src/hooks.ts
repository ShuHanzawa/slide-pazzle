import {CSSProperties, useEffect, useRef, useState} from 'react';
import interact from 'interactjs';

type Position = {
  width: number;
  height: number;
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
  a: {width: side, height: side, x: 0, y: 0},
  b: {width: side, height: side, x: side, y: 0},
  c: {width: side, height: side, x: side * 2, y: 0},
  d: {width: side, height: side, x: 0, y: side},
  e: {width: side, height: side, x: side, y: side},
  f: {width: side, height: side, x: side * 2, y: side},
  g: {width: side, height: side, x: 0, y: side * 2},
  h: {width: side, height: side, x: side, y: side * 2},
  i: {width: side, height: side, x: side * 2, y: side * 2},
  j: {width: side, height: side, x: side * 3, y: side * 2},
};

// デフォルトの位置（Aの位置）
const initPosition : Position = puzzlePositon.a;

const edge = {
  minX: 0,
  minY: 0,
  maxX: 160,
  maxY: 160,
};

const emptyPosition = {
  minX: 160,
  minY: 160,
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

  const [isEnabled, setEnable] = useState(false);

  const interactRef = useRef(null);
  let {x, y, width, height} = _position;

  const enable = () => {
    interact((interactRef.current as unknown) as HTMLElement)
        .draggable({
          inertia: false,
        })
        .resizable({
          // resize from all edges and corners
          edges: {left: true, right: true, bottom: true, top: true},
          preserveAspectRatio: false,
          inertia: false,
        })
        .on('dragmove', (event) => {
          // 考え方）四角形の左上の角の座標を元に制御している。
          // 空いているピースのx座標と
          // ピースを動かした後のx座標とが同じ場合。
          // →つまりピースを縦に動かしている場合。
          if (emptyPosition.minX === x) {
            // x座標の稼働範囲は「0」とする。
            edge.minX = emptyPosition.minX;
            edge.maxX = emptyPosition.minX;
            // 上から下に移動させている場合。
            if ((emptyPosition.minY - side) <= y &&
                  y < emptyPosition.minY) {
              // y座標の稼働範囲は
              // 空いているピースのy座標 - side < y < 空いているピースのy座標
              edge.minY = emptyPosition.minY - side;
              edge.maxY = emptyPosition.minY;
            }
            // 下から上に移動させている場合。
            if (emptyPosition.minY < y &&
                y <= (emptyPosition.minY + side)) {
              // y座標の稼働範囲は
              // 空いているピースのy座標 < y < 空いているピースのy座標 + side
              edge.minY = emptyPosition.minY;
              edge.maxY = emptyPosition.minY + side;
            }
          }
          // 空いているピースのy座標と
          // ピースを動かした後のy座標とが同じ場合。
          // →つまりピースを横に動かしている場合。
          if (emptyPosition.minY === y) {
            // y座標の稼働範囲は「0」とする。
            edge.minY = emptyPosition.minY;
            edge.maxY = emptyPosition.minY;
            // 左から右に移動させている場合。
            if ((emptyPosition.minX - side) <= x &&
                  x < emptyPosition.minX) {
              // x座標の稼働範囲は
              // 空いているピースのx座標 - side < x < 空いているピースのx座標
              edge.minX = emptyPosition.minX - side;
              edge.maxX = emptyPosition.minX;
            }
            // 右から左に移動させている場合。
            if (emptyPosition.minX < x &&
                x <= (emptyPosition.minX + side)) {
              // x座標の稼働範囲は
              // 空いているピースのy座標 < x < 空いているピースのx座標 + side
              edge.minX = emptyPosition.minX;
              edge.maxX = emptyPosition.minX + side;
            }
          }
          if (edge.minX <= x && x <= edge.maxX &&
                edge.minY <= y && y <= edge.maxY) {
            x += event.dx;
            y += event.dy;
            // 稼働範囲を越えたら、稼働範囲内に収める処理。
            // 各最大値の確認
            x = x >= edge.maxX? edge.maxX : x;
            y = y >= edge.maxY? edge.maxY : y;
            // 各最小値の確認
            x = x <= edge.minX? edge.minX : x;
            y = y <= edge.minY? edge.minY : y;
            setPosition({
              width,
              height,
              x,
              y,
            });
          }
          // emptyPositionの更新
          const tempPositionName = judgePosition(x, y);
          console.log(tempPositionName);
          if (emptyPosition.minX === x && emptyPosition.minY === y) {
            emptyPosition.minX = (emptyPosition.minX === edge.minX)?
                                 edge.maxX : edge.minX;
            emptyPosition.minY = (emptyPosition.minY === edge.minY)?
                                 edge.maxY : edge.minY;
          }
        });
  };

  const disable = () => {
    interact((interactRef.current as unknown) as HTMLElement).unset();
  };

  useEffect(() => {
    if (isEnabled) {
      enable();
    } else {
      disable();
    }
    return disable;
  }, [isEnabled]);

  return {
    ref: interactRef,
    style: {
      transform: `translate3D(${_position.x}px, ${_position.y}px, 0)`,
      width: _position.width + 'px',
      height: _position.height + 'px',
      position: 'absolute' as CSSProperties['position'],
    },
    positionName: judgePosition(_position.x, _position.y),
    position: _position,
    isEnabled,
    enable: () => setEnable(true),
    disable: () => setEnable(false),
  };
}
