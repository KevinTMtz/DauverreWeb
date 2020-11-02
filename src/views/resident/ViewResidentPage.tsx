import React from 'react';
import { useParams, Route, Switch, useRouteMatch } from 'react-router-dom';

import PageTitle from '../../components/PageTitle';
import CreateReport from '../../components/report-components/CreateReport';
import ReportsList from '../../components/report-components/ReportList';
import ViewReport from '../../components/report-components/ViewReport';

const ViewResidentPage: React.FC = () => {
  const { residentID } = useParams<ResidentParams>();
  const match = useRouteMatch();
  return (
    <div>
      <PageTitle message={'Residente'} />
      <h3>Viewing resident "{residentID}"</h3>
      <Switch>
        <Route path={`${match.path}/newreport`}>
          <CreateReport />
        </Route>
        <Route path={`${match.path}/:reportID`}>
          <ViewReport />
        </Route>
        <Route path={match.path}>
          <ReportsList />
        </Route>
      </Switch>
    </div>
  );
};

export default ViewResidentPage;
