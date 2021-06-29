/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

type GLTFResult = GLTF & {
  nodes: {
    ground: THREE.Mesh
    barn003_1: THREE.Mesh
    barn003_2: THREE.Mesh
    barn001_1: THREE.Mesh
    barn001_2: THREE.Mesh
    barn002_1: THREE.Mesh
    barn002_2: THREE.Mesh
    wheat1: THREE.Mesh
    wheat2: THREE.Mesh
    wheat4: THREE.Mesh
    wheat3: THREE.Mesh
    Corn1: THREE.Mesh
    Corn2: THREE.Mesh
    Corn4: THREE.Mesh
    Corn3: THREE.Mesh
    Hedge: THREE.Mesh
    Bush001: THREE.Mesh
    Bush002: THREE.Mesh
    Bush003: THREE.Mesh
    Bush004: THREE.Mesh
    Bush005: THREE.Mesh
    Bush006: THREE.Mesh
    Bush007: THREE.Mesh
    Bush008: THREE.Mesh
    Bush009: THREE.Mesh
    Bush010: THREE.Mesh
    Bush011: THREE.Mesh
    Bush012: THREE.Mesh
    Bush013: THREE.Mesh
    Bush014: THREE.Mesh
    Bush015: THREE.Mesh
    Bush016: THREE.Mesh
    Bush017: THREE.Mesh
    Bush018: THREE.Mesh
    Bush019: THREE.Mesh
    Bush020: THREE.Mesh
    Bush021: THREE.Mesh
    Bush022: THREE.Mesh
    Bush023: THREE.Mesh
    Bush024: THREE.Mesh
    Bush025: THREE.Mesh
    Bush026: THREE.Mesh
    Bush027: THREE.Mesh
    Bush028: THREE.Mesh
    Bush029: THREE.Mesh
    Bush030: THREE.Mesh
    Bush031: THREE.Mesh
    Bush032: THREE.Mesh
    Bush033: THREE.Mesh
    Bush034: THREE.Mesh
    Bush035: THREE.Mesh
    Bush036: THREE.Mesh
  }
  materials: {
    grass: THREE.MeshStandardMaterial
    barnRoof: THREE.MeshStandardMaterial
    barnWood: THREE.MeshStandardMaterial
    wheat: THREE.MeshStandardMaterial
    corn: THREE.MeshStandardMaterial
    hedge: THREE.MeshStandardMaterial
  }
};

