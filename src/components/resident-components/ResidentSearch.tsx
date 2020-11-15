import React from 'react';
import { useHistory } from 'react-router-dom';
/** @jsx jsx */ import { css, jsx } from '@emotion/core';
import TextField, {
  FilledTextFieldProps,
  OutlinedTextFieldProps,
  StandardTextFieldProps,
} from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

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

const SearchInput: React.FC = () => {
  const history = useHistory();
  return (
    <div css={divStyle}>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={residentsList.map((option) => option.title)}
        renderInput={(
          params:
            | (JSX.IntrinsicAttributes & StandardTextFieldProps)
            | (JSX.IntrinsicAttributes & FilledTextFieldProps)
            | (JSX.IntrinsicAttributes & OutlinedTextFieldProps),
        ) => (
          <TextField
            {...params}
            label="Search input"
            margin="normal"
            variant="outlined"
            InputProps={{ ...params.InputProps, type: 'search' }}
          />
        )}
      />
    </div>
  );
};

export default SearchInput;

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const residentsList = [
  { title: 'MarioJim', year: 1994 },
  { title: 'ElItsukakito XD', year: 1972 },
  { title: 'Lars17S Plata IV Lol xd', year: 1974 },
];
