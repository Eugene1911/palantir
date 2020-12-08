import React from 'react';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import CloseIcon from '@material-ui/icons/Close';
import QuestionTooltip from 'sharedComponents/QuestionTooltip';
import { KEY_ENTER_CODE } from 'config/constants';
import { massUpdate } from '../../assets/constants/tableConst';
import * as S from './styles';

interface IMassUpdateButtonProps {
  onApply: (bid: string) => void;
}

function MassUpdateButton(
  props: IMassUpdateButtonProps,
): JSX.Element {
  const { onApply } = props;
  const [
    anchorEl,
    setAnchorEl,
  ] = React.useState<HTMLButtonElement | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const [bid, setBid] = React.useState<string>('');
  const [invalidBid, setInvalidBid] = React.useState<boolean>(false);

  const onMassUpdateHandler = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event.currentTarget);
    setIsOpen(prev => !prev);
  };

  const onCloseHandler = () => {
    setBid('');
    setIsOpen(false);
  };

  const onApplyHandler = () => {
    onApply(bid);
    onCloseHandler();
  };

  const handleBidChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    invalidBid && setInvalidBid(false);
    setBid(event.target.value);
  };

  const onKeyPressHandler = (
    event: React.KeyboardEvent<HTMLDivElement>,
  ): void => {
    if (!event || event.key === KEY_ENTER_CODE) {
      event?.preventDefault();

      if (Number(bid)) {
        onApplyHandler();
      } else {
        setBid('');
        setInvalidBid(true);
      }
    }
  };

  return (
    <S.Wrapper>
      <Button color="primary" onClick={onMassUpdateHandler}>
        {massUpdate.mainButton}
      </Button>
      <Popper
        open={isOpen}
        anchorEl={anchorEl}
        placement="top-start"
        transition
        disablePortal
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <S.StyledPaper>
              <Grid
                container
                justify="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Typography>{massUpdate.title}</Typography>
                </Grid>
                <Grid item>
                  <S.StyledIconButton onClick={onCloseHandler}>
                    <CloseIcon fontSize="small" />
                  </S.StyledIconButton>
                </Grid>
              </Grid>
              <Grid container item alignItems="center">
                <Grid item xs={6}>
                  <FormControl>
                    <InputLabel htmlFor="bid">
                      {massUpdate.bid}
                    </InputLabel>
                    <Input
                      id="bid"
                      error={invalidBid}
                      value={bid}
                      onChange={handleBidChange}
                      onKeyPress={onKeyPressHandler}
                      startAdornment={
                        <InputAdornment position="start">
                          $
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={1}>
                  <QuestionTooltip title={massUpdate.tooltip} />
                </Grid>
              </Grid>
              <Button
                color="primary"
                variant="outlined"
                onClick={onApplyHandler}
              >
                {massUpdate.applyButton}
              </Button>
            </S.StyledPaper>
          </Fade>
        )}
      </Popper>
    </S.Wrapper>
  );
}

export default MassUpdateButton;
