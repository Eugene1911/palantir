const tableHeaderRows = [
  {
    id: 'id',
    numeric: true,
    order: true,
    label: 'ID',
    style: {
      width: '5%',
    },
  },
  {
    numeric: false,
    id: 'last_login',
    label: 'Last login',
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
    label: 'E-mail',
    style: {
      width: '15%',
    },
  },
  {
    id: 'status',
    order: true,
    label: 'Status',
    style: {
      width: '6%',
    },
  },
  {
    id: 'created_at',
    order: true,
    label: 'Registration date',
    style: {
      width: '7%',
    },
  },
  {
    id: 'country_name',
    order: true,
    label: 'Country',
    style: {
      width: '15%',
    },
  },
  {
    id: 'company_name',
    label: 'Company/Name',
    style: {
      width: '15%',
    },
  },
  {
    id: 'account_type',
    label: 'Account Type',
    style: {
      width: '5%',
    },
  },
  {
    id: 'manager_email',
    order: true,
    label: 'Account manager',
    style: {
      width: '14%',
    },
  },
  {
    id: 'status_updated_at',
    order: true,
    label: 'Last change',
    style: {
      width: '6%',
    },
  },
  {
    id: 'balance',
    order: true,
    numeric: true,
    label: 'Balance',
    style: {
      width: '6%',
    },
  },
  {
    numeric: true,
    id: 'estimated_days',
    label: 'Estimated days',
    style: {
      width: '6%',
    },
  },
];

export default tableHeaderRows;
