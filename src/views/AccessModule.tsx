import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/core/Autocomplete';

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

const divStyle = css({
  marginBottom: '12px',
  width: '100%',
  transitionDuration: '0.3s',
});

const AccessModule: React.FC = () => {
  const [accountListings, setAccountListings] = useState<AccountListing[]>();
  const [displayedAccs, setDisplayedAccs] = useState<AccountListing[]>([]);

  useEffect(() => {
    listAccounts().then((res) => {
      if (res.state === 'success') {
        setAccountListings(res.accounts);
        setDisplayedAccs(res.accounts);
      }
    });
  }, []);

  const showSelectedAccount = (residentInput: string | null) => {
    if (residentInput !== null && accountListings) {
      setDisplayedAccs(
        accountListings.filter((r) => r.telephone === residentInput),
      );
    } else {
      setDisplayedAccs(accountListings || []);
    }
  };

  const updateOwnPhone = (accountID: string) => (telephone: string) => {
    if (accountListings === undefined) return;
    setAccountListings(
      accountListings.map((a) =>
        a.accountID === accountID ? { ...a, telephone } : a,
      ),
    );
    setDisplayedAccs(
      displayedAccs.map((a) =>
        a.accountID === accountID ? { ...a, telephone } : a,
      ),
    );
  };

  if (accountListings === undefined) {
    return (
      <div css={styledContainer}>
        <PageTitle message={'Módulo de acceso'} />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgressIndicator />
        </div>
      </div>
    );
  }

  return (
    <div css={styledContainer}>
      <PageTitle message={'Módulo de acceso'} />
      <div>
        <div css={divStyle}>
          <Autocomplete
            id="search-telephone"
            onChange={(_: any, newResidentInput: string | null) => {
              showSelectedAccount(newResidentInput);
            }}
            options={accountListings.map((option) => option.telephone)}
            renderInput={(params: any) => (
              <TextField {...params} label="Buscar teléfono" margin="normal" />
            )}
          />
        </div>
        {displayedAccs.map((acc) => (
          <UserDisplay
            key={acc.accountID}
            updateOwnPhone={updateOwnPhone(acc.accountID)}
            {...acc}
          />
        ))}
      </div>
    </div>
  );
};

export default AccessModule;
