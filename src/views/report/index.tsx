import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import EditReportPage from './EditReportPage';
import ViewReportPage from './ViewReportPage';

const ReportsRouter: React.FC = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}/edit`}>
        <EditReportPage />
      </Route>
      <Route path={match.path}>
        <ViewReportPage />
      </Route>
    </Switch>
  );
};

export default ReportsRouter;
