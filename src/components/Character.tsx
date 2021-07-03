import React, { MutableRefObject, useRef, useState } from 'react';
import { Group, Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import { useKeyPress } from '../utils/useKeyPress';
import { Pumpkman } from '../models/Pumpkman';
import { WeaponType } from './Weapon';
import { Piggy } from '../models/Piggy';
import { CharacterState } from '../utils/characterState.enum';

const yAxis = new Vector3(0, 1, 0);

const getCharacterState = (speed: number, acceleration: number) => {
  if (speed < 0.1) {
    return CharacterState.IDLE;
  }
  if (speed > 0.9) {
    return CharacterState.RUN;
  }
  if (acceleration === 0) {
    return CharacterState.SLOWDOWN;
  }
  return CharacterState.ACCELERATION;
};

interface CharacterProps {
  character: MutableRefObject<Group>,
  pointer: MutableRefObject<Group>,
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
  const weapon1key = useKeyPress(['Digit1']);
  const weapon2key = useKeyPress(['Digit2']);

  const weapon = useRef(WeaponType.RIFLE);
  const [characterState, setCharacterState] = useState(CharacterState.IDLE);

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

    velocity.current.lerp(acceleration.normalize(), 1 / inertia / speed);

    if (velocity.current.length() > 1) {
      velocity.current.normalize();
    }

    setCharacterState(getCharacterState(velocity.current.length(), acceleration.length()));

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

    // Weapons

    if (weapon1key) weapon.current = WeaponType.RIFLE;
    if (weapon2key) weapon.current = WeaponType.KNIFE;
  });

  return (
    <group ref={character} position={[0, 0.75, 0]}>
      <Piggy characterState={characterState} />
      <Pumpkman top={rider} weapon={weapon.current} />
    </group>
  );
};
