import styled from 'styled-components';
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
    // const { palette } = useTheme();

    switch (status) {
      case EBidStatus.OPTIMAL:
        return '#84d900';
      case EBidStatus.COVERED:
        return '#030969';
      case EBidStatus.LOW:
        return '#eab20f';
      case EBidStatus.ERROR:
        return '#ff103e';
      default:
        return 'inherit';
    }
  }};
  background-color: ${({ status }) => {
    // const { palette } = useTheme();

    switch (status) {
      case EBidStatus.OPTIMAL:
        return '#f4fde6';
      case EBidStatus.COVERED:
        return '#e8e9f7';
      case EBidStatus.LOW:
        return '#fef8ef';
      case EBidStatus.ERROR:
        return '#ffe8ec';
      default:
        return 'inherit';
    }
  }};
`;

export const IconWrap = styled.div`
  margin-right: 8px;
  margin-bottom: -5px;
`;
