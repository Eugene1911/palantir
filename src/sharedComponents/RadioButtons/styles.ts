import styled from 'styled-components/macro';
import { useTheme } from '@material-ui/core/styles';

interface IButtonProps {
  checked: boolean;
}

export const ButtonsWrap = styled.div`
  display: flex;
`;

export const Button = styled.div<IButtonProps>`
  display: flex;
  cursor: pointer;
  max-width: 200px;
  margin-right: 24px;
  box-sizing: border-box;
  padding: 12px;
  border-radius: 12px;
  border: solid 1px
    ${({ checked }) => {
      const { palette } = useTheme();
      return checked ? palette.primary.main : palette.statuses.grey;
    }};
  background-color: ${({ checked }) => {
    const { palette } = useTheme();
    return checked ? palette.background.blue : 'transparent';
  }};
`;

export const TitleWrap = styled.div`
  display: flex;
`;

export const Title = styled.div``;

export const Label = styled.div``;

export const Text = styled.div``;

export const RadioWrap = styled.div``;

export const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
