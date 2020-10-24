import React, { useState } from 'react';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import isArray from 'lodash/isArray';
import union from 'lodash/union';
import { KEY_ENTER_CODE } from 'config/constants';
import textToArrayWithCheck from 'helpers/textToArrayWithCheck';

import { radioTitles } from '../../assets/constants/radioTitles';
import * as S from './styles';

export interface IDSelectorProps {
  radioSelected: number;
  onRadioChange: (index: number) => void;
  onInputEnter: (value: string[]) => void;
  placeholder: string;
  inputValue: string[];
}

function IDSelector(props?: IDSelectorProps): JSX.Element {
  const {
    placeholder,
    radioSelected,
    onRadioChange,
    onInputEnter,
    inputValue,
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
      const words = textToArrayWithCheck(inputText, inputValue);

      event.preventDefault();

      if (isArray(words)) {
        onInputEnter(union(inputValue, words));
      }

      setInputText('');
    }
  };

  return (
    <>
      <S.RadioWrap>
        <Radio
          checked={radioSelected === 0}
          onChange={() => onRadioChange(0)}
        />
        <S.RadioTitle>{radioTitles.whitelist}</S.RadioTitle>
        <S.RadioLabel />
      </S.RadioWrap>
      <S.RadioWrap>
        <Radio
          checked={radioSelected === 1}
          onChange={() => onRadioChange(1)}
        />
        <S.RadioTitle>{radioTitles.blacklist}</S.RadioTitle>
        <S.RadioLabel />
      </S.RadioWrap>
      <TextField
        placeholder={`Type ${placeholder}`}
        multiline
        rowsMax="4"
        fullWidth
        onKeyPress={onKeyPressHandler}
        value={inputText}
        onChange={onInputChange}
      />
    </>
  );
}

export default IDSelector;
