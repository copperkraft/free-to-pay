import React, { MutableRefObject, useRef } from 'react';
import { Group, Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import { useKeyPress } from '../utils/useKeyPress';
import { Pumpkman } from '../models/Pumpkman';
import { Pig } from '../models/Pig';

interface CharacterProps {
  character: MutableRefObject<Group>
}

export const Character: React.FC<CharacterProps> = ({ character }: CharacterProps) => {
  const up = useKeyPress(['ArrowUp', 'KeyW']);
  const down = useKeyPress(['ArrowDown', 'KeyS']);
  const left = useKeyPress(['ArrowLeft', 'KeyA']);
  const right = useKeyPress(['ArrowRight', 'KeyD']);

  const velocity = useRef(new Vector3(0, 0, 0));
  const rotationDirection = useRef(new Vector3(1, 0, 0));
  const {
    speed,
    inertia,
    turningSpeed,
  } = useControls({
    speed: 10,
    inertia: 5,
    turningSpeed: 10,
  });

  useFrame((state, delta) => {
    velocity.current.lerp(new Vector3(
      (-left + (+right)),
      0,
      (-up + (+down)),
    ).normalize(), 1 / inertia / speed);

    if (velocity.current.length() > 1) {
      velocity.current.normalize();
    }

    rotationDirection.current.normalize().lerp(velocity.current, turningSpeed * delta);

    character.current.setRotationFromAxisAngle(
      new Vector3(0, 1, 0),
      Math.atan2(rotationDirection.current.x, rotationDirection.current.z),
    );
    character.current.position.addScaledVector(velocity.current, delta * speed);
  });

  return (
    <group ref={character} position={[0, 0.75, 0]}>
      <Pig />
      <Pumpkman />
    </group>
  );
};
