import React, { PropsWithChildren } from 'react';
import { Character } from './Character';
import { Level } from './Level';

interface GameSceneProps {}

const levelSize: [number, number] = [40, 40];

export const GameScene: React.FC<GameSceneProps> = ({
  children,
}: PropsWithChildren<GameSceneProps>) => (
  <>
    <Level size={levelSize} />
    <pointLight color="white" intensity={2} position={[10, 10, 5]} />
    <ambientLight color="yellow" intensity={0.2} />
    <Character />
    {children}
  </>
);
