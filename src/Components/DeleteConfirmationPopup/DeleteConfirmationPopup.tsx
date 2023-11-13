import React, { FC, ReactElement } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import ButtonComponent from './../ButtonComponent/ButtonComponent';
import WarningAmberIcon  from '@mui/icons-material/WarningAmber';
import "./DeleteConfirmationPopup.css";

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationDialog: FC<DeleteConfirmationDialogProps> = ({
  isOpen,
  onCancel,
  onConfirm,
}): ReactElement => {
  return (
    <Dialog open={isOpen} onClose={onCancel}>
      <DialogTitle className='dialog-title'>
      <WarningAmberIcon  style={{ fontSize: 40}} />
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
        Are you sure you want to delete this track? This action is irreversible.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <ButtonComponent
          onClick={onCancel}
          variant="outlined"
          color="success" 
          text="Cancel"
        />
        <ButtonComponent
          onClick={onConfirm}
          variant="contained"
          color="error"
          text="Delete"
        />
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
