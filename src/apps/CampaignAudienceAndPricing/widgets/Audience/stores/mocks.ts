import shuffle from 'lodash/shuffle';
import { ETagStatus } from '../assets/constants/commonAudienceTypes';

export const mockSiteTags = [
  {
    id: '12342112440',
    status: ETagStatus.ACTIVE,
    tooltip: 'pornhub',
  },
  {
    id: '1234240',
    status: ETagStatus.ACTIVE,
    tooltip: 'pornhub',
  },
  {
    id: '250',
    status: ETagStatus.ACTIVE,
    tooltip: 'pornhub',
  },
  {
    id: '1234204',
    status: ETagStatus.ACTIVE,
    tooltip: 'pornhub',
  },
  {
    id: '3450',
    status: ETagStatus.DISABLED,
  },
  {
    id: '12244',
    status: ETagStatus.ACTIVE,
    tooltip: 'pornhub',
  },
  {
    id: '205',
    status: ETagStatus.ACTIVE,
    tooltip: 'pornhub',
  },
  {
    id: '1234624',
    status: ETagStatus.ACTIVE,
    tooltip: 'pornhub',
  },
  {
    id: '1623424',
    status: ETagStatus.ACTIVE,
    tooltip: 'pornhub',
  },
  {
    id: '3456',
    status: ETagStatus.DISABLED,
  },
  {
    id: '12342112446',
    status: ETagStatus.ACTIVE,
    tooltip: 'pornhub',
  },
  {
    id: '425',
    status: ETagStatus.ACTIVE,
    tooltip: 'pornhub',
  },
  {
    id: '1234247',
    status: ETagStatus.ACTIVE,
    tooltip: 'pornhub',
  },
  {
    id: '3745',
    status: ETagStatus.DISABLED,
  },
  {
    id: '12734211244',
    status: ETagStatus.ACTIVE,
    tooltip: 'pornhub',
  },
  {
    id: '257',
    status: ETagStatus.ACTIVE,
    tooltip: 'pornhub',
  },
  {
    id: '34577',
    status: ETagStatus.DISABLED,
  },
  {
    id: '1234219244',
    status: ETagStatus.ACTIVE,
    tooltip: 'pornhub',
  },
  {
    id: '29',
    status: ETagStatus.ACTIVE,
    tooltip: 'pornhub',
  },
  {
    id: '1234249',
    status: ETagStatus.ACTIVE,
    tooltip: 'pornhub',
  },
  {
    id: '3945',
    status: ETagStatus.DISABLED,
  },
  {
    id: '123491244',
    status: ETagStatus.ACTIVE,
    tooltip: 'pornhub',
  },
  {
    id: '9925',
    status: ETagStatus.ACTIVE,
    tooltip: 'pornhub',
  },
  {
    id: '34975',
    status: ETagStatus.DISABLED,
  },
  {
    id: '1234791244',
    status: ETagStatus.ACTIVE,
    tooltip: 'pornhub',
  },
  {
    id: '2579',
    status: ETagStatus.ACTIVE,
    tooltip: 'pornhub',
  },
  {
    id: '2795',
    status: ETagStatus.ACTIVE,
    tooltip: 'pornhub',
  },
  {
    id: '12997211244',
    status: ETagStatus.ACTIVE,
    tooltip: 'pornhub',
  },
  {
    id: '1277911244',
    status: ETagStatus.ACTIVE,
    tooltip: 'pornhub',
  },
  {
    id: '1974',
    status: ETagStatus.ACTIVE,
    tooltip: 'pornhub',
  },
  {
    id: '3965',
    status: ETagStatus.DISABLED,
  },
  {
    id: '2965',
    status: ETagStatus.ACTIVE,
    tooltip: 'pornhub',
  },
  // {
  //   id: '12342496',
  //   status: ETagStatus.ACTIVE,
  //   tooltip: 'pornhub',
  // },
  // {
  //   id: '1266211244',
  //   status: ETagStatus.ACTIVE,
  //   tooltip: 'pornhub',
  // },
  // {
  //   id: '3645',
  //   status: ETagStatus.DISABLED,
  // },
  // {
  //   id: '123421644',
  //   status: ETagStatus.ACTIVE,
  //   tooltip: 'pornhub',
  // },
  // {
  //   id: '12364211244',
  //   status: ETagStatus.ACTIVE,
  //   tooltip: 'pornhub',
  // },
  // {
  //   id: '265',
  //   status: ETagStatus.ACTIVE,
  //   tooltip: 'pornhub',
  // },
  // {
  //   id: '6123424',
  //   status: ETagStatus.ACTIVE,
  //   tooltip: 'pornhub',
  // },
  // {
  //   id: '96345',
  //   status: ETagStatus.DISABLED,
  // },
  // {
  //   id: '121244',
  //   status: ETagStatus.ACTIVE,
  //   tooltip: 'pornhub',
  // },
  // {
  //   id: '45',
  //   status: ETagStatus.DISABLED,
  // },
  // {
  //   id: '123421154',
  //   status: ETagStatus.ACTIVE,
  //   tooltip: 'pornhub',
  // },
  // {
  //   id: '1251244',
  //   status: ETagStatus.ACTIVE,
  //   tooltip: 'pornhub',
  // },
  // {
  //   id: '255',
  //   status: ETagStatus.ACTIVE,
  //   tooltip: 'pornhub',
  // },
  // {
  //   id: '1234224443',
  //   status: ETagStatus.ACTIVE,
  //   tooltip: 'pornhub',
  // },
  // {
  //   id: '34521',
  //   status: ETagStatus.DISABLED,
  // },
  // {
  //   id: '14211244',
  //   status: ETagStatus.ACTIVE,
  //   tooltip: 'pornhub',
  // },
  // {
  //   id: '134211344',
  //   status: ETagStatus.ACTIVE,
  //   tooltip: 'pornhub',
  // },
  // {
  //   id: '134543244',
  //   status: ETagStatus.ACTIVE,
  //   tooltip: 'pornhub',
  // },
  // {
  //   id: '122904',
  //   status: ETagStatus.ACTIVE,
  //   tooltip: 'pornhub',
  // },
  // {
  //   id: '1234409',
  //   status: ETagStatus.ACTIVE,
  //   tooltip: 'pornhub',
  // },
];

export const mockSpotTags = shuffle(
  mockSiteTags.map(tag => ({
    ...tag,
    id: tag.id + 1,
  })),
);

export const mockSubTags = shuffle(
  mockSiteTags.map(tag => ({
    ...tag,
    id: tag.id + 10,
  })),
);
