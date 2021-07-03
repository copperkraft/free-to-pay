import React, { MutableRefObject, useRef } from 'react';
import { Group } from 'three';
import { Knife } from '../models/Knife';
import { Rifle } from '../models/Rifle';

export enum WeaponType {
  RIFLE,
  KNIFE,
}

interface WeaponProps {
  obj: MutableRefObject<Group>,
  type: WeaponType,
}

export const Weapon: React.FC<WeaponProps> = ({ obj, type }: WeaponProps) => {
  const weaponModelObject = useRef<Group>(null!);
  const getWeaponComponent = (t: WeaponType) => {
    switch (t) {
      case WeaponType.RIFLE:
        return <Rifle obj={weaponModelObject} />;
      case WeaponType.KNIFE:
      default:
        return <Knife obj={weaponModelObject} />;
    }
  };

  return (
    <group ref={obj} position={[0, 0, 0]}>
      {getWeaponComponent(type)}
    </group>
  );
};
