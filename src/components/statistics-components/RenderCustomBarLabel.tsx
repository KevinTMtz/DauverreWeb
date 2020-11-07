import React from 'react';

interface CustomBarLabelProps {
  x: number;
  y: number;
  width: number;
  value: any;
}

const RenderCustomBarLabel: React.FC<CustomBarLabelProps> = ({
  x,
  y,
  width,
  value,
}) => {
  return (
    <text x={x + width / 2} y={y} fill="#000" textAnchor="middle" dy={-6}>
      {value}
    </text>
  );
};

export default RenderCustomBarLabel;
