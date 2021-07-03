import * as THREE from 'three';
import { Group } from 'three';
import React, { MutableRefObject } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

type GLTFResult = GLTF & {
  nodes: {
    ['Node-Mesh']: THREE.Mesh
    ['Node-Mesh_1']: THREE.Mesh
    ['Node-Mesh_2']: THREE.Mesh
    ['Node-Mesh_3']: THREE.Mesh
    ['Node-Mesh_4']: THREE.Mesh
    ['Node-Mesh_5']: THREE.Mesh
    ['Node-Mesh_6']: THREE.Mesh
    ['Node-Mesh_7']: THREE.Mesh
    ['Node-Mesh_8']: THREE.Mesh
    ['Node-Mesh_9']: THREE.Mesh
  }
  materials: {
    mat23: THREE.MeshStandardMaterial
    mat20: THREE.MeshStandardMaterial
    mat21: THREE.MeshStandardMaterial
    mat22: THREE.MeshStandardMaterial
    mat15: THREE.MeshStandardMaterial
    mat9: THREE.MeshStandardMaterial
    mat10: THREE.MeshStandardMaterial
    mat11: THREE.MeshStandardMaterial
    mat17: THREE.MeshStandardMaterial
    mat16: THREE.MeshStandardMaterial
  }
};

interface RifleProps {
  obj: MutableRefObject<Group>
}

export const Rifle: React.FC<RifleProps> = ({ obj }: RifleProps) => {
  const { nodes, materials } = useGLTF('/free-to-pay/models/rifle.glb') as GLTFResult;
  return (
    <group
      scale={[2.5, 2.5, 2.5]}
      ref={obj}
      position={[0.4, 2, 0.3]}
      dispose={null}
      rotation={[0, -Math.PI / 2, 0]}
    >
      <mesh geometry={nodes['Node-Mesh'].geometry} material={materials.mat23} />
      <mesh geometry={nodes['Node-Mesh_1'].geometry} material={materials.mat20} />
      <mesh geometry={nodes['Node-Mesh_2'].geometry} material={materials.mat21} />
      <mesh geometry={nodes['Node-Mesh_3'].geometry} material={materials.mat22} />
      <mesh geometry={nodes['Node-Mesh_4'].geometry} material={materials.mat15} />
      <mesh geometry={nodes['Node-Mesh_5'].geometry} material={materials.mat9} />
      <mesh geometry={nodes['Node-Mesh_6'].geometry} material={materials.mat10} />
      <mesh geometry={nodes['Node-Mesh_7'].geometry} material={materials.mat11} />
      <mesh geometry={nodes['Node-Mesh_8'].geometry} material={materials.mat17} />
      <mesh geometry={nodes['Node-Mesh_9'].geometry} material={materials.mat16} />
    </group>
  );
};

useGLTF.preload('/free-to-pay/models/rifle.glb');
