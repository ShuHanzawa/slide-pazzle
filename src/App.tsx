import React from 'react';
import {useEffect} from 'react';
import './App.css';
import {useInteractJS} from './hooks';
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
  const initPositionB = {
    width: 80,
    height: 80,
    x: 80,
    y: 0,
  };
  const initPositionC = {
    width: 80,
    height: 80,
    x: 160,
    y: 0,
  };
  const initPositionD = {
    width: 80,
    height: 80,
    x: 0,
    y: 80,
  };
  const initPositionE = {
    width: 80,
    height: 80,
    x: 80,
    y: 80,
  };
  const initPositionF = {
    width: 80,
    height: 80,
    x: 160,
    y: 80,
  };
  const initPositionG = {
    width: 80,
    height: 80,
    x: 0,
    y: 160,
  };
  const initPositionH = {
    width: 80,
    height: 80,
    x: 80,
    y: 160,
  };
  const initPositionJ = {
    width: 80,
    height: 80,
    x: 240,
    y: 160,
  };
  const interactA = useInteractJS();
  const interactB = useInteractJS(initPositionB);
  const interactC = useInteractJS(initPositionC);
  const interactD = useInteractJS(initPositionD);
  const interactE = useInteractJS(initPositionE);
  const interactF = useInteractJS(initPositionF);
  const interactG = useInteractJS(initPositionG);
  const interactH = useInteractJS(initPositionH);
  const interactJ = useInteractJS(initPositionJ);

  useEffect(() => {
    console.log('useEffect');
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
    console.log('first set');
    interactA.disable();
    interactB.disable();
    interactC.disable();
    interactD.disable();
    interactE.disable();
    interactG.disable();
  }, []);

  return (
    <div className='App'>
      {/* A (0,0) */}
      <div
        ref={interactA.ref}
        style={{
          ...interactA.style,
          backgroundImage: 'url(' + PazzleC + ')',
          backgroundSize: 'cover',
        }}
      >
      </div>
      {/* B (80,0) */}
      <div
        ref={interactB.ref}
        style={{
          ...interactB.style,
          backgroundImage: 'url(' + PazzleH + ')',
          backgroundSize: 'cover',
        }}
      >
      </div>
      {/* C (160,0) */}
      <div
        ref={interactC.ref}
        style={{
          ...interactC.style,
          backgroundImage: 'url(' + PazzleE + ')',
          backgroundSize: 'cover',
        }}
      >
      </div>
      {/* D (0,80) */}
      <div
        ref={interactD.ref}
        style={{
          ...interactD.style,
          backgroundImage: 'url(' + PazzleD + ')',
          backgroundSize: 'cover',
        }}
      >
      </div>
      {/* E (80,80) */}
      <div
        ref={interactE.ref}
        style={{
          ...interactE.style,
          backgroundImage: 'url(' + PazzleA + ')',
          backgroundSize: 'cover',
        }}
      >
      </div>
      {/* F (160,80) */}
      <div
        ref={interactF.ref}
        style={{
          ...interactF.style,
          backgroundImage: 'url(' + PazzleF + ')',
          backgroundSize: 'cover',
        }}
      >
      </div>
      {/* G (0,160) */}
      <div
        ref={interactG.ref}
        style={{
          ...interactG.style,
          backgroundImage: 'url(' + PazzleB + ')',
          backgroundSize: 'cover',
        }}
      >
      </div>
      {/* H (80,160) */}
      <div
        ref={interactH.ref}
        style={{
          ...interactH.style,
          backgroundImage: 'url(' + PazzleG + ')',
          backgroundSize: 'cover',
        }}
      >
      </div>
      {/* I (160,160) */}
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
