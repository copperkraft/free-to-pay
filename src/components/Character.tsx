import React, { useEffect, useRef } from 'react';
import { Mesh, Vector3 } from 'three';
import { Box, Cylinder, Sphere } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import { useKeyPress } from '../utils/useKeyPress';

const pigSize: [number, number, number] = [0.5, 0.4, 1.2];
const pigLegSize: [number, number, number] = [0.2, 0.1, 0.6];

enum CharacterState {
  IDLE,
  ACCELERATION,
  RUN,
  SLOWDOWN,
  MIN_SPEED,
}

export interface CharacterProps {
  moveTarget: Vector3 | null;
}

export const Character: React.FC<CharacterProps> = ({ moveTarget }: CharacterProps) => {
  const box = useRef<Mesh>(null!);
  const elevation = 0.75;

  const up = useKeyPress(['ArrowUp', 'KeyW']);
  const down = useKeyPress(['ArrowDown', 'KeyS']);
  const left = useKeyPress(['ArrowLeft', 'KeyA']);
  const right = useKeyPress(['ArrowRight', 'KeyD']);
  const velocity = useRef(0);
  const {
    maxSpeed,
    minSpeed,
    acceleration,
    slowdown,
    rotationSpeed,
    useKeys,
    useKeysTurningCoeff,
  } = useControls(
    {
      maxSpeed: 10,
      minSpeed: 1,
      acceleration: 20,
      slowdown: 20,
      rotationSpeed: 5,
      useKeys: false,
      useKeysTurningCoeff: 50,
    },
  );
  const turning = useRef(false);
  const characterState = useRef(CharacterState.IDLE);

  const forwardVector = useRef(new Vector3(0, 0, 0));
  const direction = useRef(new Vector3(0, 0, 0));
  const targetPosition = useRef(new Vector3(0, 0, 0));
  const remainedDistance = useRef(0);
  const targetRotationAngle = useRef(0);

  useEffect(() => {
    if (moveTarget && !useKeys) {
      if (characterState.current === CharacterState.IDLE
        || characterState.current === CharacterState.SLOWDOWN) {
        characterState.current = CharacterState.ACCELERATION;
      }

      turning.current = true;
      moveTarget.setY(elevation);
      direction.current.subVectors(moveTarget, box.current.position).normalize();
      targetPosition.current.copy(moveTarget);
      box.current.getWorldDirection(forwardVector.current);
      targetRotationAngle.current = direction.current.angleTo(forwardVector.current);
      if (direction.current.clone().cross(forwardVector.current).y > 0) {
        targetRotationAngle.current = -targetRotationAngle.current;
      }
    }
  }, [moveTarget]);

  useFrame((state, delta) => {
    if (useKeys) {
      if (up || left || right || down) {
        if (characterState.current === CharacterState.IDLE
          || characterState.current === CharacterState.SLOWDOWN) {
          characterState.current = CharacterState.ACCELERATION;
        }

        direction.current.lerp(new Vector3(
          (-left + (+right)),
          0,
          (-up + (+down)),
        ).normalize(), 1 / useKeysTurningCoeff).normalize();

        turning.current = true;
      } else if (characterState.current === CharacterState.RUN
        || characterState.current === CharacterState.ACCELERATION) {
        characterState.current = CharacterState.SLOWDOWN;
      }
    }

    // Movement

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
        if (!useKeys) {
          if (velocity.current <= minSpeed) {
            velocity.current = minSpeed;
            characterState.current = CharacterState.MIN_SPEED;
          }
        } else if (velocity.current <= 0) {
          velocity.current = 0;
          characterState.current = CharacterState.IDLE;
        }

        break;
      case CharacterState.MIN_SPEED:
      case CharacterState.IDLE:
      default:
        break;
    }

    if (characterState.current !== CharacterState.IDLE) {
      if (!useKeys) {
        remainedDistance.current = targetPosition.current.distanceTo(box.current.position);
        if (remainedDistance.current < (maxSpeed * maxSpeed) / (2 * slowdown)) {
          characterState.current = CharacterState.SLOWDOWN;
        }

        const diff = delta * velocity.current;
        if (remainedDistance.current < diff) {
          box.current.position.copy(targetPosition.current);
          velocity.current = 0;
          characterState.current = CharacterState.IDLE;
        } else {
          box.current.position.addScaledVector(direction.current, diff);
        }
      }
      if (useKeys) {
        const diff = delta * velocity.current;
        box.current.position.addScaledVector(direction.current, diff);
      }
    }

    // Turning

    if (turning.current) {
      if (!useKeys) {
        box.current.getWorldDirection(forwardVector.current);
        const angleDiff = delta * rotationSpeed;
        if (Math.abs(targetRotationAngle.current) < angleDiff) {
          box.current.rotateOnAxis(new Vector3(0, 1, 0), targetRotationAngle.current);
          turning.current = false;
        } else if (targetRotationAngle.current > 0) {
          targetRotationAngle.current -= angleDiff;
          box.current.rotateOnAxis(new Vector3(0, 1, 0), angleDiff);
        } else {
          targetRotationAngle.current += angleDiff;
          box.current.rotateOnAxis(new Vector3(0, 1, 0), -angleDiff);
        }
      } else {
        box.current.setRotationFromAxisAngle(
          new Vector3(0, 1, 0),
          Math.atan2(direction.current.x, direction.current.z),
        );
      }
    }
  });

  return (
    <group ref={box} position={[0, elevation, 0]}>
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
        <Box args={[0.75, 1, 0.5]} position={[0, 0.5, 0]}>
          <meshStandardMaterial attach="material" color="green" />
        </Box>
        <Sphere args={[0.2]} position={[0, 1.25, 0]}>
          <meshStandardMaterial attach="material" color="pink" />
        </Sphere>
      </group>
    </group>
  );
};
