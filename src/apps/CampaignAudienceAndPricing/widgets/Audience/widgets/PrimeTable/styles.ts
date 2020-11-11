import styled from 'styled-components';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { useTheme } from '@material-ui/core/styles';

export const StyledArrowDownwardIcon = styled(ArrowDownwardIcon)`
  vertical-align: bottom;
  margin-right: 5px;
`;

export const HeaderWrap = styled.div`
  padding: 15px 24px;
`;

export const EditButtonInner = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 55px;
`;

export const BidWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const AdZoneWrap = styled.div`
  display: flex;
`;

export const Tag = styled.div`
  display: flex;
  align-items: center;
  padding: 1px 6px;
  height: 18px;
  border-radius: 10px;
  margin-left: 4px;
  background-color: ${() => {
    const { palette } = useTheme();
    return palette.background.blue;
  }};
`;
