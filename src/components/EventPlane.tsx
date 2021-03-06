import { Plane } from '@react-three/drei';
import React from 'react';
import { ThreeEvent } from '@react-three/fiber';

interface EventPlaneProps {
  size: [number, number],
  onPointerDown?: (event: ThreeEvent<PointerEvent>) => void
  onPointerMove?: (event: ThreeEvent<PointerEvent>) => void
  onPointerUp?: (event: ThreeEvent<PointerEvent>) => void
  onPointerLeave?: (event: ThreeEvent<PointerEvent>) => void
}

export const EventPlane: React.FC<EventPlaneProps> = ({
  size: [width, height],
  onPointerDown = () => null,
  onPointerMove = () => null,
  onPointerUp = () => null,
  onPointerLeave = () => null,
}: EventPlaneProps) => (
  <Plane
    rotation={[-Math.PI / 2, 0, Math.PI / 2]}
    args={[height, width]}
    position={[0, 1, 0]}
    visible={false}
    onPointerDown={onPointerDown}
    onPointerMove={onPointerMove}
    onPointerUp={onPointerUp}
    onPointerLeave={onPointerLeave}
  >
    <meshStandardMaterial
      attach="material"
      roughness={1}
      metalness={0}
      opacity={1}
      transparent
      wireframe
    />
  </Plane>
);
