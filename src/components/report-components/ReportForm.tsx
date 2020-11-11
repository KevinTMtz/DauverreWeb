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
import SVGEmoji, { SVGEmojiType } from '../SVGEmoji';

const styledForm = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '70%',
  margin: 'auto',
  fontSize: '18px',
  fontWeight: 'bold',
  transitionDuration: '0.3s',
  '@media (max-width: 600px)': {
    width: '90%',
  },
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
  maxWidth: '378px',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  div: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    justifyContent: 'space-between',
  },
  '.groupBinaryOptions': {
    width: 'auto',
    minWidth: '104px',
    maxWidth: '104px',
    height: '100%',
    marginBottom: '0px',
  },
  'div div label': {
    margin: '0px 0px 0px 10px',
  },
  '.legendDiv': {
    display: 'flex',
    flexDirection: 'row',
    marginRight: '20px',
    fontSize: '16px',
  },
  '.legendDiv svg': {
    marginRight: '16px',
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
  const indexes: OneToFiveIdx[] = [1, 2, 3, 4, 5];
  const states: {
    state: SVGEmojiType;
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
      message: '¿Se sintió solo?',
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
        <RadioGroup
          aria-label="mood"
          name="mood"
          row
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {indexes.map((idx) => (
            <FormControlLabel
              control={<Radio />}
              key={idx}
              label={<MoodEmoji index={idx} height="50px" />}
              labelPlacement="top"
              value={`${idx}`}
              onChange={() => setReportState({ ...report, mood: idx })}
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
        <RadioGroup
          aria-label="health"
          name="health"
          row
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          {indexes.map((idx) => (
            <FormControlLabel
              key={idx}
              control={<Radio />}
              label={<HealthEmoji index={idx} height="50px" />}
              labelPlacement="top"
              value={`${idx}`}
              onChange={() => setReportState({ ...report, health: idx })}
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
        {states.map(({ state, message, onChange }) => (
          <div key={state}>
            <div className="legendDiv">
              <SVGEmoji state={state} height="40px" />
              <p>{message}</p>
            </div>
            <RadioGroup
              className="groupBinaryOptions"
              row
              aria-label={state}
              name={state}
            >
              {[true, false].map((isTrue) => (
                <FormControlLabel
                  key={`${state}-${isTrue}`}
                  control={<Radio />}
                  label={isTrue ? 'Sí' : 'No'}
                  labelPlacement="top"
                  value={`${isTrue}`}
                  onChange={() => onChange(isTrue)}
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
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginTop: '32px' }}
      >
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
