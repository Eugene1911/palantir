import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';

export const Wrapper = styled.div`
  z-index: 5;
`;

export const StyledPaper = styled(Paper)`
  padding: 0px 16px 20px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 158px;
`;

export const StyledIconButton = styled(IconButton)`
  margin-right: -16px;
`;
