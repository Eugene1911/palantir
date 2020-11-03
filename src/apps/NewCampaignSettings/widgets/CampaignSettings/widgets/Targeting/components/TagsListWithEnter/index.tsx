import React, { useState } from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import useStyles from './useStyles';
import CustomChip from '../../../../components/CustomChip';
import InputDeleteIcon from '../../../../components/InputDeleteIcon';

interface ITagsListWithEnterProps {
  list: string[];
  onEnter: (text: string) => void;
  onDelete: (text: string) => void;
  onClearAll: () => void;
  isError: boolean;
  label: string;
  tagsCount: number;
}

const TagsListWithEnter = ({
  list,
  onEnter,
  onDelete,
  isError,
  label,
  onClearAll,
  tagsCount,
}: ITagsListWithEnterProps): JSX.Element => {
  const classes = useStyles();
  const [inputText, setInputText] = useState<string>('');

  const onKeyPressHandler = (
    event: React.KeyboardEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ): void => {
    const { key } = event;

    if (key === 'Enter') {
      onEnter(inputText);
      setInputText('');
    }
  };

  return (
    <>
      <Grid
        alignItems="flex-end"
        className={classes.container}
        container
      >
        <Grid xs={5} item>
          <TextField
            label={label}
            variant="standard"
            onChange={(evt): void =>
              setInputText(evt.target.value as string)
            }
            fullWidth
            value={inputText}
            InputProps={{
              startAdornment: (
                <InputDeleteIcon
                  value={inputText}
                  onClick={(): void => setInputText('')}
                  visible={!!inputText}
                />
              ),
            }}
            // eslint-disable-next-line react/jsx-no-duplicate-props
            inputProps={{
              onKeyPress: (evt): void => onKeyPressHandler(evt),
            }}
          />
        </Grid>
        {!!tagsCount && (
          <Grid>
            <Button
              className={classes.button}
              color="primary"
              onClick={onClearAll}
            >
              Clear all
            </Button>
          </Grid>
        )}
      </Grid>
      <Grid className={classes.container} container>
        {list.map(item => (
          <CustomChip
            onDelete={(): void => onDelete(item)}
            key={item}
            label={item}
            isActive={!isError}
            isError={isError}
          />
        ))}
      </Grid>
    </>
  );
};

export default TagsListWithEnter;
