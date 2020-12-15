import React, { useState } from 'react';

import Drawer from '@material-ui/core/Drawer';
import Container from '@material-ui/core/Container';
import useStyles from './useStyles';
import TopFilter from './components/TopFilter';
import BottomFilter from './components/BottomFilter';
import ListItem, { IFilterListItem } from './components/ListItem';
import ListCategory, {
  IFilterCategoryItem,
} from './components/ListCategory';
import FilterSearch from './components/FilterSearch';
import FilterFooter from './components/FilterFooter';
import FilterHeader from './components/FilterHeader';

interface ICustomDrawerProps {
  isOpen: boolean;
  selectedCount: number;
  onCancel: () => void;
  onSave: () => void;
  title: string;
  list: IFilterListItem[];
  categoriesList?: IFilterCategoryItem[];
  onSelect: (id: number, value: boolean, parentId?: number) => void;
  selectAllCategory?: (id: number, value: boolean) => void;
  isAsyncLoadingList?: boolean;
  topFilterTitle?: string;
  filtersOptions?: Array<{ name: string; count: number } | null>;
  openAsyncFilter?: (category: IFilterCategoryItem) => void;
  withBackButton?: boolean;
  withCloseButton?: boolean;
  topFilterPermission?: boolean;
  selectAllTags?: (value: boolean) => void;
  filterCategoriesFunction?: (
    category: IFilterCategoryItem,
  ) => boolean;
  invisibleBackdrop?: boolean;
  hideFooter?: boolean;
}

const CustomDrawer = ({
  isOpen,
  title,
  list,
  onSelect,
  selectedCount,
  onCancel,
  onSave,
  categoriesList,
  selectAllCategory,
  isAsyncLoadingList,
  topFilterTitle,
  filtersOptions,
  openAsyncFilter,
  withCloseButton,
  withBackButton,
  topFilterPermission,
  selectAllTags,
  filterCategoriesFunction,
  invisibleBackdrop = false,
  hideFooter = false,
}: ICustomDrawerProps): JSX.Element => {
  const classes = useStyles();
  const [inputText, setInputText] = useState<string>('');
  const [isShowAsyncLoadButton, setIsShowAsyncLoadButton] = useState<
    boolean
  >(false);
  const [
    isSelectedFilterActive,
    setIsSelectedFilterActive,
  ] = useState<boolean>(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(
    null,
  );

  const clearSelectedFilter = (): void => {
    if (isSelectedFilterActive) {
      setIsSelectedFilterActive(false);
    }
  };

  const clearActiveFilter = (): void => {
    if (activeFilter) {
      setActiveFilter(null);
    }
  };

  const clearAllFilters = (): void => {
    clearSelectedFilter();
    clearActiveFilter();
  };

  const handleSetActiveFilter = (filter: string): void => {
    clearSelectedFilter();
    if (activeFilter === filter) {
      setActiveFilter(null);
    } else {
      setActiveFilter(filter);
    }
  };

  const toggleSelectedFilter = (): void => {
    clearActiveFilter();
    setIsSelectedFilterActive(prevActive => !prevActive);
  };

  const filteredCategoriesList =
    categoriesList && filterCategoriesFunction
      ? categoriesList.filter(category =>
          filterCategoriesFunction(category),
        )
      : categoriesList;

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onCancel}
      ModalProps={{ BackdropProps: { invisible: invisibleBackdrop } }}
    >
      <FilterHeader
        onCancel={onCancel}
        title={title}
        withCloseButton={
          withCloseButton !== undefined ? withCloseButton : true
        }
        withBackButton={withBackButton || false}
      />
      {isAsyncLoadingList && (
        <>
          {topFilterPermission && (
            <TopFilter
              isShowAsyncLoadButton={isShowAsyncLoadButton}
              topFilterTitle={topFilterTitle}
              setIsShowAsyncLoadButton={setIsShowAsyncLoadButton}
            />
          )}
          <BottomFilter
            isSelectedFilterActive={isSelectedFilterActive}
            activeFilter={activeFilter}
            filtersOptions={filtersOptions}
            selectedCount={selectedCount}
            toggleSelectedFilter={toggleSelectedFilter}
            clearAllFilters={clearAllFilters}
            handleSetActiveFilter={handleSetActiveFilter}
          />
        </>
      )}
      <FilterSearch
        inputText={inputText}
        setInputText={setInputText}
        selectAllTags={selectAllTags}
        selectedCount={selectedCount}
        filterCategoriesFunction={filterCategoriesFunction}
      />
      <Container className={classes.content}>
        {categoriesList
          ? filteredCategoriesList.map(category => (
              <ListCategory
                category={category}
                inputText={inputText}
                isSelectedFilterActive={isSelectedFilterActive}
                isAsyncLoadingList={isAsyncLoadingList}
                isShowAsyncLoadButton={isShowAsyncLoadButton}
                activeFilter={activeFilter}
                onSelect={onSelect}
                selectAllCategory={selectAllCategory}
                openAsyncFilter={openAsyncFilter}
                key={category.id}
              />
            ))
          : list.map(item => (
              <ListItem
                item={item}
                noFilter={false}
                inputText={inputText}
                onSelect={onSelect}
                key={item.id}
              />
            ))}
      </Container>
      {!hideFooter && (
        <FilterFooter
          onCancel={onCancel}
          onSave={onSave}
          selectedCount={selectedCount}
        />
      )}
    </Drawer>
  );
};

export default CustomDrawer;
