import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { MapControls, PerspectiveCamera } from '@react-three/drei';
import { GameScene } from '../components/GameScene';

export const Game: React.FC = () => (
  <Canvas
    onCreated={({ gl }) => {
      gl.setClearColor('#000000');
    }}
  >
    <axesHelper />
    <PerspectiveCamera makeDefault position={[0, 20, 15]} />
    <MapControls enabled={false} />
    <Suspense fallback={null}>
      <GameScene />
    </Suspense>
  </Canvas>
);
