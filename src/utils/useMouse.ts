import { useCallback, useEffect, useState } from 'react';

const mouseButtonMap = [
  'Left',
];

export const useMouse = (key: string | string[]): boolean => {
  const [isFired, set] = useState(false);
  const keys = (Array.isArray(key) ? key : [key]);

  const handleMouseUp = useCallback(
    (event: MouseEvent) => {
      if (!isFired && keys.includes(mouseButtonMap[event.button])) {
        set(true);
      }
    },
    [...keys, isFired],
  );

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseUp]);

  return isFired;
};
