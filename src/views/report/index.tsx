import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import EditReportPage from './EditReportPage';
import ReportListPage from './ReportListPage';
import ViewReportPage from './ViewReportPage';

const ReportsRouter: React.FC = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}/:reportID/edit`}>
        <EditReportPage />
      </Route>
      <Route path={`${match.path}/:reportID`}>
        <ViewReportPage />
      </Route>
      <Route path={match.path}>
        <ReportListPage />
      </Route>
    </Switch>
  );
};

export default ReportsRouter;
