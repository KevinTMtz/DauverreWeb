import React, { useEffect, useState } from 'react';

import CircularProgressIndicator from '../components/CircularProgressIndicator';
import PageTitle from '../components/PageTitle';
import UserDisplay from '../components/UserDisplay';
import { listAccounts } from '../firebase/functions';

const AccessModule: React.FC = () => {
  const [accountListings, setAccountListings] = useState<AccountListing[]>();

  useEffect(() => {
    listAccounts().then((res) => {
      if (res.state === 'success') setAccountListings(res.accounts);
    });
  }, []);

  return (
    <div>
      <PageTitle message={'Módulo de acceso'} />
      {accountListings === undefined ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgressIndicator />
        </div>
      ) : (
        accountListings.map((acc) => (
          <UserDisplay
            key={acc.accountID}
            updateOwnPhone={(telephone) => {
              setAccountListings(
                accountListings.map((a) =>
                  a.accountID === acc.accountID ? { ...a, telephone } : a,
                ),
              );
            }}
            {...acc}
          />
        ))
      )}
    </div>
  );
};

export default AccessModule;
