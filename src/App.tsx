import React from 'react';
import {useEffect} from 'react';
import './App.css';
import {useInteractJS, puzzlePositon} from './hooks';
// アルファベットと配置の関係
// A B C
// D E F
// G H I J
// 画像だけ差し替える場合は"答え"のアルファベット位置を当てはめる。
import PazzleA from './img/sakasakuma-a.png';
import PazzleB from './img/sakasakuma-b.png';
import PazzleC from './img/sakasakuma-c.png';
import PazzleD from './img/sakasakuma-d.png';
import PazzleE from './img/sakasakuma-e.png';
import PazzleF from './img/sakasakuma-f.png';
import PazzleG from './img/sakasakuma-g.png';
import PazzleH from './img/sakasakuma-h.png';
import PazzleJ from './img/sakasakuma-j.png';

/**
 * App function
 * @return {React.FC}
 */
const App: React.FC = () => {
  const interactA = useInteractJS();
  const interactB = useInteractJS(puzzlePositon.b);
  const interactC = useInteractJS(puzzlePositon.c);
  const interactD = useInteractJS(puzzlePositon.d);
  const interactE = useInteractJS(puzzlePositon.e);
  const interactF = useInteractJS(puzzlePositon.f);
  const interactG = useInteractJS(puzzlePositon.g);
  const interactH = useInteractJS(puzzlePositon.h);
  const interactJ = useInteractJS(puzzlePositon.j);

  useEffect(() => {
    // midway(パズルのピースを動かしている途中)の場合
    // 動かしているピース以外は動かないようにする。
    if (interactA.positionName === 'midway') {
      interactB.disable();
      interactC.disable();
      interactD.disable();
      interactE.disable();
      interactF.disable();
      interactG.disable();
      interactH.disable();
      interactJ.disable();
    } else if (interactB.positionName === 'midway') {
      interactA.disable();
      interactC.disable();
      interactD.disable();
      interactE.disable();
      interactF.disable();
      interactG.disable();
      interactH.disable();
      interactJ.disable();
    } else if (interactC.positionName === 'midway') {
      interactA.disable();
      interactB.disable();
      interactD.disable();
      interactE.disable();
      interactF.disable();
      interactG.disable();
      interactH.disable();
      interactJ.disable();
    } else if (interactD.positionName === 'midway') {
      interactA.disable();
      interactB.disable();
      interactC.disable();
      interactE.disable();
      interactF.disable();
      interactG.disable();
      interactH.disable();
      interactJ.disable();
    } else if (interactE.positionName === 'midway') {
      interactA.disable();
      interactB.disable();
      interactC.disable();
      interactD.disable();
      interactF.disable();
      interactG.disable();
      interactH.disable();
      interactJ.disable();
    } else if (interactF.positionName === 'midway') {
      interactA.disable();
      interactB.disable();
      interactC.disable();
      interactD.disable();
      interactE.disable();
      interactG.disable();
      interactH.disable();
      interactJ.disable();
    } else if (interactG.positionName === 'midway') {
      interactA.disable();
      interactB.disable();
      interactC.disable();
      interactD.disable();
      interactE.disable();
      interactF.disable();
      interactH.disable();
      interactJ.disable();
    } else if (interactH.positionName === 'midway') {
      interactA.disable();
      interactB.disable();
      interactC.disable();
      interactD.disable();
      interactE.disable();
      interactF.disable();
      interactG.disable();
      interactJ.disable();
    } else if (interactJ.positionName === 'midway') {
      interactA.disable();
      interactB.disable();
      interactC.disable();
      interactD.disable();
      interactE.disable();
      interactF.disable();
      interactG.disable();
      interactH.disable();
    } else {
      // midway以外の場合は全てのピースを動かせる状態にする。
      // → 結果的には稼働範囲が存在するピースだけが動かせる。
      interactA.enable();
      interactB.enable();
      interactC.enable();
      interactD.enable();
      interactE.enable();
      interactF.enable();
      interactG.enable();
      interactH.enable();
      interactJ.enable();
    }
  }, [
    interactA.positionName,
    interactB.positionName,
    interactC.positionName,
    interactD.positionName,
    interactE.positionName,
    interactF.positionName,
    interactG.positionName,
    interactH.positionName,
    interactJ.positionName,
  ]);

  // 初回のみ。
  useEffect(() => {
    // F, H, J以外は動かないようにする。
    interactA.disable();
    interactB.disable();
    interactC.disable();
    interactD.disable();
    interactE.disable();
    interactG.disable();
  }, []);

  return (
    // アルファベットと配置の関係
    // A B C
    // D E F
    // G H I J
    // 画像に付随したアルファベット
    // （PazzleAの「A」）で並べると答えになる。
    <div className='App'>
      {/* A */}
      <div
        ref={interactA.ref}
        style={{
          ...interactA.style,
          backgroundImage: 'url(' + PazzleC + ')',
          backgroundSize: 'cover',
        }}
      >
      </div>
      {/* B */}
      <div
        ref={interactB.ref}
        style={{
          ...interactB.style,
          backgroundImage: 'url(' + PazzleH + ')',
          backgroundSize: 'cover',
        }}
      >
      </div>
      {/* C */}
      <div
        ref={interactC.ref}
        style={{
          ...interactC.style,
          backgroundImage: 'url(' + PazzleE + ')',
          backgroundSize: 'cover',
        }}
      >
      </div>
      {/* D */}
      <div
        ref={interactD.ref}
        style={{
          ...interactD.style,
          backgroundImage: 'url(' + PazzleD + ')',
          backgroundSize: 'cover',
        }}
      >
      </div>
      {/* E */}
      <div
        ref={interactE.ref}
        style={{
          ...interactE.style,
          backgroundImage: 'url(' + PazzleA + ')',
          backgroundSize: 'cover',
        }}
      >
      </div>
      {/* F */}
      <div
        ref={interactF.ref}
        style={{
          ...interactF.style,
          backgroundImage: 'url(' + PazzleF + ')',
          backgroundSize: 'cover',
        }}
      >
      </div>
      {/* G */}
      <div
        ref={interactG.ref}
        style={{
          ...interactG.style,
          backgroundImage: 'url(' + PazzleB + ')',
          backgroundSize: 'cover',
        }}
      >
      </div>
      {/* H */}
      <div
        ref={interactH.ref}
        style={{
          ...interactH.style,
          backgroundImage: 'url(' + PazzleG + ')',
          backgroundSize: 'cover',
        }}
      >
      </div>
      {/* I */}
      <div
        ref={interactJ.ref}
        style={{
          ...interactJ.style,
          backgroundImage: 'url(' + PazzleJ + ')',
          backgroundSize: 'cover',
        }}
      >
      </div>
    </div>
  );
};

export default App;
