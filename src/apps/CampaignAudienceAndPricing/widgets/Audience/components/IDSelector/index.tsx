import React, { useState } from 'react';
import isArray from 'lodash/isArray';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { KEY_ENTER_CODE } from 'config/constants';
import { Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import { ETagStatus } from '../../assets/constants/commonAudienceTypes';
import {
  disabledTagToolTip,
  radioTitles,
} from '../../assets/constants/rightSidesConst';
import textToTagsID from './services/textToTagsWithCheck';
import * as S from './styles';
import useStyles from './useStyles';

export interface IDSelectorProps {
  radioSelected: number;
  onRadioChange: (index: number) => void;
  onInputEnter: (value: string[]) => void;
  onEditClick: () => void;
  tags: any[];
  tagsSelected: any[];
  closeTag: (id: string) => void;
  clearTags: () => void;
  placeholder: string;
}

function IDSelector(props?: IDSelectorProps): JSX.Element {
  const {
    placeholder,
    radioSelected,
    onRadioChange,
    onInputEnter,
    onEditClick,
    tags,
    tagsSelected,
    closeTag,
    clearTags,
  } = props;
  const [inputText, setInputText] = useState('');

  const onInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void =>
    setInputText(target.value);

  const onKeyPressHandler = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    const { key } = event;

    if (key === KEY_ENTER_CODE) {
      const tagsID = textToTagsID(inputText, tags);

      event.preventDefault();

      if (isArray(tagsID)) {
        onInputEnter(tagsID);
      }

      setInputText('');
    }
  };

  const onCloseTagHandler = tag => {
    closeTag(tag.id);
  };

  const onClearTagsHandler = () => {
    setInputText('');
    clearTags();
  };

  const onCopyHandler = () => {
    const text = tagsSelected.map(({ id }) => id).join(', ');
    navigator.clipboard.writeText(text);
  };

  const isWhiteListChecked = radioSelected === 0;
  const classes = useStyles();
  const { palette } = useTheme();

  return (
    <>
      <S.RadioGroup>
        <S.RadioWrap>
          <Radio
            checked={isWhiteListChecked}
            onChange={() => onRadioChange(0)}
          />
          <S.RadioTitle>
            <Typography
              color={
                isWhiteListChecked ? 'primary' : palette.statuses.grey
              }
            >
              {radioTitles.whitelist}
            </Typography>
          </S.RadioTitle>
          <S.RadioLabel checked={isWhiteListChecked} isWhiteList>
            <Typography color="primary">{tags.length}</Typography>
          </S.RadioLabel>
        </S.RadioWrap>
        <S.RadioWrap>
          <Radio
            checked={!isWhiteListChecked}
            onChange={() => onRadioChange(1)}
          />
          <S.RadioTitle>
            <Typography
              color={
                !isWhiteListChecked
                  ? 'primary'
                  : palette.statuses.grey
              }
            >
              {radioTitles.blacklist}
            </Typography>
          </S.RadioTitle>
          <S.RadioLabel
            checked={!isWhiteListChecked}
            isWhiteList={false}
          >
            <Typography color="error">{tags.length}</Typography>
          </S.RadioLabel>
        </S.RadioWrap>
      </S.RadioGroup>
      <Grid container justify="space-between">
        <Grid container item xs={8}>
          <Grid item xs={8}>
            <TextField
              placeholder={`Type ${placeholder}`}
              multiline
              rowsMax="4"
              fullWidth
              onKeyPress={onKeyPressHandler}
              value={inputText}
              onChange={onInputChange}
            />
          </Grid>
          <Grid item xs={2}>
            <Button color="primary" onClick={onClearTagsHandler}>
              CLEAR ALL
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button color="primary" onClick={onCopyHandler}>
              COPY ALL
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={1}>
          <Button color="primary" onClick={onEditClick}>
            <S.EditButtonInner>
              <EditIcon color="primary" />
              EDIT
            </S.EditButtonInner>
          </Button>
        </Grid>
      </Grid>
      <S.TagsWrap>
        {tagsSelected.map(tag => {
          const { id, status, tooltip } = tag;
          const isDisabled = status === ETagStatus.DISABLED;
          return (
            <Tooltip
              key={id}
              classes={{ tooltip: classes.tooltip }}
              title={isDisabled ? disabledTagToolTip : tooltip}
              placement="bottom"
              arrow
            >
              <S.Tag
                isWhiteList={isWhiteListChecked}
                isDisabled={isDisabled}
              >
                <Typography>{id}</Typography>
                <S.TagClose onClick={() => onCloseTagHandler(tag)}>
                  <CancelIcon
                    color={
                      isWhiteListChecked || isDisabled
                        ? 'primary'
                        : 'error'
                    }
                  />
                </S.TagClose>
              </S.Tag>
            </Tooltip>
          );
        })}
      </S.TagsWrap>
    </>
  );
}

export default IDSelector;
