import styled from 'styled-components';
import useTheme from '@material-ui/core/styles/useTheme';
import { EBidStatus } from '../../assets/constants/commonPricingTypes';

interface IWrapperProps {
  status: EBidStatus;
}

export const Wrapper = styled.div<IWrapperProps>`
  display: flex;
  justify-content: center;
  padding: 6px 0;
  border-radius: 4px;
  color: ${({ status }) => {
    const { palette } = useTheme();
    const { bidStatuses } = palette;

    switch (status) {
      case EBidStatus.OPTIMAL:
        return bidStatuses.green.text;
      case EBidStatus.COVERED:
        return bidStatuses.blue.text;
      case EBidStatus.LOW:
        return bidStatuses.orange.text;
      case EBidStatus.ERROR:
        return bidStatuses.red.text;
      default:
        return 'inherit';
    }
  }};
  background-color: ${({ status }) => {
    const { palette } = useTheme();
    const { bidStatuses } = palette;

    switch (status) {
      case EBidStatus.OPTIMAL:
        return bidStatuses.green.background;
      case EBidStatus.COVERED:
        return bidStatuses.blue.background;
      case EBidStatus.LOW:
        return bidStatuses.orange.background;
      case EBidStatus.ERROR:
        return bidStatuses.red.background;
      default:
        return 'inherit';
    }
  }};
`;

export const IconWrap = styled.div`
  margin-right: 8px;
  margin-bottom: -5px;
`;
