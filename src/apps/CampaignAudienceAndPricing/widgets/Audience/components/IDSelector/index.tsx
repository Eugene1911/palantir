import React from 'react';
import isArray from 'lodash/isArray';
import union from 'lodash/union';
import Radio from '@material-ui/core/Radio';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { KEY_ENTER_CODE } from 'config/constants';
import { Typography } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import SearchInput, { useSearchInput } from '../SearchInput';
import AddSpotsButton from '../../widgets/AddSpotsButton';
import { ETagStatus } from '../../assets/constants/commonAudienceTypes';
import { radioTitles } from '../../assets/constants/rightSidesConst';
import { buttonsConst } from '../../assets/constants/buttonsConst';
import textToTagsWithCheck from '../../services/textToTagsWithCheck';
import * as S from './styles';
import useStyles from './useStyles';

export interface IIDSelectorProps {
  radioSelected: number;
  onRadioChange: (index: number) => void;
  onInputEnter: (value: string[]) => void;
  onFilterSideOpen: () => void;
  tags: any[];
  tagsSelected: any[];
  closeTag: (id: string) => void;
  clearTags: () => void;
  placeholder: string;
  disabledTagToolTip: string;
  isNewTagAllowed: boolean;
  addSpotsButton: boolean;
}

function IDSelector(props?: IIDSelectorProps): JSX.Element {
  const {
    placeholder,
    radioSelected,
    onRadioChange,
    onInputEnter,
    onFilterSideOpen,
    tags,
    tagsSelected,
    closeTag,
    clearTags,
    disabledTagToolTip,
    isNewTagAllowed,
    addSpotsButton,
  } = props;
  const { inputText, setInputText, onInputChange } = useSearchInput();

  const onKeyPressHandler = (
    event?: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (!event || event.key === KEY_ENTER_CODE) {
      event?.preventDefault();

      const tagsID = textToTagsWithCheck(
        inputText,
        isNewTagAllowed ? tagsSelected : tags,
        isNewTagAllowed,
      );

      if (isArray(tagsID)) {
        onInputEnter(
          isNewTagAllowed ? tagsID : union(tagsID, tagsSelected),
        );
      }

      setInputText('');
    }
  };

  const onCloseTagHandler = tag => {
    closeTag(tag.id);
  };

  const onClearTagsHandler = React.useCallback(() => {
    setInputText('');
    clearTags();
  }, [clearTags, setInputText]);

  const onCopyHandler = React.useCallback(() => {
    const text = tagsSelected.map(({ id }) => id).join(', ');
    navigator.clipboard.writeText(text);
  }, [tagsSelected]);

  const renderClearAndCopyButtons = React.useCallback(() => {
    return (
      <>
        <Grid item xs={2}>
          <Button color="primary" onClick={onClearTagsHandler}>
            {buttonsConst.clear}
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button color="primary" onClick={onCopyHandler}>
            {buttonsConst.copy}
          </Button>
        </Grid>
      </>
    );
  }, [onClearTagsHandler, onCopyHandler]);

  const isWhiteListChecked = radioSelected === 0;
  const classes = useStyles();

  return (
    <>
      <S.RadioGroup>
        <S.RadioWrap>
          <Radio
            checked={isWhiteListChecked}
            color="primary"
            onChange={() => onRadioChange(0)}
          />
          <S.RadioTitle>
            <Typography
              color={isWhiteListChecked ? 'primary' : 'textSecondary'}
            >
              {radioTitles.whitelist}
            </Typography>
          </S.RadioTitle>
          <S.RadioLabel checked={isWhiteListChecked} isWhiteList>
            <Typography color="primary">{tags.length}</Typography>
          </S.RadioLabel>
        </S.RadioWrap>
        <S.RadioWrap>
          <Radio
            checked={!isWhiteListChecked}
            color="primary"
            onChange={() => onRadioChange(1)}
          />
          <S.RadioTitle>
            <Typography
              color={
                !isWhiteListChecked ? 'primary' : 'textSecondary'
              }
            >
              {radioTitles.blacklist}
            </Typography>
          </S.RadioTitle>
          <S.RadioLabel
            checked={!isWhiteListChecked}
            isWhiteList={false}
          >
            <Typography color="error">{tags.length}</Typography>
          </S.RadioLabel>
        </S.RadioWrap>
      </S.RadioGroup>
      <Grid container justify="space-between">
        <Grid container item xs={8}>
          <Grid item xs={8}>
            <SearchInput
              placeholder={`Type ${placeholder}`}
              onKeyPressHandler={onKeyPressHandler}
              inputText={inputText}
              onInputChange={onInputChange}
            />
          </Grid>
          {Boolean(tagsSelected.length) &&
            renderClearAndCopyButtons()}
        </Grid>
        <Grid item xs={2} container justify="flex-end">
          {tagsSelected.length ? (
            <Button color="primary" onClick={onFilterSideOpen}>
              <S.EditButtonInner>
                <EditIcon color="primary" />
                {buttonsConst.edit}
              </S.EditButtonInner>
            </Button>
          ) : (
            addSpotsButton && <AddSpotsButton />
          )}
        </Grid>
      </Grid>
      <S.TagsWrap>
        {tagsSelected.map(tag => {
          const { id, status, tooltip } = tag;
          const isDisabled = status === ETagStatus.DISABLED;
          return (
            <Tooltip
              key={id}
              classes={{ tooltip: classes.tooltip }}
              title={isDisabled ? disabledTagToolTip : tooltip}
              placement="bottom"
              arrow
            >
              <S.Tag
                isWhiteList={isWhiteListChecked}
                isDisabled={isDisabled}
              >
                <Typography>{id}</Typography>
                <S.TagClose onClick={() => onCloseTagHandler(tag)}>
                  <CancelIcon
                    color={
                      isWhiteListChecked || isDisabled
                        ? 'primary'
                        : 'error'
                    }
                  />
                </S.TagClose>
              </S.Tag>
            </Tooltip>
          );
        })}
      </S.TagsWrap>
      {Boolean(tagsSelected.length) && (
        <Grid container justify="flex-end">
          <Button color="primary" onClick={onFilterSideOpen}>
            {buttonsConst.show}
          </Button>
        </Grid>
      )}
    </>
  );
}

export default IDSelector;
