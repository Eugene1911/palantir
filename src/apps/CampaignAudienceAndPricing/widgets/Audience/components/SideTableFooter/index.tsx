import React from 'react';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import { buttonsConst } from '../../assets/constants/buttonsConst';
import { chosen } from '../../assets/constants/tableConst';
import * as S from './styles';

interface ISideTableProps {
  onClear?: () => void;
  onDone: () => void;
  onCancel: () => void;
  chosenAmount: number;
  massUpdate?: JSX.Element;
}

function SideTableFooter(props: ISideTableProps): JSX.Element {
  const {
    onClear,
    chosenAmount,
    onDone,
    onCancel,
    massUpdate,
  } = props;

  return (
    <S.Footer>
      <S.Wrapper>
        <S.ChosenLabel>
          <Typography color="primary">{`${chosenAmount} ${chosen}`}</Typography>
        </S.ChosenLabel>
        {onClear && (
          <Button color="primary" onClick={onClear}>
            {buttonsConst.clear}
          </Button>
        )}
        {massUpdate}
      </S.Wrapper>
      <S.Wrapper>
        <S.StyledButton color="primary" onClick={onCancel}>
          {buttonsConst.cancel}
        </S.StyledButton>
        <S.StyledButton
          variant="contained"
          color="primary"
          onClick={onDone}
        >
          {buttonsConst.done}
        </S.StyledButton>
      </S.Wrapper>
    </S.Footer>
  );
}

export default SideTableFooter;
