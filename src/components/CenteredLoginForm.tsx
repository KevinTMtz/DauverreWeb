import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const styledForm = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: '400px',
  margin: '0 auto',
  padding: '20px',
});

interface CenteredLoginFormProps
  extends React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {}

const CenteredLoginForm: React.FC<CenteredLoginFormProps> = ({
  children,
  ...formProps
}) => (
  <form css={styledForm} {...formProps}>
    {children}
  </form>
);

export default CenteredLoginForm;
