import { useTranslation } from 'react-i18next';

function useTableHeaderRows(): Array<Record<string, any>> {
  const { t } = useTranslation();

  const tableHeaderRows = [
    {
      id: 'title',
      order: true,
      label: t('optimizers:table:name'),
      style: {
        width: '40%',
      },
    },
    {
      id: 'period',
      label: t('optimizers:table:period'),
    },
    {
      id: 'source',
      label: t('optimizers:table:sourse_blocking'),
    },
    {
      id: 'rule_count',
      order: true,
      label: t('optimizers:table:rules'),
    },
    {
      id: 'updated_at',
      order: true,
      label: t('optimizers:table:updated'),
    },
    {
      id: 'campaigns',
      numeric: true,
      label: t('optimizers:table:campaigns'),
      style: {
        width: '2%',
      },
    },
    // {
    //   id: 'action',
    //   style: {
    //     width: '2%',
    //   },
    // },
  ];

  return tableHeaderRows;
}

export default useTableHeaderRows;
