import React, { useRef } from 'react';
import { Mesh, Vector3 } from 'three';
import { Cylinder } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import { useKeyPress } from '../utils/useKeyPress';
import { Pumpkman } from '../models/Pumpkman';

const pigSize: [number, number, number] = [0.5, 0.4, 1.2];
const pigLegSize: [number, number, number] = [0.2, 0.1, 0.6];

export function Character() {
  const box = useRef<Mesh>(null!);
  const up = useKeyPress(['ArrowUp', 'KeyW']);
  const down = useKeyPress(['ArrowDown', 'KeyS']);
  const left = useKeyPress(['ArrowLeft', 'KeyA']);
  const right = useKeyPress(['ArrowRight', 'KeyD']);
  const velocity = useRef(new Vector3(0, 0, 0));
  const { speed, inertia } = useControls({ speed: 10, inertia: 5 });

  useFrame((state, delta) => {
    velocity.current.lerp(new Vector3(
      (-left + (+right)),
      0,
      (-up + (+down)),
    ).normalize(), 1 / inertia / speed);

    if (velocity.current.length() > 1) {
      velocity.current.normalize();
    }

    box.current.setRotationFromAxisAngle(
      new Vector3(0, 1, 0),
      Math.atan2(velocity.current.x, velocity.current.z),
    );
    box.current.position.addScaledVector(velocity.current, delta * speed);
  });

  return (
    <group ref={box} position={[0, 0.75, 0]}>
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

      <group>
        <Pumpkman />
      </group>
    </group>
  );
}
