import { useTranslation } from 'react-i18next';

function useTableHeaderRows() {
  const { t } = useTranslation();
  const tableHeaderRows = [
    {
      id: 'id',
      numeric: true,
      order: true,
      label: t('campaign_list:table_header.id'),
      style: {
        width: '6%',
      },
    },
    {
      id: 'button_stats',
      style: {
        width: '2%',
      },
    },
    {
      order: true,
      id: 'name',
      numeric: false,
      label: t('campaign_list:table_header.name'),
      style: {
        width: '31%',
      },
    },
    {
      id: 'user_email',
      numeric: false,
      order: true,
      label: t('campaign_list:table_header.user'),
      style: {
        width: '12%',
      },
    },
    {
      id: 'pricing_model',
      numeric: true,
      order: true,
      label: t('campaign_list:table_header.pricing_model'),
      style: {
        width: '8%',
      },
    },
    {
      id: 'max_daily',
      numeric: true,
      label: t('campaign_list:table_header.daily_spending'),
      style: {
        width: '7%',
      },
    },
    {
      id: 'format_id',
      numeric: true,
      label: t('campaign_list:table_header.ad_format'),
      style: {
        width: '7%',
      },
    },
    {
      order: true,
      id: 'price',
      numeric: true,
      label: t('campaign_list:table_header.price'),
      style: {
        width: '7%',
      },
    },
    {
      id: 'status',
      label: t('campaign_list:table_header.status'),
      style: {
        width: '5%',
      },
    },
    {
      id: 'actions',
      label: '',
      style: {
        width: '10%',
      },
    },
  ];

  return tableHeaderRows;
}

export default useTableHeaderRows;
