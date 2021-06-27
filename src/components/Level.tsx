import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';

import { Mesh, MirroredRepeatWrapping } from 'three';
import { Plane, useTexture, Text } from '@react-three/drei';
import mapUrl from '../textures/gravel/gravel_ground_01_diff_1k.jpg';
import displacementUrl from '../textures/gravel/gravel_ground_01_disp_1k.jpg';
import normalUrl from '../textures/gravel/gravel_ground_01_nor_1k.jpg';
import roughUrl from '../textures/gravel/gravel_ground_01_rough_1k.jpg';
import aoUrl from '../textures/gravel/gravel_ground_01_ao_1k.jpg';
import { mapImageToLevel } from '../utils/levelConverter';

interface LevelProps {
  size: [number, number];
}

export const Level: React.FC<LevelProps> = () => {
  const [level, setLevel] = useState<string[][]>([]);

  useEffect(() => {
    mapImageToLevel().then((loadedLevel) => setLevel(loadedLevel));
  });

  const size = useMemo<[number, number]>(() => ([
    level.length,
    level[0]?.length || 0,
  ]), [level]);

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
    <>
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
      <Text>
        { level.map((row) => row.join(',')).join('\n') }
      </Text>
    </>
  );
};
