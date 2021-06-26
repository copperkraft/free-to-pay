import React, { useRef } from 'react';
import { Mesh, Vector3 } from 'three';
import { Box } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useKeyPress } from '../utils/useKeyPress';

export function Character() {
  const box = useRef<Mesh>(null!);

  const up = useKeyPress(['ArrowUp', 'KeyW']);
  const down = useKeyPress(['ArrowDown', 'KeyS']);
  const left = useKeyPress(['ArrowLeft', 'KeyA']);
  const right = useKeyPress(['ArrowRight', 'KeyD']);

  useFrame((state, delta) => {
    box.current.rotateY(delta);
    box.current.position.add(new Vector3(
      (-left + (+right)),
      0,
      (-up + (+down)),
    ).normalize().multiplyScalar(0.04));
  });

  return (
    <Box ref={box} args={[1, 2, 0.5]} position={[0, 2, 0]}>
      <meshStandardMaterial attach="material" color="gray" />
    </Box>
  );
}
