import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';

import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
import useStyles from './useStyles';
import { TNotesModel } from '../../../../stores/models/NotesModel';

interface INotesDrawerProps {
  notes?: TNotesModel;
  isOpen: boolean;
  onCancel: () => void;
}

const NotesDrawer = ({
  notes,
  isOpen,
  onCancel,
}: INotesDrawerProps): JSX.Element => {
  const classes = useStyles();
  const [localNotes, setLocalNotes] = useState<string>(notes.notes);

  useEffect(() => {
    setLocalNotes(notes.notes);
  }, [notes.notes]);

  const handleCancel = (): void => {
    setLocalNotes(notes.notes);
    onCancel();
  };

  const handleSave = (): void => {
    notes.setNotes(localNotes);
    onCancel();
  };

  return (
    <Drawer anchor="right" open={isOpen} onClose={handleCancel}>
      <Grid
        container
        justify="space-between"
        alignItems="center"
        className={classes.header}
      >
        <Typography className={classes.title}>Notes</Typography>
        <IconButton size="small" onClick={handleCancel}>
          <CloseIcon className={classes.close} />
        </IconButton>
      </Grid>
      <Divider />

      <Box className={classes.content}>
        <Typography className={classes.notes}>
          Use this field to take notes about your campaign. Please
          remember to save the campaign in order to save your notes.
        </Typography>

        <TextField
          label="Note"
          multiline
          value={localNotes}
          onChange={(event): void =>
            setLocalNotes(event.target.value)
          }
          fullWidth
        />
      </Box>

      <Grid
        className={classes.footer}
        container
        justify="flex-end"
        alignItems="center"
      >
        <Button onClick={handleCancel} className={classes.cancel}>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
        >
          Save
        </Button>
      </Grid>
    </Drawer>
  );
};

export default inject(({ campaignFormHeader }) => ({
  notes: campaignFormHeader.notes,
}))(observer(NotesDrawer));
