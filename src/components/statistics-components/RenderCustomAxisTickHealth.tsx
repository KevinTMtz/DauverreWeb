import React from 'react';

import HealthEmoji from '../report-components/HealthEmoji';

const RenderCustomAxisTickHealth: React.FC<CustomAxisTickProps> = ({
  x,
  y,
  payload,
}) => {
  let path = 1;
  switch (payload.value) {
    case 'Saludable':
      path = 1;
      break;
    case 'Poco enfermo':
      path = 2;
      break;
    case 'Enfermo':
      path = 3;
      break;
    case 'Muy enfermo':
      path = 4;
      break;
    case 'Peligro':
      path = 5;
      break;
  }

  return (
    <HealthEmoji
      index={path as OneToFiveIdx}
      x={x - 15}
      y={y + 5}
      width={30}
      height={30}
    />
  );
};

export default RenderCustomAxisTickHealth;
