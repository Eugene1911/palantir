import { useTranslation } from 'react-i18next';

function useTableHeaderRows(): Array<Record<string, any>> {
  const { t } = useTranslation();

  const tableHeaderRows = [
    {
      id: 'id',
      numeric: true,
      order: true,
      label: t('client_listing:table_header.id'),
      style: {
        width: '5%',
      },
    },
    {
      numeric: false,
      id: 'last_login',
      label: t('client_listing:table_header.last_login'),
      style: {
        width: '6%',
      },
    },
    {
      numeric: false,
      id: 'action',
      label: '',
      style: {
        width: '1%',
      },
    },
    {
      id: 'user_email',
      numeric: false,
      label: t('client_listing:table_header.e_mail'),
      style: {
        width: '15%',
      },
    },
    {
      id: 'status',
      order: true,
      label: t('client_listing:table_header.status'),
      style: {
        width: '6%',
      },
    },
    {
      id: 'created_at',
      order: true,
      label: t('client_listing:table_header.registration_date'),
      style: {
        width: '7%',
      },
    },
    {
      id: 'country_name',
      order: true,
      label: t('client_listing:table_header.country'),
      style: {
        width: '15%',
      },
    },
    {
      id: 'company_name',
      label: t('client_listing:table_header.company_or_name'),
      style: {
        width: '15%',
      },
    },
    {
      id: 'account_type',
      label: t('client_listing:table_header.account_type'),
      style: {
        width: '5%',
      },
    },
    {
      id: 'manager_email',
      order: true,
      label: t('client_listing:table_header.account_manager'),
      style: {
        width: '14%',
      },
    },
    {
      id: 'traffic_source_type',
      label: t('client_listing:table_header.traffic_source_type'),
      style: {
        width: '14%',
      },
    },
    {
      id: 'status_updated_at',
      order: true,
      label: t('client_listing:table_header.last_change'),
      style: {
        width: '6%',
      },
    },
    {
      id: 'balance',
      order: true,
      numeric: true,
      label: t('client_listing:table_header.balance'),
      style: {
        width: '6%',
      },
    },
    {
      numeric: true,
      id: 'estimated_days',
      label: t('client_listing:table_header.estimated_days'),
      style: {
        width: '6%',
      },
    },
  ];

  return tableHeaderRows;
}

export default useTableHeaderRows;
