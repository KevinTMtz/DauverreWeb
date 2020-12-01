import React from 'react';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';

interface CustomDialogProps extends DialogProps {}

const CustomDialog: React.FC<CustomDialogProps> = ({
  children,
  ...dialogProps
}) => (
  <Dialog
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    onClose={(event, reason) => {
      if (dialogProps.onClose) dialogProps.onClose(event, reason);
    }}
    {...dialogProps}
  >
    {children}
  </Dialog>
);

export default CustomDialog;
