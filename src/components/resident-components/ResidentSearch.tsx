import React from 'react';
/** @jsx jsx */ import { css, jsx } from '@emotion/core';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/core/Autocomplete';

const divStyle = css({
  marginBottom: '12px',
  width: '70%',
  transitionDuration: '0.3s',
  '@media (max-width: 600px)': {
    width: '90%',
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
        renderInput={(params) => (
          <TextField {...params} label="Buscar residente" margin="normal" />
        )}
      />
    </div>
  );
};

export default SearchInput;
