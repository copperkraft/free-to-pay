import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { MapControls } from '@react-three/drei';
import { GameScene } from '../components/GameScene';

export const Game: React.FC = () => (
  <Canvas
    onCreated={({ gl }) => {
      gl.setClearColor('#000000');
    }}
  >
    <MapControls enabled={false} />
    <Suspense fallback={null}>
      <GameScene />
    </Suspense>
  </Canvas>
);
