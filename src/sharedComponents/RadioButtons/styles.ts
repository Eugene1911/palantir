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
  max-width: 240px;
  margin-right: 24px;
  box-sizing: border-box;
  padding: 12px 20px 15px 0px;
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
  justify-content: space-between;
`;

export const Title = styled.div``;

export const Label = styled.div`
  display: flex;
  align-items: center;
  padding: 1px 10px;
  height: 20px;
  border-radius: 10px;
  background-color: rgba(19, 28, 170, 0.1);
`;

export const Text = styled.div`
  margin-top: 8px;
`;

export const RadioWrap = styled.div`
  margin-top: -7px;
`;

export const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
