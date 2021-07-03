import React, { PropsWithChildren, useRef } from 'react';
import { Group, Vector3 } from 'three';
import { ThreeEvent, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { useControls } from 'leva';
import { Character } from './Character';
import { Level } from './Level';
import { EventPlane } from './EventPlane';
import { Pointer } from '../models/Pointer';

interface GameSceneProps { }

export const GameScene: React.FC<GameSceneProps> = ({
  children,
}: PropsWithChildren<GameSceneProps>) => {
  const character = useRef<Group>(null!);
  const pointer = useRef<Group>(null!);
  const interestPoint = useRef(new Vector3(0, 0, 0));

  const {
    cameraSpeed,
    cameraPosition,
  } = useControls({
    cameraSpeed: 0.01,
    cameraPosition: 0.6,
  });

  const onPointerMove = (event: ThreeEvent<PointerEvent>) => {
    pointer.current.position.copy(event.point);
  };

  useFrame(({ camera }) => {
    interestPoint.current.lerp(
      pointer.current.position.clone().lerp(character.current.position, cameraPosition),
      cameraSpeed,
    );

    camera.position.set(...new Vector3(0, 35, 15).add(interestPoint.current).toArray());

    camera.lookAt(interestPoint.current);
  });

  return (
    <>
      <Level />
      <pointLight color="white" intensity={2} position={[10, 20, 5]} />
      <PerspectiveCamera makeDefault position={[0, 40, 25]} zoom={1.5} />
      <ambientLight color="yellow" intensity={0.2} />
      <group>
        <EventPlane
          size={[300, 300]}
          onPointerMove={onPointerMove}
        />
      </group>
      <Pointer pointer={pointer} />
      <Character character={character} pointer={pointer} />
      {children}
    </>
  );
};
