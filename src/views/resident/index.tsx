import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import EditResidentPage from './EditResidentPage';
import RegisterResidentPage from './RegisterResidentPage';
import ResidentListPage from './ResidentListPage';
import ViewResidentPage from './ViewResidentPage';
import PrivateRoute from '../../components/PrivateRoute';
import { isAdmin } from '../../firebase/auth';

interface ResidentsRouterProps {
  userAcc: UserAcc | undefined;
}

const ResidentsRouter: React.FC<ResidentsRouterProps> = ({ userAcc }) => {
  const match = useRouteMatch();
  return (
    <Switch>
      <PrivateRoute path={`${match.path}/new`} hasPermission={isAdmin(userAcc)}>
        <RegisterResidentPage />
      </PrivateRoute>
      <PrivateRoute
        path={`${match.path}/:residentID/edit`}
        hasPermission={isAdmin(userAcc)}
      >
        <EditResidentPage />
      </PrivateRoute>
      <Route path={`${match.path}/:residentID`}>
        <ViewResidentPage userAcc={userAcc} />
      </Route>
      <Route path={match.path}>
        <ResidentListPage userAcc={userAcc} />
      </Route>
    </Switch>
  );
};

export default ResidentsRouter;
