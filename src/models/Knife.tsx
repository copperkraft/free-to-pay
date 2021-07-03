import * as THREE from 'three';
import { Group } from 'three';
import React, { MutableRefObject } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

type GLTFResult = GLTF & {
  nodes: {
    ['Cube024_Cube-Mesh']: THREE.Mesh
    ['Cube024_Cube-Mesh_1']: THREE.Mesh
    ['Cube024_Cube-Mesh_2']: THREE.Mesh
  }
  materials: {
    ['1A1A1A']: THREE.MeshStandardMaterial
    ['455A64']: THREE.MeshStandardMaterial
    ['78909C']: THREE.MeshStandardMaterial
  }
};

interface KnifeProps {
  obj: MutableRefObject<Group>
}

export const Knife: React.FC<KnifeProps> = ({ obj }: KnifeProps) => {
  const { nodes, materials } = useGLTF('/free-to-pay/models/knife.glb') as GLTFResult;

  return (
    <group scale={[1, 1, 1]} ref={obj} dispose={null}>
      <mesh geometry={nodes['Cube024_Cube-Mesh'].geometry} material={materials['1A1A1A']} />
      <mesh geometry={nodes['Cube024_Cube-Mesh_1'].geometry} material={materials['455A64']} />
      <mesh geometry={nodes['Cube024_Cube-Mesh_2'].geometry} material={materials['78909C']} />
    </group>
  );
};

useGLTF.preload('/free-to-pay/models/knife.glb');