export const Farm = () => {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF('/free-to-pay/models/farm.glb') as GLTFResult;
  return (
    <group ref={group} dispose={null}>
      <mesh
        geometry={nodes.ground.geometry}
        material={materials.grass}
        position={[-4.4, 0, -2.68]}
        scale={[2, 2, 2]}
      />
      <group position={[21.62, 6.01, -38.72]} scale={[2, 2, 2]}>
        <mesh geometry={nodes.barn003_1.geometry} material={nodes.barn003_1.material} />
        <mesh geometry={nodes.barn003_2.geometry} material={nodes.barn003_2.material} />
      </group>
      <group position={[-28.46, 6.01, -14.71]} scale={[2, 2, 2]}>
        <mesh geometry={nodes.barn001_1.geometry} material={nodes.barn001_1.material} />
        <mesh geometry={nodes.barn001_2.geometry} material={nodes.barn001_2.material} />
      </group>
      <group position={[5.89, 6.01, 11.1]} scale={[2, 2, 2]}>
        <mesh geometry={nodes.barn002_1.geometry} material={nodes.barn002_1.material} />
        <mesh geometry={nodes.barn002_2.geometry} material={nodes.barn002_2.material} />
      </group>
      <mesh
        geometry={nodes.wheat1.geometry}
        material={nodes.wheat1.material}
        position={[-29.69, 1, 18.61]}
        scale={[2, 2, 2]}
      />
      <mesh
        geometry={nodes.wheat2.geometry}
        material={nodes.wheat2.material}
        position={[-17.49, 1, 18.61]}
        scale={[2, 2, 2]}
      />
      <mesh
        geometry={nodes.wheat4.geometry}
        material={nodes.wheat4.material}
        position={[-5.56, 1, 18.61]}
        scale={[2, 2, 2]}
      />
      <mesh
        geometry={nodes.wheat3.geometry}
        material={nodes.wheat3.material}
        position={[6.37, 1, 18.61]}
        scale={[2, 2, 2]}
      />
      <mesh
        geometry={nodes.Corn1.geometry}
        material={nodes.Corn1.material}
        position={[-41.55, 1, -39.58]}
        scale={[2, 2, 2]}
      />
      <mesh
        geometry={nodes.Corn2.geometry}
        material={nodes.Corn2.material}
        position={[-29.35, 1, -39.58]}
        scale={[2, 2, 2]}
      />
      <mesh
        geometry={nodes.Corn4.geometry}
        material={nodes.Corn4.material}
        position={[-5.49, 1, -39.58]}
        scale={[2, 2, 2]}
      />
      <mesh
        geometry={nodes.Corn3.geometry}
        material={nodes.Corn3.material}
        position={[-17.42, 1, -39.58]}
        scale={[2, 2, 2]}
      />
      <mesh
        geometry={nodes.Hedge.geometry}
        material={nodes.Hedge.material}
        position={[-53.47, 1, -51.5]}
        scale={[2, 2, 2]}
      />
      <mesh
        geometry={nodes.Bush001.geometry}
        material={nodes.Bush001.material}
        position={[-37.4, 1, -3.68]}
        scale={[2, 2, 2]}
      />
      <mesh
        geometry={nodes.Bush002.geometry}
        material={nodes.Bush002.material}
        position={[-41.4, 1, -3.68]}
        scale={[2, 2, 2]}
      />
      <mesh
        geometry={nodes.Bush003.geometry}
        material={nodes.Bush003.material}
        position={[-35.4, 1, -5.68]}
        scale={[2, 2, 2]}
      />
      <mesh
        geometry={nodes.Bush004.geometry}
        material={nodes.Bush004.material}
        position={[-33.4, 1, -9.68]}
        scale={[2, 2, 2]}
      />
      <mesh
        geometry={nodes.Bush005.geometry}
        material={nodes.Bush005.material}
        position={[-39.4, 1, -9.68]}
        scale={[2, 2, 2]}
      />
      <mesh
        geometry={nodes.Bush006.geometry}
        material={nodes.Bush006.material}
        position={[-43.4, 1, -9.68]}
        scale={[2, 2, 2]}
      />
      <mesh
        geometry={nodes.Bush007.geometry}
        material={nodes.Bush007.material}
        position={[-39.4, 1, -13.68]}
        scale={[2, 2, 2]}
      />
      <mesh
        geometry={nodes.Bush008.geometry}
        material={nodes.Bush008.material}
        position={[8.6, 1, 2.32]}
        scale={[2, 2, 2]}
      />
      <mesh
        geometry={nodes.Bush009.geometry}
        material={nodes.Bush009.material}
        position={[12.6, 1, 2.32]}
        scale={[2, 2, 2]}
      />
      <mesh
        geometry={nodes.Bush010.geometry}
        material={nodes.Bush010.material}
        position={[14.6, 1, -1.68]}
        scale={[2, 2, 2]}
      />
      <mesh
        geometry={nodes.Bush011.geometry}
        material={nodes.Bush011.material}
        position={[22.6, 1, -3.68]}
        scale={[2, 2, 2]}
      />
      <mesh
        geometry={nodes.Bush012.geometry}
        material={nodes.Bush012.material}
        position={[26.6, 1, -9.68]}
        scale={[2, 2, 2]}
      />
      <mesh
        geometry={nodes.Bush013.geometry}
        material={nodes.Bush013.material}
        position={[32.6, 1, -5.68]}
        scale={[2, 2, 2]}
      />
      <mesh
        geometry={nodes.Bush014.geometry}
        material={nodes.Bush014.material}
        position={[28.6, 1, -1.68]}
        scale={[2, 2, 2]}
      />
      <mesh
        geometry={nodes.Bush015.geometry}
        material={nodes.Bush015.material}
        position={[22.6, 1, 0.32]}
        scale={[2, 2, 2]}
      />
      <mesh
        geometry={nodes.Bush016.geometry}
        material={nodes.Bush016.material}
        position={[16.6, 1, 2.32]}
        scale={[2, 2, 2]}
      />
      <mesh
        geometry={nodes.Bush017.geometry}
        material={nodes.Bush017.material}
        position={[16.6, 1, 8.32]}
        scale={[2, 2, 2]}
      />
      <mesh
        geometry={nodes.Bush018.geometry}
        material={nodes.Bush018.material}
        position={[22.6, 1, 8.32]}
        scale={[2, 2, 2]}
      />
      <mesh
        geometry={nodes.Bush019.geometry}
        material={nodes.Bush019.material}
        position={[24.6, 1, 4.32]}
        scale={[2, 2, 2]}
      />
      <mesh
        geometry={nodes.Bush020.geometry}
        material={nodes.Bush020.material}
        position={[28.6, 1, 6.32]}
        scale={[2, 2, 2]}
      />
      <mesh
        geometry={nodes.Bush021.geometry}
        material={nodes.Bush021.material}
        position={[32.6, 1, 2.32]}
        scale={[2, 2, 2]}
      />
      <mesh
        geometry={nodes.Bush022.geometry}
        material={nodes.Bush022.material}
        position={[30.6, 1, 10.32]}
        scale={[2, 2, 2]}
      />
      <mesh
        geometry={nodes.Bush023.geometry}
        material={nodes.Bush023.material}
        position={[26.6, 1, 12.32]}
        scale={[2, 2, 2]}
      />
      <mesh
        geometry={nodes.Bush024.geometry}
        material={nodes.Bush024.material}
        position={[32.6, 1, 14.32]}
        scale={[2, 2, 2]}
      />
      <mesh
        geometry={nodes.Bush025.geometry}
        material={nodes.Bush025.material}
        position={[32.6, 1, 18.32]}
        scale={[2, 2, 2]}
      />
      <mesh
        geometry={nodes.Bush026.geometry}
        material={nodes.Bush026.material}
        position={[20.6, 1, 16.32]}
        scale={[2, 2, 2]}
      />
      <mesh
        geometry={nodes.Bush027.geometry}
        material={nodes.Bush027.material}
        position={[24.6, 1, 20.32]}
        scale={[2, 2, 2]}
      />
      <mesh
        geometry={nodes.Bush028.geometry}
        material={nodes.Bush028.material}
        position={[26.6, 1, 24.32]}
        scale={[2, 2, 2]}
      />
      <mesh
        geometry={nodes.Bush029.geometry}
        material={nodes.Bush029.material}
        position={[30.6, 1, 24.32]}
        scale={[2, 2, 2]}
      />
      <mesh
        geometry={nodes.Bush030.geometry}
        material={nodes.Bush030.material}
        position={[18.6, 1, 24.32]}
        scale={[2, 2, 2]}
      />
      <mesh
        geometry={nodes.Bush031.geometry}
        material={nodes.Bush031.material}
        position={[16.6, 1, 30.32]}
        scale={[2, 2, 2]}
      />
      <mesh
        geometry={nodes.Bush032.geometry}
        material={nodes.Bush032.material}
        position={[24.6, 1, 30.32]}
        scale={[2, 2, 2]}
      />
      <mesh
        geometry={nodes.Bush033.geometry}
        material={nodes.Bush033.material}
        position={[30.6, 1, 28.32]}
        scale={[2, 2, 2]}
      />
      <mesh
        geometry={nodes.Bush034.geometry}
        material={nodes.Bush034.material}
        position={[34.6, 1, 34.32]}
        scale={[2, 2, 2]}
      />
      <mesh
        geometry={nodes.Bush035.geometry}
        material={nodes.Bush035.material}
        position={[24.6, 1, 34.32]}
        scale={[2, 2, 2]}
      />
      <mesh
        geometry={nodes.Bush036.geometry}
        material={nodes.Bush036.material}
        position={[18.6, 1, 36.32]}
        scale={[2, 2, 2]}
      />
    </group>
  );
};

useGLTF.preload('/free-to-pay/models/farm.glb');
