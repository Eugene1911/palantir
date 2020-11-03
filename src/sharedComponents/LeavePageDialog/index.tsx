import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

type TLeaveDialog = {
  isOpen: boolean;
  onCloseHandler: () => void;
  onAgreeHandler: () => void;
};

function LeavePageDialog({
  isOpen,
  onCloseHandler,
  onAgreeHandler,
}: TLeaveDialog): JSX.Element {
  const { t } = useTranslation(['common']);

  return (
    <Dialog
      open={isOpen}
      keepMounted
      onClose={onCloseHandler}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        {t('common:leave_page_dialog:title')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {t('common:leave_page_dialog:text')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseHandler} color="primary">
          {t('common:leave_page_dialog:disagree')}
        </Button>
        <Button
          variant="contained"
          onClick={onAgreeHandler}
          color="primary"
        >
          {t('common:leave_page_dialog:agree')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default LeavePageDialog;
