import * as THREE from 'three';
import { Group } from 'three';
import React, { MutableRefObject, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

type GLTFResult = GLTF & {
  nodes: {
    bullet: THREE.Mesh
  }
};

interface BulletProps {
  obj: MutableRefObject<Group>
}

export const Bullet: React.FC<BulletProps> = ({ obj }: BulletProps) => {
  const { nodes } = useGLTF('/free-to-pay/models/bullet.glb') as GLTFResult;

  useEffect(() => {
    obj.current.add(nodes.bullet);
  }, [obj]);

  return (
    <group ref={obj} scale={[0.1, 0.1, 0.1]} />
  );
};

useGLTF.preload('/free-to-pay/models/bullet.glb');
