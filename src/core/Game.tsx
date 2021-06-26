import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { MapControls, PerspectiveCamera } from '@react-three/drei';
import { GameScene } from '../components/GameScene';
import { Level } from '../components/Level';

export const Game: React.FC = () => (
  <Canvas
    onCreated={({ gl }) => {
      gl.setClearColor('#000000');
    }}
  >
    <PerspectiveCamera makeDefault position={[0, 10, 5]} />
    <MapControls enabled />
    <Suspense fallback={null}>
      <GameScene>
        <Level />
      </GameScene>
    </Suspense>
  </Canvas>
);
