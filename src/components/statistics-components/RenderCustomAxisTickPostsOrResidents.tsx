import React from 'react';

import OperationEmoji from '../statistics-components/OperationEmoji';

const RenderCustomAxisTickPostsOrResidents: React.FC<CustomaAxisTickProps> = ({
  x,
  y,
  payload,
}) => {
  let path = 1;
  switch (payload.value) {
    case 'Altas':
      path = 1;
      break;
    case 'Actualizaciones':
    case 'Desactivaciones':
      path = 2;
      break;
    case 'Bajas':
      path = 3;
      break;
  }

  return (
    <OperationEmoji
      index={path as OneToThreeIdx}
      x={x - 15}
      y={y + 5}
      width={30}
      height={30}
    />
  );
};

export default RenderCustomAxisTickPostsOrResidents;
