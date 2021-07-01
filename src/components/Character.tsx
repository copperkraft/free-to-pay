import React, { MutableRefObject, useRef } from 'react';
import { Group, Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import { useKeyPress } from '../utils/useKeyPress';
import { Pumpkman } from '../models/Pumpkman';
import { Pig } from '../models/Pig';

const yAxis = new Vector3(0, 1, 0);

interface CharacterProps {
  character: MutableRefObject<Group>,
  pointer: MutableRefObject<Group>
}

enum CharacterState {
  IDLE,
  ACCELERATION,
  RUN,
  SLOWDOWN,
}

export const Character: React.FC<CharacterProps> = ({
  character,
  pointer,
}: CharacterProps) => {
  const rider = useRef<Group>(null!);
  const velocity = useRef(new Vector3(0, 0, 0));
  const mountDirection = useRef(new Vector3(1, 0, 0));
  const riderDirection = useRef(new Vector3(1, 0, 0));

  const up = useKeyPress(['ArrowUp', 'KeyW']);
  const down = useKeyPress(['ArrowDown', 'KeyS']);
  const left = useKeyPress(['ArrowLeft', 'KeyA']);
  const right = useKeyPress(['ArrowRight', 'KeyD']);

  const characterState = useRef(CharacterState.IDLE);

  const {
    speed,
    turningSpeed,
    inertia,
  } = useControls({
    speed: 20,
    turningSpeed: 20,
    inertia: 1,
  });

  useFrame((state, delta) => {
    const acceleration = new Vector3(
      -left + (+right),
      0,
      -up + (+down),
    );

    if (acceleration.length() === 0) {
      characterState.current = CharacterState.SLOWDOWN;
    }

    velocity.current.lerp(acceleration.normalize(), 1 / inertia / speed);

    if (velocity.current.length() > 1) {
      velocity.current.normalize();
    }

    characterState.current = velocity.current.length() < 0.1
      ? CharacterState.IDLE
      : characterState.current = velocity.current.length() > 0.9
        ? CharacterState.RUN
        : characterState.current = acceleration.length() === 0
          ? CharacterState.SLOWDOWN
          : CharacterState.ACCELERATION;

    mountDirection.current
      .lerp(velocity.current, turningSpeed * delta)
      .normalize();

    riderDirection.current
      .subVectors(pointer.current.position, character.current.position)
      .normalize();

    const characterRotationAngle = Math.atan2(mountDirection.current.x, mountDirection.current.z);
    const riderRotationAngle = Math.atan2(riderDirection.current.x, riderDirection.current.z);

    character.current.setRotationFromAxisAngle(
      yAxis,
      characterRotationAngle,
    );

    rider.current.setRotationFromAxisAngle(
      yAxis,
      riderRotationAngle - characterRotationAngle,
    );

    character.current.position.addScaledVector(velocity.current, delta * speed);
  });

  return (
    <group ref={character} position={[0, 0.75, 0]}>
      <Pig />
      <Pumpkman top={rider} />
    </group>
  );
};
