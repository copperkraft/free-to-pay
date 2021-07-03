import React, { MutableRefObject, useRef } from 'react';
import { Group } from 'three';
import { Knife } from '../models/Knife';

export enum ProjectileType {
  BULLET,
}

interface ProjectileProps {
  obj: MutableRefObject<Group>,
  type: ProjectileType,
}

export const Projectile: React.FC<ProjectileProps> = ({ obj, type }: ProjectileProps) => {
  const projectileModelObject = useRef<Group>(null!);
  const getWeaponComponent = (t: ProjectileType) => {
    switch (t) {
      case ProjectileType.BULLET:
      default:
        return <Knife obj={projectileModelObject} />;
    }
  };

  return (
    <group ref={obj} position={[0, 0, 0]}>
      {getWeaponComponent(type)}
    </group>
  );
};
