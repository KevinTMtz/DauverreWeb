import React, { useEffect, useState } from 'react';
/** @jsx jsx */ import { css, jsx } from '@emotion/core';

import CircularProgressIndicator from '../components/CircularProgressIndicator';
import PageTitle from '../components/PageTitle';
import UserDisplay from '../components/UserDisplay';
import { listAccounts } from '../firebase/functions';

const styledContainer = css({
  margin: '0px auto',
  width: '70%',
  transitionDuration: '0.3s',
  '@media (max-width: 600px)': {
    width: '90%',
  },
});

const AccessModule: React.FC = () => {
  const [accountListings, setAccountListings] = useState<AccountListing[]>();

  useEffect(() => {
    listAccounts().then((res) => {
      if (res.state === 'success') setAccountListings(res.accounts);
    });
  }, []);

  return (
    <div css={styledContainer}>
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
