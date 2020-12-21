import styled from 'styled-components/macro';

export const StepperWrapper = styled.div`
  border-radius: 8px;
  border: solid 1px #f9f9f9;
  background-color: #ffffff;
  padding: 20px 28px;
  margin-bottom: 16px;
`;

interface IIconWrapperProps {
  backgroundColor?: string;
}

export const IconWrapper = styled.div<IIconWrapperProps>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${(p: IIconWrapperProps): string =>
    p.backgroundColor && `background: ${p.backgroundColor};`};
`;
