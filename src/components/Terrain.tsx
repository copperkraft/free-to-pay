import React, { useRef } from 'react';

import { Mesh, MirroredRepeatWrapping } from 'three';
import { Plane, useTexture } from '@react-three/drei';
import mapUrl from '../textures/gravel/gravel_ground_01_diff_1k.jpg';
import displacementUrl from '../textures/gravel/gravel_ground_01_disp_1k.jpg';
import normalUrl from '../textures/gravel/gravel_ground_01_nor_1k.jpg';
import roughUrl from '../textures/gravel/gravel_ground_01_rough_1k.jpg';
import aoUrl from '../textures/gravel/gravel_ground_01_ao_1k.jpg';

interface TerrainProps {
  size: [number, number];
}

export const Terrain: React.FC<TerrainProps> = ({ size }: TerrainProps) => {
  const terrain = useRef<Mesh>(null!);
  const [
    map,
    displacement,
    normal,
    rough,
    ao,
  ] = useTexture([
    mapUrl,
    displacementUrl,
    normalUrl,
    roughUrl,
    aoUrl,
  ]);

  [map, displacement, normal, rough, ao].forEach((texture) => {
    if (texture.wrapS === MirroredRepeatWrapping) {
      return;
    }
    /* eslint-disable no-param-reassign */
    texture.wrapS = MirroredRepeatWrapping;
    texture.wrapT = MirroredRepeatWrapping;
    texture.repeat.set(6, 6);
    texture.anisotropy = 4;
    /* eslint-enable no-param-reassign */
  });

  return (
    <Plane
      visible
      position={[0, 0, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      ref={terrain}
      args={size}
    >
      <meshStandardMaterial
        map={map}
        roughnessMap={rough}
        normalMap={normal}
        aoMap={ao}
        attach="material"
        roughness={1}
        metalness={0}
        opacity={1}
        transparent
      />
    </Plane>
  );
};
