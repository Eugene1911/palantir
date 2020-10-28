import React, { useState } from 'react';
import isArray from 'lodash/isArray';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import CancelIcon from '@material-ui/icons/Cancel';
import union from 'lodash/union';
import { KEY_ENTER_CODE } from 'config/constants';
import textToArrayWithCheck from 'helpers/textToArrayWithCheck';
import { Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import { ETagStatus } from '../../assets/constants/commonAudienceTypes';
import {
  disabledTagToolTip,
  radioTitles,
} from '../../assets/constants/rightSidesConst';
import * as S from './styles';
import useStyles from './useStyles';

export interface IDSelectorProps {
  radioSelected: number;
  onRadioChange: (index: number) => void;
  onInputEnter: (value: string[]) => void;
  inputValue: string[];
  tags: any[];
  closeTag: (tag: any) => void;
  placeholder: string;
}

function IDSelector(props?: IDSelectorProps): JSX.Element {
  const {
    placeholder,
    radioSelected,
    onRadioChange,
    onInputEnter,
    inputValue,
    tags,
  } = props;
  const [inputText, setInputText] = useState(inputValue.join(', '));

  const onInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void =>
    setInputText(target.value);

  const onKeyPressHandler = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    const { key } = event;

    if (key === KEY_ENTER_CODE) {
      const words = textToArrayWithCheck(inputText, inputValue);

      event.preventDefault();

      if (isArray(words)) {
        onInputEnter(union(inputValue, words));
      }

      setInputText('');
    }
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
      <TextField
        placeholder={`Type ${placeholder}`}
        multiline
        rowsMax="4"
        fullWidth
        onKeyPress={onKeyPressHandler}
        value={inputText}
        onChange={onInputChange}
      />
      <S.TagsWrap>
        {tags.map(({ id, status, tooltip }) => {
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
                <S.TagClose>
                  <CancelIcon
                    color={isWhiteListChecked ? 'primary' : 'error'}
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
