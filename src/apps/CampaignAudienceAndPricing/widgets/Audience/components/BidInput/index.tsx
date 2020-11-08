import React from 'react';
import TextField from '@material-ui/core/TextField';
import { KEY_ENTER_CODE } from '../../../../../../config/constants';

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
    <TextField
      value={inputText}
      onKeyPress={onKeyPressHandler}
      onChange={onChangeHandler}
    />
  );
}

export default BidInput;
