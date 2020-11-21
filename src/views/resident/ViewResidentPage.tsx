import React, { useEffect, useState } from 'react';
import {
  useParams,
  Route,
  Switch,
  useRouteMatch,
  useHistory,
} from 'react-router-dom';

import PageTitle from '../../components/PageTitle';
import PrivateRoute from '../../components/PrivateRoute';
import CreateReport from '../../components/report-components/CreateReport';
import ReportsList from '../../components/report-components/ReportList';
import { isPsyOrAdmin } from '../../firebase/auth';
import { getResident } from '../../firebase/db/residents';

interface ViewResidentPageProps {
  userAcc: UserAcc | undefined;
}

const ViewResidentPage: React.FC<ViewResidentPageProps> = ({ userAcc }) => {
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
      if (value.state !== 'not found') {
        setResident(value.resident);
      }
    });
  }, [residentID, history]);
  const match = useRouteMatch();
  return (
    <div style={{ marginBottom: '16px' }}>
      <PageTitle
        message={`Residente ${resident.firstName} ${resident.lastName}`}
      />
      <Switch>
        <PrivateRoute
          path={`${match.path}/newreport`}
          hasPermission={isPsyOrAdmin(userAcc)}
        >
          <CreateReport />
        </PrivateRoute>
        <Route path={match.path}>
          <ReportsList userAcc={userAcc} />
        </Route>
      </Switch>
    </div>
  );
};

export default ViewResidentPage;
