import React, { useEffect, useState } from 'react';
import UserDisplay from '../components/UserDisplay'
import PageTitle from '../components/PageTitle';
import { getResidents } from '../firebase/db/residents';

const AccessModule: React.FC = () => {
  const [residents, setResidents] = useState<Resident[]>([]);
  useEffect(() => {
    getResidents().then((resid) => setResidents(resid));
  }, []);
  return (
    <div>
      <PageTitle message={'Modulo de acceso'} />
      {residents.map((r) => (
        <UserDisplay key={r.residentID} firstName = {r.firstName} lastName={r.lastName} gender={r.gender}/>
      ))}
    </div>
  );
};




export default AccessModule;
