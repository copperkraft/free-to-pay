import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';

import { GameScene } from '../components/GameScene';

export const Game: React.FC = () => (
  <Canvas
    onCreated={({ gl }) => {
      gl.setClearColor('#000000');
    }}
  >
    <Suspense fallback={null}>
      <GameScene />
    </Suspense>
  </Canvas>
);
