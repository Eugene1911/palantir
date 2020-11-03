import React from 'react';

import Drawer from '@material-ui/core/Drawer';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Container from '@material-ui/core/Container';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import CustomChip from '../CustomChip';
import useStyles from './useStyles';

export interface IFilterListItem {
  id: number;
  name: string;
  parentId?: number;
  selected: boolean;
  tempSelected: boolean;
}

export interface IFilterCategoryItem {
  id: number;
  name: string;
  list: IFilterListItem[];
  selectedCount: number;
}

interface ICustomDrawerProps {
  isOpen: boolean;
  selectedCount?: number;
  onCancel: () => void;
  onSave: () => void;
  title: string;
  list: IFilterListItem[];
  categoriesList?: IFilterCategoryItem[];
  onSelect: (id: number, value: boolean, parentId?: number) => void;
  selectAllCategory?: (id: number, value: boolean) => void;
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
}: ICustomDrawerProps): JSX.Element => {
  const classes = useStyles();

  const renderListItem = (item: IFilterListItem): JSX.Element => (
    <Grid
      className={classes.item}
      alignItems="center"
      key={item.id}
      container
    >
      <Grid item>
        <Checkbox
          onChange={(evt): void =>
            onSelect(item.id, evt.target.checked, item.parentId)
          }
          checked={item.selected || item.tempSelected}
          color="primary"
        />
      </Grid>
      <Grid item>
        <Typography className={classes.itemName}>
          {item.name}
        </Typography>
      </Grid>
    </Grid>
  );

  const renderCategory = (
    category: IFilterCategoryItem,
  ): JSX.Element => {
    return (
      <Accordion
        classes={{ expanded: classes.accordionExpanded }}
        className={classes.accordion}
        key={category.id}
      >
        <AccordionSummary
          className={classes.accordionSummary}
          expandIcon={<ExpandMoreIcon />}
          classes={{
            expanded: classes.accordionSummaryExpanded,
            content: classes.accordionSummaryContent,
          }}
        >
          <Checkbox
            onChange={(evt): void =>
              selectAllCategory(category.id, evt.target.checked)
            }
            onClick={(event): void => event.stopPropagation()}
            onFocus={(event): void => event.stopPropagation()}
            checked={category.selectedCount === category.list.length}
            color="primary"
          />
          <Typography className={classes.itemName}>
            {category.name}
          </Typography>
          {!!category.selectedCount && (
            <CustomChip
              label={category.selectedCount}
              isActive
              isSmall
              className={classes.count}
            />
          )}
        </AccordionSummary>
        <AccordionDetails className={classes.accordionDetails}>
          {category.list.map(renderListItem)}
        </AccordionDetails>
      </Accordion>
    );
  };

  return (
    <Drawer anchor="right" open={isOpen} onClose={onCancel}>
      <Grid
        container
        justify="space-between"
        className={classes.header}
      >
        <Grid item>
          <Typography className={classes.title}>{title}</Typography>
        </Grid>
        <Grid item>
          <IconButton size="small" onClick={onCancel}>
            <CloseIcon className={classes.close} />
          </IconButton>
        </Grid>
      </Grid>
      <Divider />
      <Container className={classes.content}>
        {categoriesList
          ? categoriesList.map(renderCategory)
          : list.map(renderListItem)}
      </Container>
      <Grid
        className={classes.footer}
        container
        justify="space-between"
        alignItems="center"
      >
        <Typography color="primary">
          {selectedCount} Selected
        </Typography>
        <Grid item container className={classes.buttons}>
          <Button onClick={onCancel} className={classes.cancel}>
            Cancel
          </Button>
          <Button
            onClick={onSave}
            variant="contained"
            color="primary"
          >
            Done
          </Button>
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default CustomDrawer;
