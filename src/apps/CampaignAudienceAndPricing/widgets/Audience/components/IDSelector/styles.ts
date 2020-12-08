import styled from 'styled-components/macro';
import { useTheme } from '@material-ui/core/styles';

interface IRadioLabelProps {
  checked: boolean;
  isWhiteList: boolean;
}

interface ITagProps {
  isWhiteList: boolean;
  isDisabled: boolean;
}

interface IOverflowWrapProps {
  maxHeight: number;
}

export const RadioGroup = styled.div`
  display: flex;
  margin-bottom: 34px;
`;

export const RadioWrap = styled.div`
  display: flex;
  margin-right: 24px;
  align-items: center;
`;

export const RadioTitle = styled.div``;

export const RadioLabel = styled.div<IRadioLabelProps>`
  opacity: ${({ checked }) => +checked};
  min-width: 24px;
  padding: 0 6px;
  border-radius: 10px;
  text-align: center;
  margin-left: 8px;
  margin-top: -2px;
  background-color: ${({ isWhiteList }) => {
    const { palette } = useTheme();
    return isWhiteList
      ? palette.background.blue
      : palette.background.red;
  }};
`;

export const Tag = styled.div<ITagProps>`
  display: flex;
  align-items: center;
  padding: 0 8px 0 12px;
  height: 32px;
  border-radius: 16px;
  color: ${({ isWhiteList, isDisabled }) => {
    const { palette } = useTheme();
    if (isDisabled) {
      return palette.text.primary;
    }
    return isWhiteList ? palette.primary.main : palette.primary.error;
  }};
  background-color: ${({ isWhiteList, isDisabled }) => {
    const { palette } = useTheme();
    if (isDisabled) {
      return palette.statuses.grey;
    }
    return isWhiteList
      ? palette.background.blue
      : palette.background.red;
  }};
`;

export const TagClose = styled.div`
  margin-left: 5px;
  transform: translateY(1px);
  cursor: pointer;
`;

export const TagsWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 8px;
  column-gap: 4px;
  height: auto;
`;

export const OverflowWrap = styled.div<IOverflowWrapProps>`
  margin-top: 24px;
  overflow: hidden;
  max-height: ${({ maxHeight }) => `${maxHeight}px`};
`;

export const EditButtonInner = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 55px;
`;
