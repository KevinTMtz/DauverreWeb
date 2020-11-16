import React, { useEffect, useState } from 'react';

import CircularProgressIndicator from '../components/CircularProgressIndicator';
import PageTitle from '../components/PageTitle';
import UserDisplay from '../components/UserDisplay';
import { listAccounts } from '../firebase/functions';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const AccessModule: React.FC = () => {
  const [accountListings, setAccountListings] = useState<AccountListing[]>();
  const [displayAccounts, setDisplayedAccounts] = useState<AccountListing[]>();

  useEffect(() => {
    listAccounts().then((res) => {
      if (res.state === 'success') setAccountListings(res.accounts);
    });
  }, []);

  const showSelectedAccount = (residentInput: string | null) => {
    if (residentInput !== null && accountListings) {
      setDisplayedAccounts(
        accountListings.filter((r) => r.telephone === residentInput),
      );
    } else {
      setDisplayedAccounts(accountListings);
    }
  };
  return (
    <div>
      <PageTitle message={'Módulo de acceso'} />
      {accountListings === undefined ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgressIndicator />
        </div>
      ) : (
        <div>
          <div style={{width:'250px', marginLeft:'50px'}}>
            <Autocomplete
              id="search-telephone"
              onChange={(event: any, newResidentInput: string | null) => {
                showSelectedAccount(newResidentInput);
              }}
              options={accountListings.map((option) => option.telephone)}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Buscar teléfono"
                  margin="normal"
                  variant="outlined"
                />
              )}
            />
          </div>
          {displayAccounts!==undefined? displayAccounts.map((acc) => (
            <UserDisplay
              key={acc.accountID}
              updateOwnPhone={(telephone) => {
                setAccountListings(
                  displayAccounts.map((a) =>
                    a.accountID === acc.accountID ? { ...a, telephone } : a,
                  ),
                );
              }}
              {...acc}
            />
          )): accountListings.map((acc) => (
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
          ))}
        </div>
      )}
    </div>
  );
};




export default AccessModule;


