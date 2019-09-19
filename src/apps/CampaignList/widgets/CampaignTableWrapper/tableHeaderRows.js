const tableHeaderRows = [
  {
    id: 'id',
    numeric: true,
    order: true,
    label: 'ID',
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
    label: 'Name',
    style: {
      width: '31%',
    },
  },
  {
    id: 'user_email',
    numeric: false,
    order: true,
    label: 'User',
    style: {
      width: '12%',
    },
  },
  {
    id: 'pricing_model',
    numeric: true,
    order: true,
    label: 'Pricing model',
    style: {
      width: '8%',
    },
  },
  {
    id: 'max_daily',
    numeric: true,
    label: 'Daily spending',
    style: {
      width: '7%',
    },
  },
  {
    id: 'format_id',
    numeric: true,
    label: 'Ad format',
    style: {
      width: '7%',
    },
  },
  {
    order: true,
    id: 'price',
    numeric: true,
    label: 'Price',
    style: {
      width: '7%',
    },
  },
  {
    id: 'status',
    label: 'Status',
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

export default tableHeaderRows;
