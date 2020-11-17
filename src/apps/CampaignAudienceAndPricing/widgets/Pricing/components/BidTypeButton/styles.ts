import styled from 'styled-components';
import { useTheme } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import SvgIcon, { SvgIconProps } from '@material-ui/core/SvgIcon';

interface IWrapperProps {
  isFilledBackground: boolean;
}

export const Wrapper = styled.div<IWrapperProps>`
  display: flex;
  max-width: 210px;
  height: 304px;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 12px;
  box-sizing: border-box;
  border: ${({ isFilledBackground }) =>
    isFilledBackground ? 'none' : 'solid 1px rgba(42, 42, 52, 0.24)'};
  padding: 20px 16px 20px 12px;
  background: ${({ isFilledBackground }) => {
    const { palette } = useTheme();

    return isFilledBackground ? palette.primary.main : 'transparent';
  }};
`;

export const Text = styled.span<IWrapperProps>`
  color: ${({ isFilledBackground }) => {
    const { palette } = useTheme();

    return isFilledBackground
      ? palette.primary.contrastText
      : 'inherit';
  }};
`;

export const BidWrap = styled.div`
  display: flex;
  align-items: center;
`;

export const ListPoint = styled.div`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: #90eb04;
  flex-shrink: 0;
  margin-right: 8px;
  transform: translateY(-50%);
`;

export const StyledListItem = styled(ListItem)`
  padding: 0;
  align-items: baseline;
`;

export const StyledList = styled(List)`
  padding: 0;
`;

export const StyledSvgIcon = styled(SvgIcon)<SvgIconProps>`
  width: auto;
  height: auto;
`;
