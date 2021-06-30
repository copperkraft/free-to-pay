import React from 'react';
import { Cylinder } from '@react-three/drei';

const pigSize: [number, number, number] = [0.5, 0.4, 1.2];
const pigLegSize: [number, number, number] = [0.2, 0.1, 0.6];

export const Pig = () => (
  <>
    <Cylinder args={pigSize} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <meshStandardMaterial attach="material" color="pink" />
    </Cylinder>
    <Cylinder args={[0.2, 0.4, 0.8]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.1, 0.75]}>
      <meshStandardMaterial attach="material" color="pink" />
    </Cylinder>
    <Cylinder args={pigLegSize} position={[0.2, -0.5, 0.3]}>
      <meshStandardMaterial attach="material" color="pink" />
    </Cylinder>
    <Cylinder args={pigLegSize} position={[-0.2, -0.5, 0.3]}>
      <meshStandardMaterial attach="material" color="pink" />
    </Cylinder>
    <Cylinder args={pigLegSize} position={[0.2, -0.5, -0.2]}>
      <meshStandardMaterial attach="material" color="pink" />
    </Cylinder>
    <Cylinder args={pigLegSize} position={[-0.2, -0.5, -0.2]}>
      <meshStandardMaterial attach="material" color="pink" />
    </Cylinder>
  </>
);
