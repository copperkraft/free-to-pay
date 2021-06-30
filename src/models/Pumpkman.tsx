/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from 'three';
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh
    Cube_1: THREE.Mesh
    Cube_2: THREE.Mesh
    Cube_3: THREE.Mesh
    vest: THREE.Mesh
    pants: THREE.Mesh
    pig: THREE.Mesh
  }
  materials: {
    head: THREE.MeshStandardMaterial
    tail: THREE.MeshStandardMaterial
    eyes: THREE.MeshStandardMaterial
    body: THREE.MeshStandardMaterial
    vest: THREE.MeshStandardMaterial
  }
};

export const Pumpkman = () => {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF('/free-to-pay/models/pumpkman.glb') as GLTFResult;
  return (
    <group ref={group} dispose={null} rotation={[0, -Math.PI / 2, 0]} position={[0, -0.5, 0]}>
      <group position={[-0.2, 2.41, 0]} scale={[0.21, 0.21, 0.21]}>
        <mesh geometry={nodes.Cube.geometry} material={materials.head} />
        <mesh geometry={nodes.Cube_1.geometry} material={materials.tail} />
        <mesh geometry={nodes.Cube_2.geometry} material={materials.eyes} />
        <mesh geometry={nodes.Cube_3.geometry} material={materials.body} />
      </group>
      <mesh
        geometry={nodes.vest.geometry}
        material={nodes.vest.material}
        position={[-0.2, 2.41, 0]}
        scale={[0.21, 0.21, 0.21]}
      />
      <mesh
        geometry={nodes.pants.geometry}
        material={nodes.pants.material}
        position={[-0.2, 2.41, 0]}
        scale={[0.21, 0.21, 0.21]}
      />
    </group>
  );
};

useGLTF.preload('/free-to-pay/models/pumpkman.glb');