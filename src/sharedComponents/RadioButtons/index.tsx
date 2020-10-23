import React from 'react';
import Radio from '@material-ui/core/Radio';
import { Typography } from '@material-ui/core';
import * as S from './styles';

export interface IRadioButton {
  title: string;
  text?: string;
  label?: string;
}

export interface IRadioButtonsProps {
  buttons: IRadioButton[];
  selected: number; // начиная с 0
  onChange: (index: number) => void;
}

function RadioButtons(props: IRadioButtonsProps): JSX.Element {
  const { buttons, onChange, selected } = props;

  const handleChange = (index: number): void => {
    onChange(index);
  };

  return (
    <S.ButtonsWrap>
      {buttons.map(({ title, text, label }, index) => {
        const checked = selected === index;

        return (
          <S.Button
            key={title}
            checked={checked}
            onClick={() => handleChange(index)}
          >
            <S.RadioWrap>
              <Radio checked={checked} />
            </S.RadioWrap>
            <S.ContentWrap>
              <S.TitleWrap>
                <S.Title>
                  <Typography>{title}</Typography>
                </S.Title>
                {label && <S.Label>{label}</S.Label>}
              </S.TitleWrap>
              <S.Text>
                <Typography>{text || ''}</Typography>
              </S.Text>
            </S.ContentWrap>
          </S.Button>
        );
      })}
    </S.ButtonsWrap>
  );
}

export default RadioButtons;
