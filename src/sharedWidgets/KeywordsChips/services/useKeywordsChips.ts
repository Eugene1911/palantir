import { useState } from 'react';
import isArray from 'lodash/isArray';
import textToArrayWithCheck from 'helpers/textToArrayWithCheck';
import union from 'lodash/union';
import { KEY_ENTER_CODE } from 'config/constants';

type TuseKeywordsChips = {
  inputText: string;
  onChangeHandler: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  onKeyPressHandler: (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => void;
  onDeleteKeywordHandler: (keyword: string) => void;
};

export type TuseKeywordsChipsProps = {
  value: string[];
  onChange: (value: string[]) => void;
};

function useKeywordsChips({
  value,
  onChange,
}: TuseKeywordsChipsProps): TuseKeywordsChips {
  const [inputText, setInputText] = useState('');
  const onChangeHandler = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void =>
    setInputText(target.value);
  const onKeyPressHandler = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    const { key } = event;

    if (key === KEY_ENTER_CODE) {
      const keywords = textToArrayWithCheck(inputText, value);

      event.preventDefault();

      if (isArray(keywords)) {
        onChange(union(value, keywords));
      }

      setInputText('');
    }
  };
  const onDeleteKeywordHandler = (deleteKeyword: string): void =>
    onChange(value.filter(keyword => keyword !== deleteKeyword));

  return {
    inputText,
    onChangeHandler,
    onKeyPressHandler,
    onDeleteKeywordHandler,
  };
}

export default useKeywordsChips;
