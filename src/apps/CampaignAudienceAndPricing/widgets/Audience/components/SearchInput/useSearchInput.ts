import React, { useState } from 'react';

export interface IUseSearchInput {
  inputText: string;
  setInputText: (text: string) => void;
  onInputChange: ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useSearchInput = (): IUseSearchInput => {
  const [inputText, setInputText] = useState('');

  const onInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void =>
    setInputText(target.value);

  return {
    inputText,
    setInputText,
    onInputChange,
  };
};
