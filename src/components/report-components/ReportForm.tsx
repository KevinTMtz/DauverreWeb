import React from 'react';
import 'date-fns';

import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
/** @jsx jsx */ import { css, jsx } from '@emotion/core';
import MoodEmoji from './MoodEmoji';
import HealthEmoji from './HealthEmoji';
import StateEmoji, { StateEmojiType } from './StateEmoji';

const styledForm = css({
  width: '80%',
  margin: 'auto',
  '@media (max-width: 600px)': {
    width: '90%',
  },
  fontSize: '18px',
  fontWeight: 'bold',
});

const styledInput = css({
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  legend: {
    marginBottom: '20px',
  },
});

const styledOptions = css({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  div: {
    width: '45%',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    justifyContent: 'space-between',
  },
  'div div': {
    display: 'block',
    width: 'auto',
  },
  legend: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '20px',
  },
  'legend svg': {
    marginRight: '50px',
  },
});

interface ReportFormProps {
  report: ReportData;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  cancelOperation: () => void;
  setReportState: React.Dispatch<React.SetStateAction<ReportData>>;
  buttonMessage: string;
}

const ReportForm: React.FC<ReportFormProps> = ({
  report,
  onSubmit,
  cancelOperation,
  setReportState,
  buttonMessage,
}) => {
  const nums = [1, 2, 3, 4, 5];
  const states: {
    state: StateEmojiType;
    message: string;
    onChange: (value: boolean) => void;
  }[] = [
    {
      state: 'crying',
      message: '¿Estuvo deprimido?',
      onChange: (value) => setReportState({ ...report, sad: value }),
    },
    {
      state: 'angry',
      message: '¿Estuvo enojado?',
      onChange: (value) => setReportState({ ...report, angry: value }),
    },
    {
      state: 'sleepy',
      message: '¿Durmió bien?',
      onChange: (value) => setReportState({ ...report, rested: value }),
    },
    {
      state: 'food',
      message: '¿Se alimentó bien?',
      onChange: (value) => setReportState({ ...report, wellFed: value }),
    },
    {
      state: 'alone',
      message: 'Se sintió solo?',
      onChange: (value) => setReportState({ ...report, lonely: value }),
    },
  ];
  return (
    <form autoComplete="off" onSubmit={onSubmit} css={styledForm}>
      <FormControl
        variant="outlined"
        margin="normal"
        required
        fullWidth
        component="fieldset"
        css={styledInput}
      >
        <FormLabel component="legend">Estado de ánimo general:</FormLabel>
        <RadioGroup aria-label="mood" name="mood" row>
          {nums.map((num) => (
            <FormControlLabel
              control={<Radio />}
              key={num}
              label={<MoodEmoji index={num} height="50px" />}
              labelPlacement="top"
              value={'' + num} //Si no es string entonces no aparece la selección
              onChange={() => setReportState({ ...report, mood: num })}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <FormControl
        variant="outlined"
        margin="normal"
        required
        fullWidth
        component="fieldset"
        css={styledInput}
      >
        <FormLabel component="legend">Estado de salud general:</FormLabel>
        <RadioGroup aria-label="health" name="health" row>
          {nums.map((num) => (
            <FormControlLabel
              key={num}
              control={<Radio />}
              label={<HealthEmoji index={num} height="50px" />}
              labelPlacement="top"
              value={'' + num} //Si no es string entonces no aparece la selección
              onChange={() => setReportState({ ...report, health: num })}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <FormControl
        variant="outlined"
        margin="normal"
        required
        fullWidth
        component="fieldset"
        css={styledOptions}
      >
        <FormLabel component="legend" style={{ marginBottom: '10px' }}>
          Esta semana...
        </FormLabel>
        {states.map((state) => (
          <div key={state.state}>
            <FormLabel component="legend" key={state.state + 'Label'}>
              {<StateEmoji state={state.state} height="40px" />}
              {state.message}
            </FormLabel>
            <RadioGroup
              aria-label={state.state}
              name={state.state}
              row
              key={state.state + 'Group'}
            >
              {[true, false].map((isTrue) => (
                <FormControlLabel
                  key={state.state + '' + isTrue}
                  control={<Radio />}
                  label={isTrue ? 'Sí' : 'No'}
                  labelPlacement="top"
                  value={'' + isTrue} //Si no es string entonces no aparece la selección
                  onChange={() => state.onChange(isTrue)}
                />
              ))}
            </RadioGroup>
          </div>
        ))}
      </FormControl>
      <TextField
        variant="outlined"
        margin="normal"
        required={false}
        fullWidth
        id="comentarios"
        label="Comentarios"
        name="comentarios"
        autoFocus
        value={report.comments}
        onChange={(event) =>
          setReportState({
            ...report,
            comments: event.target.value,
          })
        }
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        {buttonMessage}
      </Button>
      <Button
        type="submit"
        variant="contained"
        color="secondary"
        fullWidth
        style={{ marginTop: '20px' }}
        onClick={cancelOperation}
      >
        Cancelar
      </Button>
    </form>
  );
};

export default ReportForm;
