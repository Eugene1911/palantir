import React, { useState } from 'react';
import { observer } from 'mobx-react';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Grid from '@material-ui/core/Grid';
import { v4 as uuidv4 } from 'uuid';
// import useStore, { TOptimizersStors } from 'apps/Optimizers/store';
import OptimizerRuleWrapper from '../OptimizerRule';
import useStyles from './useStyles';
import { TOptimizerGroupModel } from './store/OptimizerGroupModel';

type TOptimizerGroupProps = {
  index: number;
  group: TOptimizerGroupModel;
  isLastGroup: boolean;
  onDeleteGroup: (index: number) => void;
};

function OptimizerGroup({
  index,
  group,
  isLastGroup,
  onDeleteGroup,
}: TOptimizerGroupProps): JSX.Element {
  const { t } = useTranslation();
  // const {
  //   optimizerCreateStore: { chooseRules },
  // }: TOptimizersStors = useStore();
  const classes = useStyles({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpenMenu, setOpenMenu] = useState(false);
  const onOpenMenu = (): void => {
    setOpenMenu(!isOpenMenu);
  };
  const [isOpen, setIsIOpen] = useState(!group.id);
  const onChmageHandler = (event: any): void => {
    setIsIOpen(!isOpen);
  };

  return (
    <Grid spacing={3} alignItems="flex-start" container>
      <Grid item xs={3}>
        <Typography className={classes.groupLabel}>
          {t('optimizers:create:group')} {index + 1}
        </Typography>
      </Grid>
      <Grid item xs={7}>
        <Accordion
          className={classes.accordion}
          onChange={onChmageHandler}
          expanded={isOpen}
        >
          <Collapse in={!isOpen}>
            <AccordionSummary className={classes.accordionSummary}>
              <Grid
                justify="space-between"
                alignItems="baseline"
                container
              >
                <Grid xs={9} item>
                  <Typography>{group.description}</Typography>
                </Grid>
                <Grid xs item>
                  <Typography variant="overline">
                    {group.rules.length} {t('optimizers:select:rule')}
                  </Typography>
                </Grid>
              </Grid>
            </AccordionSummary>
          </Collapse>
          <div>
            <TextField
              fullWidth
              focused
              label={t('optimizers:create:group_name')}
              onChange={group.onChangeTitleHandler}
              value={group.description}
            />
          </div>
          <br />
          <br />
          <FormControl component="fieldset">
            <FormLabel
              filled
              className="global-form-label-small"
              component="label"
            >
              {t('optimizers:create:sourse_blocking')}
            </FormLabel>
            <FormGroup row>
              <FormControlLabel
                labelPlacement="end"
                control={
                  <Checkbox
                    checked={group.sources.includes('app')}
                    onChange={group.onChangeSource}
                    name="app"
                    value="app"
                  />
                }
                label={t('optimizers:create:sites')}
              />
              <FormControlLabel
                labelPlacement="end"
                control={
                  <Checkbox
                    checked={group.sources.includes('zone')}
                    onChange={group.onChangeSource}
                    name="zone"
                    value="zone"
                  />
                }
                label={t('optimizers:create:spots')}
              />
            </FormGroup>
          </FormControl>
          <br />
          <br />
          <Grid item xs={12}>
            <div className={classes.ruleLabel}>
              <FormLabel
                className="global-form-label-small"
                component="legend"
              >
                {t('optimizers:create:rules')}
              </FormLabel>
            </div>
            <OptimizerRuleWrapper
              rules={group.rules}
              key={uuidv4()}
            />
            <br />
            <br />
            <Button
              // onClick={onOpenMenu}
              onClick={group.onAddRuleHandler}
              aria-controls="add_rule"
              startIcon={<AddIcon />}
              ref={(node): void => setAnchorEl(node)}
              color="primary"
            >
              {t('optimizers:create:add_rule')}
            </Button>
            <Menu
              anchorEl={anchorEl}
              onClose={onOpenMenu}
              onClick={onOpenMenu}
              keepMounted
              open={isOpenMenu}
              id="add_rule"
            >
              <MenuItem onClick={group.onAddRuleHandler}>
                {t('optimizers:create:new')}
              </MenuItem>
              {/* <MenuItem
                onClick={(): void =>
                  chooseRules.onOpenChooseList(group.id)
                }
              >
                {t('optimizers:create:choose_from_existing')}
              </MenuItem> */}
            </Menu>
          </Grid>
        </Accordion>
      </Grid>
      <Grid className={classes.deleteGroupWrap} item xs={1}>
        {!isLastGroup && (
          <Button
            color="primary"
            onClick={(): void => onDeleteGroup(index)}
          >
            {t('optimizers:create:delete_group')}
          </Button>
        )}
      </Grid>
      <Grid item xs={1}>
        <div className={classes.moreIcon}>
          <IconButton onClick={onChmageHandler}>
            <ExpandMoreIcon />
          </IconButton>
        </div>
      </Grid>
    </Grid>
  );
}

export default observer(OptimizerGroup);
