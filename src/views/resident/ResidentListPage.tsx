import React, { useEffect, useState } from 'react';

import { getResidents } from '../../firebase/db/residents';
import PageTitle from '../../components/PageTitle';

const ResidentListPage: React.FC = () => {
  const [residents, setResidents] = useState<Resident[]>([]);
  useEffect(() => {
    getResidents().then((resid) => setResidents(resid));
  }, []);
  return (
    <div>
      <PageTitle message={'Residentes'} />
      <div>
      {residents.map((r) => (
        <div key={r.residentID}>
          <h2>
            Nombre: {r.firstName} {r.lastName} {r.residentID}
          </h2>
          <h5>Sexo: {r.gender}</h5>
          {r.isVisible || (
            <h5>
              Este residente no se encuentra actualmente en la institución
            </h5>
          )}
        </div>
      ))}
      </div>
    </div>
  );
};

export default ResidentListPage;
