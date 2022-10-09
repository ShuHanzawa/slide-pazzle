import React from 'react';
import {useKeyPressEvent} from 'react-use';
import './App.css';
import {slidePiece, selectMovePiece} from './PuzzleHooks';
import PazzleA from './img/sakasakuma-a.png';
import PazzleB from './img/sakasakuma-b.png';
import PazzleC from './img/sakasakuma-c.png';
import PazzleD from './img/sakasakuma-d.png';
import PazzleE from './img/sakasakuma-e.png';
import PazzleF from './img/sakasakuma-f.png';
import PazzleG from './img/sakasakuma-g.png';
import PazzleH from './img/sakasakuma-h.png';
import PazzleI from './img/sakasakuma-i.png';

let pushedKey = 'none';
let movePiece = 'none';

// 初期配置の宣言
const side = 80;
let pieces = {
  a: {
    name: 'a', image: PazzleA, ans: 'A',
    position: {name: 'A', x: 0, y: 0}},
  b: {
    name: 'b', image: PazzleB, ans: 'B',
    position: {name: 'B', x: side, y: 0}},
  c: {
    name: 'c', image: PazzleC, ans: 'C',
    position: {name: 'C', x: side * 2, y: 0}},
  d: {
    name: 'd', image: PazzleD, ans: 'D',
    position: {name: 'D', x: 0, y: side}},
  e: {
    name: 'e', image: PazzleE, ans: 'E',
    position: {name: 'E', x: side, y: side}},
  f: {
    name: 'f', image: PazzleF, ans: 'F',
    position: {name: 'F', x: side * 2, y: side}},
  g: {
    name: 'g', image: PazzleG, ans: 'G',
    position: {name: 'G', x: 0, y: side * 2}},
  h: {
    name: 'h', image: PazzleH, ans: 'H',
    position: {name: 'H', x: side, y: side * 2}},
  i: {
    name: 'i', image: PazzleI, ans: 'I',
    position: {name: 'J', x: side * 3, y: side * 2}},
};

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
            pushedKey = 'down';
            break;
          case 'ArrowUp':
            pushedKey = 'up';
            break;
          case 'ArrowLeft':
            pushedKey = 'left';
            break;
          case 'ArrowRight':
            pushedKey = 'right';
            break;
        }
      },
      ()=>{
        pushedKey = 'none';
      },
  );

  console.log('pushedKey:'+pushedKey);
  movePiece = selectMovePiece(pieces, pushedKey);
  console.log('movePiece:'+movePiece);
  pieces = slidePiece(pieces, pushedKey, movePiece);
  movePiece='none';

  // 答えの判定フラグ
  const ansFlg = pieces.a.position.name === pieces.a.ans &&
  pieces.b.position.name === pieces.b.ans &&
  pieces.c.position.name === pieces.c.ans &&
  pieces.d.position.name === pieces.d.ans &&
  pieces.e.position.name === pieces.e.ans &&
  pieces.f.position.name === pieces.f.ans &&
  pieces.g.position.name === pieces.g.ans &&
  pieces.h.position.name === pieces.h.ans &&
  pieces.i.position.name === pieces.i.ans;

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
            width: '80px',
            height: '80px',
            position: 'absolute',
            top: pieces.a.position.y + 'px',
            left: pieces.a.position.x + 'px',
            backgroundImage: 'url(' + pieces.a.image + ')',
            backgroundSize: 'cover',
          }}
        >
        </div>
        {/* B */}
        <div
          style={{
            width: '80px',
            height: '80px',
            position: 'absolute',
            top: pieces.b.position.y + 'px',
            left: pieces.b.position.x + 'px',
            backgroundImage: 'url(' + pieces.b.image + ')',
            backgroundSize: 'cover',
          }}
        >
        </div>
        {/* C */}
        <div
          style={{
            width: '80px',
            height: '80px',
            position: 'absolute',
            top: pieces.c.position.y + 'px',
            left: pieces.c.position.x + 'px',
            backgroundImage: 'url(' + pieces.c.image + ')',
            backgroundSize: 'cover',
          }}
        >
        </div>
        {/* D */}
        <div
          style={{
            width: '80px',
            height: '80px',
            position: 'absolute',
            top: pieces.d.position.y + 'px',
            left: pieces.d.position.x + 'px',
            backgroundImage: 'url(' + pieces.d.image + ')',
            backgroundSize: 'cover',
          }}
        >
        </div>
        {/* E */}
        <div
          style={{
            width: '80px',
            height: '80px',
            position: 'absolute',
            top: pieces.e.position.y + 'px',
            left: pieces.e.position.x + 'px',
            backgroundImage: 'url(' + pieces.e.image + ')',
            backgroundSize: 'cover',
          }}
        >
        </div>
        {/* F */}
        <div
          style={{
            width: '80px',
            height: '80px',
            position: 'absolute',
            top: pieces.f.position.y + 'px',
            left: pieces.f.position.x + 'px',
            backgroundImage: 'url(' + pieces.f.image + ')',
            backgroundSize: 'cover',
          }}
        >
        </div>
        {/* G */}
        <div
          style={{
            width: '80px',
            height: '80px',
            position: 'absolute',
            top: pieces.g.position.y + 'px',
            left: pieces.g.position.x + 'px',
            backgroundImage: 'url(' + pieces.g.image + ')',
            backgroundSize: 'cover',
          }}
        >
        </div>
        {/* H */}
        <div
          style={{
            width: '80px',
            height: '80px',
            position: 'absolute',
            top: pieces.h.position.y + 'px',
            left: pieces.h.position.x + 'px',
            backgroundImage: 'url(' + pieces.h.image + ')',
            backgroundSize: 'cover',
          }}
        >
        </div>
        {/* I */}
        <div
          style={{
            width: '80px',
            height: '80px',
            position: 'absolute',
            top: pieces.i.position.y + 'px',
            left: pieces.i.position.x + 'px',
            backgroundImage: 'url(' + pieces.i.image + ')',
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
