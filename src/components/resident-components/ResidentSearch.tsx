import React from 'react';
/** @jsx jsx */ import { css, jsx } from '@emotion/core';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { AutocompleteRenderInputParams } from '@material-ui/lab/Autocomplete/Autocomplete';

const divStyle = css({
  display: 'flex',
  flexDirection: 'column',
  padding: '16px',
  margin: '10px 0px',
  borderRadius: '10px',
  boxShadow: '0 4px 12px 0 rgba(0,0,0,0.2)',
  width: 'calc(70% - 32px)',
  transitionDuration: '0.3s',
  '@media (max-width: 600px)': {
    width: 'calc(90% - 32px)',
  },
});

interface ResidentListProps {
  residentsList: Resident[];
  setDisplayedResidents: React.Dispatch<React.SetStateAction<Resident[]>>;
}

const SearchInput: React.FC<ResidentListProps> = ({
  residentsList,
  setDisplayedResidents,
}) => {
  const showSelectedResident = (residentInput: string | null) => {
    if (residentInput !== null) {
      setDisplayedResidents(
        residentsList.filter((r) => r.firstName === residentInput),
      );
    } else {
      setDisplayedResidents(residentsList);
    }
  };

  return (
    <div css={divStyle}>
      <Autocomplete
        id="search-input-residents"
        onChange={(event: any, newResidentInput: string | null) => {
          showSelectedResident(newResidentInput);
        }}
        options={residentsList.map((resident) => resident.firstName)}
        renderInput={(params: AutocompleteRenderInputParams) => (
          <TextField
            {...params}
            label="Buscar residente"
            margin="normal"
            variant="outlined"
          />
        )}
      />
    </div>
  );
};

export default SearchInput;
