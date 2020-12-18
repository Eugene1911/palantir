import React from 'react';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import useStyles from './useStyles';
import { useFetchMoreInModal } from '../../services/useFetchMore';
import CampaignListItem from '../CampaignListItem';
import { TGroupModel } from '../../../../stores/models/Groups';

interface IGroupAccordionDetailProps {
  group: TGroupModel;
  fetchMore: () => void;
}

export const GroupAccordionDetail = ({
  group,
  fetchMore,
}: IGroupAccordionDetailProps): JSX.Element => {
  const classes = useStyles();
  const { listRef } = useFetchMoreInModal(fetchMore);

  return (
    <AccordionDetails
      ref={listRef}
      className={classes.accordionDetails}
    >
      {group.list.map(item => (
        <CampaignListItem key={item.id} campaign={item} />
      ))}
    </AccordionDetails>
  );
};
