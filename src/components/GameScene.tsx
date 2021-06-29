import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import React, { PropsWithChildren, useCallback, useState } from 'react';
import { Vector3 } from 'three';
import { useMouse } from '../utils/useMouse';
import { Character } from './Character';
import { Level } from './Level';

interface GameSceneProps { }

const levelSize: [number, number] = [40, 40];

export const GameScene: React.FC<GameSceneProps> = ({
  children,
}: PropsWithChildren<GameSceneProps>) => {
  const mouseUp = useMouse(['Left']);
  const [moving, setMoving] = useState(false);

  const {
    followMouse,
  } = useControls(
    {
      followMouse: false,
    },
  );

  // Тут что-то не так с коллбэками. followMouse и moving не сбрасывают мемоизацию коллбэка.
  // Что-то я не понимаю до конца в реакте тут, замыкания не замыкаются.
  // А если followMouse true по умолчанию сделать, то только один раз работает.

  const [moveTarget, setMoveTarget] = useState<Vector3 | null>(null);

  const onTerrainPointerDown = useCallback((target: Vector3) => {
    if (followMouse) {
      setMoving(true);
    }
    setMoveTarget(target);
  }, [followMouse, moving]);

  const onTerrainPointerMove = useCallback((target: Vector3) => {
    if (followMouse && moving) {
      setMoveTarget(target);
    }
  }, [followMouse, moving]);

  useFrame(() => {
    if (mouseUp && moving) {
      setMoving(false);
    }
  });

  return (
    <>
      <Level
        onTerrainPointerDown={onTerrainPointerDown}
        onTerrainPointerMove={onTerrainPointerMove}
      />
      <pointLight color="white" intensity={2} position={[10, 10, 5]} />
      <ambientLight color="yellow" intensity={0.2} />
      <Character moveTarget={moveTarget} />
      {children}
    </>
  );
};
