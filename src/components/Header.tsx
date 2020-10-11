import React from 'react';
import { useLocation, useRouteMatch } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  console.log(location);
  const match = useRouteMatch();
  console.log(match);
  return (
    <div>
      <h1>Header</h1>
    </div>
  );
};

export default Header;
