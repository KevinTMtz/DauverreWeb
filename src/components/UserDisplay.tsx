import React, {useState, MouseEvent} from 'react';
import Markdown from 'markdown-to-jsx';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MuiSelect from '@material-ui/core/Select';
import MuiMenuItem from '@material-ui/core/MenuItem';
import { FormControl } from "@material-ui/core";
/** @jsx jsx */ import { css, jsx } from '@emotion/core';


const divStyle = css({
  padding: '10px',
  margin: '20px',
  display:'flex',
  maxWidth: '50vw',
  '@media (max-width: 600px)': {
    maxWidth: '80vw',
  },
  justifyContent:'space-between'
});



const h1Style = css({
  margin: '5px 0px',
});

const UserDisplay: React.FC <{username: string, password:string, privilege:string}>= ({username, password, privilege}) => {
    const [edit, setEdit] = useState(false);
    const [username2, setUsername] = useState(username);
    const [password2, setPassword] = useState(password);
    const [confpassword2, setConfPassword] = useState('');
    const [privilege2, setPrivilege] = useState(privilege);
    const onSubmit = () => {
      if(confpassword2==password2){
        console.log('Iniciando sesión con datos:', username2, password2,privilege2);
      }
    };
    const update = (event: React.ChangeEvent<any>) => {
      setPrivilege(event.target.value)
    }
    return(
        <div css={divStyle}>
          {!edit &&
          <Button type="submit" variant="contained" color="primary" onClick={() => { setEdit(!edit) }}>
                    Cambiar
          </Button>
          }
          { edit &&
          <FormControl>
              <TextField
                  margin="normal"
                  id="username"
                  label={username}
                  name="username"
                  autoFocus
                  value={username2}
                  onChange={(event) => setUsername(event.target.value)}
                />
              <TextField
                margin="normal"
                name="password"
                label="password"
                type="password"
                id={password}
                value={password2}
                onChange={(event) => setPassword(event.target.value)}
              />
              <TextField
                margin="normal"
                name="confirmpassword"
                label="confirmpassword"
                type="password"
                value={confpassword2}
                onChange={(event) => setConfPassword(event.target.value)}
              />
              <MuiSelect
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={privilege2}
                onChange={ (e) => update(e) } 
              >
                <MuiMenuItem value={'1'}>Administrador</MuiMenuItem>
                <MuiMenuItem value={'2'}>Psicólogo</MuiMenuItem>
              </MuiSelect>
              <div>
                <Button type="submit" variant="contained" color="primary" onClick={() => { onSubmit() }}>
                  Cambiar
                </Button>
                <Button type="submit" variant="contained" color="primary" onClick={() => { setEdit(!edit) }}>
                  Cancelar
                </Button>
              </div>
          </FormControl>
          }
          </div>
    );}

export default UserDisplay;
