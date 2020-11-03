import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { v4 as uuidv4 } from 'uuid';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Collapse from '@material-ui/core/Collapse';
import useStyles from '../../useStyles';
import SelectRule from '../SelectRule';
import { TOptimizerModel } from '../../../OptimizerCreate/store/OptimizerModel';

type TListItemRulesProps = {
  optimizer: TOptimizerModel;
};

function ListItemRules({
  optimizer,
}: TListItemRulesProps): JSX.Element {
  const { t } = useTranslation('optimizers');
  const [open, setOpen] = useState(false);
  const classes = useStyles({});

  return (
    <>
      <ListItem button onClick={(): void => setOpen(!open)}>
        <ListItemText primary={optimizer.title} />
        <ListItemSecondaryAction>
          <Typography variant="overline">
            {optimizer.rule_count} {t('optimizers:select:rule')}
          </Typography>
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" dense disablePadding>
          {optimizer.rule_groups &&
            optimizer.rule_groups.map(group => (
              <ListItem key={uuidv4()} button divider>
                <ListItemText
                  className={classes.nestedText}
                  inset
                  secondaryTypographyProps={{
                    component: 'div',
                    className: classes.nestedRules,
                  }}
                  primary={group.description}
                  secondary={
                    <div>
                      {group.rules.map(rule => (
                        <SelectRule key={uuidv4()} rule={rule} />
                      ))}
                    </div>
                  }
                />
              </ListItem>
            ))}
        </List>
      </Collapse>
    </>
  );
}

export default ListItemRules;
