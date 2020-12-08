import React, { FunctionComponent, SVGProps } from 'react';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import { bidPriceButtons } from '../../assets/constants/rightSidesConst';
import * as S from './styles';

interface IBidTypeButtonProps {
  isFilledBackground?: boolean;
  isFetching: boolean;
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  bid?: string;
  title: string;
  text: string;
  list: string[];
  onApply: () => void;
}

function BidTypeButton(props: IBidTypeButtonProps): JSX.Element {
  const {
    isFilledBackground,
    title,
    isFetching,
    bid,
    text,
    list,
    onApply,
    icon,
  } = props;

  return (
    <S.Wrapper isFilledBackground={isFilledBackground}>
      <Typography>
        <S.Text isFilledBackground={isFilledBackground}>
          {title}
        </S.Text>
      </Typography>
      <S.BidWrap>
        {isFetching ? (
          <CircularProgress
            size={20}
            color={isFilledBackground ? 'secondary' : 'primary'}
          />
        ) : (
          <>
            {icon ? (
              // @ts-ignore
              <S.StyledSvgIcon component={icon} viewBox="0 0 40 40" />
            ) : null}
            <Typography variant="h5">
              <S.Text isFilledBackground={isFilledBackground}>
                {`$ ${bid}`}
              </S.Text>
            </Typography>
          </>
        )}
      </S.BidWrap>
      <Typography variant="caption">
        <S.Text isFilledBackground={isFilledBackground}>
          {text}
        </S.Text>
      </Typography>
      <S.StyledList>
        {list.map(listText => {
          return (
            // @ts-ignore
            <S.StyledListItem key={listText}>
              <S.ListPoint />
              <ListItemText>
                <Typography variant="caption">
                  <S.Text isFilledBackground={isFilledBackground}>
                    {listText}
                  </S.Text>
                </Typography>
              </ListItemText>
            </S.StyledListItem>
          );
        })}
      </S.StyledList>
      <Button
        color={isFilledBackground ? 'inherit' : 'primary'}
        disabled={isFetching}
        variant={isFilledBackground ? 'contained' : 'outlined'}
        onClick={onApply}
      >
        {bidPriceButtons.apply}
      </Button>
    </S.Wrapper>
  );
}

export default BidTypeButton;
