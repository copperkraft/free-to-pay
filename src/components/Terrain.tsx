import React, { useEffect, useRef } from 'react';

import { Mesh, RepeatWrapping } from 'three';
import { useTexture } from '@react-three/drei';
import mapUrl from '../textures/gravel/gravel_ground_01_diff_1k.jpg';
import displacementUrl from '../textures/gravel/gravel_ground_01_disp_1k.jpg';
import normalUrl from '../textures/gravel/gravel_ground_01_nor_1k.jpg';
import roughUrl from '../textures/gravel/gravel_ground_01_rough_1k.jpg';
import aoUrl from '../textures/gravel/gravel_ground_01_ao_1k.jpg';

export function Terrain() {
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

  useEffect(() => {
    [map, displacement, normal, rough, ao].forEach((texture) => {
      /* eslint-disable no-param-reassign */
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
      texture.repeat.set(2, 2);
      texture.anisotropy = 4;
      /* eslint-enable no-param-reassign */
    });
  });

  return (
    <mesh
      visible
      rotation={[-Math.PI / 2, 0, 0]}
      ref={terrain}
    >
      <planeBufferGeometry attach="geometry" args={[10, 10]} />
      <meshStandardMaterial
        map={map}
        displacementMap={displacement}
        normalMap={normal}
        roughnessMap={rough}
        aoMap={ao}
        attach="material"
        roughness={1}
        metalness={0}
        opacity={1}
        transparent
      />
    </mesh>
  );
}
