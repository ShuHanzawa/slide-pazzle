import {CSSProperties, useEffect, useRef, useState} from 'react';
import interact from 'interactjs';

// type Partial<T> = {
//     [P in keyof T]?: T[P];
// }

type Position = {
  width: number;
  height: number;
  x: number;
  y: number;
}

const initPosition : Position = {
  width: 100,
  height: 100,
  x: 0,
  y: 0,
};

const edge = {
  minX: 0,
  minY: 0,
  maxX: 200,
  maxY: 200,
};

const emptySpace = {
  minX: 200,
  minY: 200,
  maxX: 300,
  maxY: 300,
};

/**
 * 現在のpositionを判断する関数
 * @param {number} x
 * @param {number} y
 * @return {String}
 */
const judgePosition = (x: number, y: number): String => {
  const puzzlePositon = {
    a: {x: 0, y: 0},
    b: {x: 100, y: 0},
    c: {x: 200, y: 0},
    d: {x: 0, y: 100},
    e: {x: 100, y: 100},
    f: {x: 200, y: 100},
    g: {x: 0, y: 200},
    h: {x: 100, y: 200},
    i: {x: 200, y: 200},
    j: {x: 300, y: 200},
  };

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
    // 途中
    return 'midway';
  }
};

/**
 * HTML要素を動かせるようにする
 * 返り値で取得できるinteractRefと、interactStyleをそれぞれ対象となるHTML要素の
 * refとstyleに指定することで、そのHTML要素のリサイズと移動が可能になる
 * @param {Partial} position - HTML要素の初期座標と大きさ、指定されない場合はinitPositionで指定された値になる。
 * @param {Required} edge - 端のposition
 * @return {interactRef}
 */
export function useInteractJS(
    position: Position = initPosition,
) {
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
          if (emptySpace.minX === x) {
            edge.minX = emptySpace.minX;
            edge.maxX = emptySpace.minX;
            if ((emptySpace.minY - 100) <= y &&
                  y < emptySpace.minY) {
              edge.minY = emptySpace.minY - 100;
              edge.maxY = emptySpace.minY;
            }
            if (emptySpace.minY < y &&
                y <= (emptySpace.minY + 100)) {
              edge.minY = emptySpace.minY;
              edge.maxY = emptySpace.minY + 100;
            }
          }
          if (emptySpace.minY === y) {
            edge.minY = emptySpace.minY;
            edge.maxY = emptySpace.minY;
            if ((emptySpace.minX - 100) <= x &&
                  x < emptySpace.minX) {
              edge.minX = emptySpace.minX - 100;
              edge.maxX = emptySpace.minX;
            }
            if (emptySpace.minX < x &&
                x <= (emptySpace.minX + 100)) {
              edge.minX = emptySpace.minX;
              edge.maxX = emptySpace.minX + 100;
            }
          }
          if (edge.minX <= x && x <= edge.maxX &&
                edge.minY <= y && y <= edge.maxY) {
            x += event.dx;
            y += event.dy;
            // confirm max position
            x = x >= edge.maxX? edge.maxX : x;
            y = y >= edge.maxY? edge.maxY : y;
            // confirm min position
            x = x <= edge.minX? edge.minX : x;
            y = y <= edge.minY? edge.minY : y;
            setPosition({
              width,
              height,
              x,
              y,
            });
          }
          // emptySpaceの更新
          const tempPositionName = judgePosition(x, y);
          console.log(tempPositionName);
          if (emptySpace.minX === x && emptySpace.minY === y) {
            emptySpace.minX = (emptySpace.minX === edge.minX)?
                                 edge.maxX : edge.minX;
            emptySpace.minY = (emptySpace.minY === edge.minY)?
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
