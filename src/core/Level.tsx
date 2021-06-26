import React from 'react';
import { Character } from '../components/Character';

interface LevelProps {}

export const Level: React.FC<LevelProps> = () => (
  <group>
    <Character />
  </group>
);
