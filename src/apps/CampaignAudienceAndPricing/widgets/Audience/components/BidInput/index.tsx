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
  const [invalidBid, setInvalidBid] = React.useState<boolean>(false);

  const onChangeHandler = ({
    target,
  }: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement
  >): void => {
    invalidBid && setInvalidBid(false);
    setInputText(target.value);
  };

  const onKeyPressHandler = (
    event: React.KeyboardEvent<HTMLDivElement>,
  ): void => {
    if (!event || event.key === KEY_ENTER_CODE) {
      if (Number(inputText)) {
        setBid(inputText);
      } else {
        setInputText('');
        setInvalidBid(true);
      }
    }
  };

  return (
    <S.StyledTextField
      value={inputText}
      error={invalidBid}
      onKeyPress={onKeyPressHandler}
      onChange={onChangeHandler}
    />
  );
}

export default BidInput;
