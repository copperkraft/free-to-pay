import React, { MutableRefObject, useRef } from 'react';
import { Group, Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import { useKeyPress } from '../utils/useKeyPress';
import { Pumpkman } from '../models/Pumpkman';
import { Pig } from '../models/Pig';

interface CharacterProps {
  character: MutableRefObject<Group>,
  pointerPosition: MutableRefObject<Vector3>
}

enum CharacterState {
  IDLE,
  ACCELERATION,
  RUN,
  SLOWDOWN,
}

export const Character: React.FC<CharacterProps> = ({
  character,
  pointerPosition,
}: CharacterProps) => {
  const characterTop = useRef<Group>(null!);

  const up = useKeyPress(['ArrowUp', 'KeyW']);
  const down = useKeyPress(['ArrowDown', 'KeyS']);
  const left = useKeyPress(['ArrowLeft', 'KeyA']);
  const right = useKeyPress(['ArrowRight', 'KeyD']);

  const yAxis = new Vector3(0, 1, 0);
  const characterState = useRef(CharacterState.IDLE);
  const velocity = useRef(0);
  const direction = useRef(new Vector3(0, 0, 0));
  const forwardVector = useRef(new Vector3(0, 0, 0));
  const pointerPositionLocal = useRef(new Vector3(0, 0, 0));
  const turning = useRef(false);
  const {
    maxSpeed,
    turningSpeed,
    acceleration,
    slowdown,
  } = useControls({
    maxSpeed: 10,
    turningSpeed: 10,
    acceleration: 20,
    slowdown: 20,
  });

  useFrame((state, delta) => {
    if (up || left || right || down) {
      if (characterState.current === CharacterState.IDLE
        || characterState.current === CharacterState.SLOWDOWN) {
        characterState.current = CharacterState.ACCELERATION;
        turning.current = true;
      }

      direction.current.copy(new Vector3(
        (-left + (+right)),
        0,
        (-up + (+down)),
      ).normalize());
    } else if (characterState.current === CharacterState.RUN
      || characterState.current === CharacterState.ACCELERATION) {
      turning.current = false;
      characterState.current = CharacterState.SLOWDOWN;
    }

    switch (characterState.current) {
      case CharacterState.ACCELERATION:
        velocity.current += acceleration * delta;
        if (velocity.current >= maxSpeed) {
          velocity.current = maxSpeed;
          characterState.current = CharacterState.RUN;
        }
        break;
      case CharacterState.RUN:
        break;
      case CharacterState.SLOWDOWN:
        velocity.current -= slowdown * delta;
        if (velocity.current <= 0) {
          velocity.current = 0;
          direction.current.copy(new Vector3(0, 0, 0));
          characterState.current = CharacterState.IDLE;
        }

        break;
      case CharacterState.IDLE:
      default:
        break;
    }

    character.current.getWorldDirection(forwardVector.current);

    if (turning.current) {
      const crossed = forwardVector.current.clone().cross(direction.current);
      let angle = forwardVector.current.angleTo(direction.current);
      if (crossed.y < 0) angle = -angle;
      const angleDiff = delta * turningSpeed;
      if (Math.abs(angle) < angleDiff) {
        character.current.rotateOnAxis(yAxis, angle);
      } else if (angle > 0) {
        angle -= angleDiff;
        character.current.rotateOnAxis(yAxis, angleDiff);
      } else {
        angle += angleDiff;
        character.current.rotateOnAxis(yAxis, -angleDiff);
      }

      character.current.position.addScaledVector(direction.current, delta * velocity.current);
    }

    if (pointerPosition.current) {
      character.current.getWorldDirection(forwardVector.current);
      pointerPositionLocal.current.subVectors(character.current.position, pointerPosition.current);
      // Тут легкое безумие с углами)
      let topRotationAngle = pointerPositionLocal.current.angleTo(forwardVector.current)
        - Math.PI / 2;
      const crossed = pointerPositionLocal.current.cross(forwardVector.current);
      if (crossed.y > 0) topRotationAngle = -topRotationAngle - Math.PI;
      characterTop.current.setRotationFromAxisAngle(
        yAxis,
        topRotationAngle - Math.PI,
      );
    }
  });

  return (
    <group ref={character} position={[0, 0.75, 0]}>
      <Pig />
      <Pumpkman top={characterTop} />
    </group>
  );
};
