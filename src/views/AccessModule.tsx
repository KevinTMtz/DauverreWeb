import React, {useState, MouseEvent} from 'react';
/** @jsx jsx */ import { css, jsx } from '@emotion/core';
import Button from '@material-ui/core/Button';
import UserDisplay from '../components/UserDisplay'

import PageTitle from '../components/PageTitle';

const divStyle = css({
  padding: '10px',
  margin: '20px',
  borderRadius: '10px',
  border: '1px solid black',
  display:'flex',
  maxWidth: '50vw',
  '@media (max-width: 600px)': {
    maxWidth: '80vw',
  },
  justifyContent:'space-between'
});

const styledTitle = css({
  textAlign: 'center',
});

const h1Style = css({
  margin: '5px 0px',
});

const users = [{
  userID: '1',
  username :  "usuario1",
  privilege: '1',
  password: "password1"

},{
  userID: '2',
  username :  "usuario2",
  privilege: '2',
  password: "password2"

}]




const AccessModule: React.FC = () => {
  const [edit, setEdit] = useState(false);
  return (
    <div>
      <PageTitle message={'Módulo de acceso'} />
      <h1 css={styledTitle}>
        Módulo de acceso</h1>
      <div>
        {users.map((u)=>(
            <div css={divStyle}>
                <h1 css={h1Style}>
                    {u.username}
                </h1>
                <UserDisplay username={u.username} password={u.password} privilege={u.privilege} />
            </div>
            
        ))}
      </div>
      
    </div>
  );
};




export default AccessModule;
