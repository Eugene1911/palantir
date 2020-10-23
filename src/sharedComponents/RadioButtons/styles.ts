import styled from 'styled-components/macro';

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
    ${props => (props.checked ? '#030969' : '#cccccc')};
  background-color: ${props =>
    props.checked ? '#e8e9f7' : '#ffffff'};
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
