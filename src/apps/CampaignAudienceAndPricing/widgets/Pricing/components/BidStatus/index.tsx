import React from 'react';
import Typography from '@material-ui/core/Typography';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import WarningIcon from '@material-ui/icons/Warning';
import CancelIcon from '@material-ui/icons/Cancel';
import { bidStatuses } from '../../assets/constants/rightSidesConst';
import { EBidStatus } from '../../assets/constants/commonPricingTypes';
import * as S from './styles';

interface IBidStatusProps {
  status: EBidStatus;
}

function BidStatus(props: IBidStatusProps): JSX.Element {
  const { status } = props;
  const text = bidStatuses[status];

  const renderIcon = () => {
    switch (status) {
      case EBidStatus.OPTIMAL:
        return <BeenhereIcon />;
      case EBidStatus.COVERED:
        return <CheckCircleIcon />;
      case EBidStatus.LOW:
        return <WarningIcon />;
      case EBidStatus.ERROR:
        return <CancelIcon />;
      default:
        return <></>;
    }
  };

  return (
    <S.Wrapper status={status}>
      <S.IconWrap>{renderIcon()}</S.IconWrap>
      <Typography>{text}</Typography>
    </S.Wrapper>
  );
}

export default BidStatus;
