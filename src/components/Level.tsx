import React, {
  useEffect, useMemo, useState,
} from 'react';
import { mapImageToLevel } from '../utils/levelConverter';
import { Farm } from '../models/Farm';

export const Level: React.FC = () => {
  const [level, setLevel] = useState<string[][]>([]);

  useEffect(() => {
    mapImageToLevel().then((loadedLevel) => setLevel(loadedLevel));
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const size = useMemo<[number, number]>(() => ([
    level.length,
    level[0]?.length || 0,
  ]), [level]);

  return (
    <group>
      <Farm />
    </group>
  );
};
