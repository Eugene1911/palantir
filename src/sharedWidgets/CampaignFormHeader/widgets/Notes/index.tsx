import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';

import Button from '@material-ui/core/Button';
import DescriptionIcon from '@material-ui/icons/Description';
import useStyles from './useStyles';
import { TNotesModel } from '../../stores/models/NotesModel';
import NotesDrawer from './components/NotesDrawer';

interface INotesProps {
  notes?: TNotesModel;
}

const Notes = ({ notes }: INotesProps): JSX.Element => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = (): void => setIsOpen(prevOpen => !prevOpen);

  return (
    <>
      <Button
        color="primary"
        className={classes.button}
        startIcon={<DescriptionIcon color="primary" />}
        onClick={toggleOpen}
      >
        Notes
      </Button>

      <NotesDrawer onCancel={toggleOpen} isOpen={isOpen} />
    </>
  );
};

export default inject(({ campaignFormHeader }) => ({
  notes: campaignFormHeader.notes,
}))(observer(Notes));
