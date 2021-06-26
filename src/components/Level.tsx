import React, { useRef } from 'react';
import { Mesh } from 'three';
import { useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';

interface LevelProps {}

export const Level: React.FC<LevelProps> = () => {
  const box = useRef<Mesh>(null!);

  useFrame((state, delta) => {
    box.current.rotateY(delta);
  });

  return (
    <group>
      <Box ref={box} args={[1, 2, 0.5]} position={[0, 1, 0]}>
        <meshStandardMaterial attach="material" color="gray" />
      </Box>
    </group>
  );
};
