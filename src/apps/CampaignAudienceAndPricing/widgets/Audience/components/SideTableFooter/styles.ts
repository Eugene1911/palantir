import styled from 'styled-components';
import Button from '@material-ui/core/Button';

export const Footer = styled.div`
  background-color: #f2f2f2;
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 0;
`;

export const ChosenLabel = styled.div`
  display: flex;
  align-items: center;
  margin-right: 40px;
  margin-left: 10px;
`;

export const Wrapper = styled.div`
  display: flex;
`;

export const StyledButton = styled(Button)`
  margin-right: 8px;
`;
