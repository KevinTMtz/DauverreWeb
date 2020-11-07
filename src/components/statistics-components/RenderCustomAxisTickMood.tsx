import React from 'react';

import MoodEmoji from '../report-components/MoodEmoji';

const RenderCustomAxisTickMood: React.FC<CustomAxisTickProps> = ({
  x,
  y,
  payload,
}) => {
  let path = 1;
  switch (payload.value) {
    case 'Muy felíz':
      path = 1;
      break;
    case 'Felíz':
      path = 2;
      break;
    case 'Neutro':
      path = 3;
      break;
    case 'Triste':
      path = 4;
      break;
    case 'Muy triste':
      path = 5;
      break;
  }

  return (
    <MoodEmoji
      index={path as OneToFiveIdx}
      x={x - 15}
      y={y + 5}
      width={30}
      height={30}
    />
  );
};

export default RenderCustomAxisTickMood;
