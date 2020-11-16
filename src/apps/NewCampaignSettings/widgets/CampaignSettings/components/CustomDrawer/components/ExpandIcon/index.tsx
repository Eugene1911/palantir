import React from 'react';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// eslint-disable-next-line import/no-cycle
import { IFilterCategoryItem } from '../ListCategory';
import useStyles from './useStyles';

interface IExpandIconProps {
  isSomeFilledListItem: boolean;
  isAsyncLoadingList: boolean;
  isShowAsyncLoadButton: boolean;
  category: IFilterCategoryItem;
  openAsyncFilter: (category: IFilterCategoryItem) => void;
}

const ExpandIcon = ({
  isSomeFilledListItem,
  isAsyncLoadingList,
  isShowAsyncLoadButton,
  openAsyncFilter,
  category,
}: IExpandIconProps): JSX.Element => {
  const classes = useStyles();

  if (isAsyncLoadingList) {
    if (!isShowAsyncLoadButton) {
      return null;
    }
    return (
      <ChevronRightIcon
        onClick={(): void => openAsyncFilter(category)}
      />
    );
  }

  return (
    <ExpandMoreIcon
      className={
        isSomeFilledListItem ? classes.filledIcon : classes.icon
      }
    />
  );
};

export default ExpandIcon;
