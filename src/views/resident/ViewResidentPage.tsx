import React, { useEffect, useState } from 'react';
import {
  useParams,
  Route,
  Switch,
  useRouteMatch,
  useHistory,
} from 'react-router-dom';

import PageTitle from '../../components/PageTitle';
import CreateReport from '../../components/report-components/CreateReport';
import ReportsList from '../../components/report-components/ReportList';
import { getResident } from '../../firebase/db/residents';

const ViewResidentPage: React.FC = () => {
  const { residentID } = useParams<ResidentParams>();
  const history = useHistory();
  const [resident, setResident] = useState<ResidentData>({
    firstName: 'Cargando...',
    lastName: '',
    gender: '',
    isVisible: true,
    birthDate: new Date(),
  });
  useEffect(() => {
    getResident(residentID).then((value) => {
      if (value.state != 'not found') {
        setResident(value.resident);
      }
    });
  }, [residentID, history]);
  const match = useRouteMatch();
  return (
    <div>
      <PageTitle message={'Residente:'} />
      <h3 style={{ textAlign: 'center' }}>
        {resident.firstName + ' ' + resident.lastName}
      </h3>
      <Switch>
        <Route path={`${match.path}/newreport`}>
          <CreateReport />
        </Route>
        <Route path={match.path}>
          <ReportsList />
        </Route>
      </Switch>
    </div>
  );
};

export default ViewResidentPage;
