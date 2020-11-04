import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import EditResidentPage from './EditResidentPage';
import RegisterResidentPage from './RegisterResidentPage';
import ResidentListPage from './ResidentListPage';
import ViewResidentPage from './ViewResidentPage';

const ResdientsRouter: React.FC = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}/new`}>
        <RegisterResidentPage />
      </Route>
      <Route path={`${match.path}/:residentID/edit`}>
        <EditResidentPage />
      </Route>
      <Route path={`${match.path}/:residentID`}>
        <ViewResidentPage />
      </Route>
      <Route path={match.path}>
        <ResidentListPage />
      </Route>
    </Switch>
  );
};

export default ResdientsRouter;
