import React, { PropsWithChildren } from 'react';
import { Terrain } from './Terrain';

interface GameSceneProps {}

export const GameScene: React.FC<GameSceneProps> = ({
  children,
}: PropsWithChildren<GameSceneProps>) => (
  <>
    <Terrain />
    <pointLight color="white" intensity={1} position={[5, 3, -5]} />
    <ambientLight color="yellow" intensity={0.2} />
    {children}
  </>
);
