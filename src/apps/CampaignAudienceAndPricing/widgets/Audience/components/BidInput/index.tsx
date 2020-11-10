import React from 'react';
import { KEY_ENTER_CODE } from 'config/constants';
import * as S from './styles';

interface IBidInputProps {
  setBid: (value: string) => void;
  initValue: string;
}

function BidInput(props: IBidInputProps): JSX.Element {
  const { setBid, initValue } = props;
  const [inputText, setInputText] = React.useState<string>(initValue);

  const onChangeHandler = ({
    target,
  }: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement
  >): void => setInputText(target.value);

  const onKeyPressHandler = (
    event: React.KeyboardEvent<HTMLDivElement>,
  ): void => {
    if (!event || event.key === KEY_ENTER_CODE) {
      setBid(inputText);
    }
  };

  return (
    <S.StyledTextField
      value={inputText}
      onKeyPress={onKeyPressHandler}
      onChange={onChangeHandler}
    />
  );
}

export default BidInput;
