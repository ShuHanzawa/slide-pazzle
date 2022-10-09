import React from 'react';
import {useKeyPressEvent} from 'react-use';
import './App.css';
import {updateStyle, pieces, selectMovePiece} from './PuzzleHooks';
import PazzleA from './img/sakasakuma-a.png';
import PazzleB from './img/sakasakuma-b.png';
import PazzleC from './img/sakasakuma-c.png';
import PazzleD from './img/sakasakuma-d.png';
import PazzleE from './img/sakasakuma-e.png';
import PazzleF from './img/sakasakuma-f.png';
import PazzleG from './img/sakasakuma-g.png';
import PazzleH from './img/sakasakuma-h.png';
import PazzleI from './img/sakasakuma-i.png';

let key = 'none';
let piece = 'none';

/**
 * App function
 * @return {React.FC}
 */
const App: React.FC = () => {
// アルファベットと配置の関係
// A B C
// D E F
// G H I J
// piece : 各ピースのコンポーネント
// image : パズルで表示する画像
// ans : 「アルファベットと配置の関係」に沿った答えの位置

  useKeyPressEvent(
      (e)=>true,
      (e)=>{
        switch (e.key) {
          case 'ArrowDown':
            key = 'down';
            break;
          case 'ArrowUp':
            key = 'up';
            break;
          case 'ArrowLeft':
            key = 'left';
            break;
          case 'ArrowRight':
            key = 'right';
            break;
        }
      },
      ()=>{
        key = 'none';
      },
  );
  console.log('key:'+key);
  piece = selectMovePiece(pieces, key);
  console.log('movePiece:'+piece);
  const styles = {
    a: {style: updateStyle(pieces.a, piece, key), image: PazzleA, ans: 'A'},
    b: {style: updateStyle(pieces.b, piece, key), image: PazzleB, ans: 'B'},
    c: {style: updateStyle(pieces.c, piece, key), image: PazzleC, ans: 'C'},
    d: {style: updateStyle(pieces.d, piece, key), image: PazzleD, ans: 'D'},
    e: {style: updateStyle(pieces.e, piece, key), image: PazzleE, ans: 'E'},
    f: {style: updateStyle(pieces.f, piece, key), image: PazzleF, ans: 'F'},
    g: {style: updateStyle(pieces.g, piece, key), image: PazzleG, ans: 'G'},
    h: {style: updateStyle(pieces.h, piece, key), image: PazzleH, ans: 'H'},
    i: {style: updateStyle(pieces.i, piece, key), image: PazzleI, ans: 'I'}};
  piece='none';

  // 答えの判定フラグ
  const ansFlg = pieces.a.position.name === styles.a.ans &&
  pieces.b.position.name === styles.b.ans &&
  pieces.c.position.name === styles.c.ans &&
  pieces.d.position.name === styles.d.ans &&
  pieces.e.position.name === styles.e.ans &&
  pieces.f.position.name === styles.f.ans &&
  pieces.g.position.name === styles.g.ans &&
  pieces.h.position.name === styles.h.ans &&
  pieces.i.position.name === styles.i.ans;

  console.log('h.x:'+pieces.h.position.x);
  console.log('h.y:'+pieces.h.position.y);
  return (
    // 小文字アルファベットとピースの初期配置
    // a b c
    // d e f
    // g h _ i
    // 大文字アルファベットと配置の関係
    // A B C
    // D E F
    // G H I J
    <div className='App'>
      <div className='App-puzzles'>
        {/* A */}
        <div
          style={{
            ...styles.a.style,
            backgroundImage: 'url(' + styles.a.image + ')',
            backgroundSize: 'cover',
          }}
        >
        </div>
        {/* B */}
        <div
          style={{
            ...styles.b.style,
            backgroundImage: 'url(' + styles.b.image + ')',
            backgroundSize: 'cover',
          }}
        >
        </div>
        {/* C */}
        <div
          style={{
            ...styles.c.style,
            backgroundImage: 'url(' + styles.c.image + ')',
            backgroundSize: 'cover',
          }}
        >
        </div>
        {/* D */}
        <div
          style={{
            ...styles.d.style,
            backgroundImage: 'url(' + styles.d.image + ')',
            backgroundSize: 'cover',
          }}
        >
        </div>
        {/* E */}
        <div
          style={{
            ...styles.e.style,
            backgroundImage: 'url(' + styles.e.image + ')',
            backgroundSize: 'cover',
          }}
        >
        </div>
        {/* F */}
        <div
          style={{
            ...styles.f.style,
            backgroundImage: 'url(' + styles.f.image + ')',
            backgroundSize: 'cover',
          }}
        >
        </div>
        {/* G */}
        <div
          style={{
            ...styles.g.style,
            backgroundImage: 'url(' + styles.g.image + ')',
            backgroundSize: 'cover',
          }}
        >
        </div>
        {/* H */}
        <div
          style={{
            ...styles.h.style,
            backgroundImage: 'url(' + styles.h.image + ')',
            backgroundSize: 'cover',
          }}
        >
        </div>
        {/* I */}
        <div
          style={{
            ...styles.i.style,
            backgroundImage: 'url(' + styles.i.image + ')',
            backgroundSize: 'cover',
          }}
        >
        </div>
      </div>
      {ansFlg && <div>完成!! Congratulations!!</div>}
    </div>
  );
};

export default App;
