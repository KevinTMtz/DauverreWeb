import React from 'react';
import 'date-fns';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
/** @jsx jsx */ import { css, jsx } from '@emotion/core';

const styledForm = css({
  width: '80%',
  margin: 'auto',
  '@media (max-width: 600px)': {
    width: '90%',
  },
  fontSize: '18px',
  fontWeight: 'bold',
});

const PostForm: React.FC<any> = (props) => {
  return (
    <form autoComplete="off" onSubmit={props.onSubmit} css={styledForm}>
      <p>Título</p>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="title"
        label="Título"
        name="title"
        autoComplete="username"
        autoFocus
        value={props.post.title}
        onChange={(event) =>
          props.setPostState({ ...props.post, title: event.target.value })
        }
      />
      <p>Fecha</p>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          fullWidth
          value={props.post.date}
          onChange={(event) =>
            props.setPostState({
              ...props.post,
              date: new Date(event!.valueOf()),
            })
          }
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider>
      <p>Contenido de texto</p>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        multiline
        id="textContent"
        label="Contenido textual"
        name="textContent"
        autoComplete="username"
        autoFocus
        value={props.post.content}
        onChange={(event) =>
          props.setPostState({ ...props.post, content: event.target.value })
        }
      />
      <p>Imagen</p>

      <Button type="submit" variant="contained" color="primary" fullWidth>
        {props.buttonMessage}
      </Button>
    </form>
  );
};

export default PostForm;
