const tableHeaderRows = [
  {
    id: 'id',
    numeric: true,
    order: true,
    disablePadding: true,
    label: 'ID',
    style: {
      width: 70,
    },
  },
  {
    order: true,
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
    style: {
      width: 300,
    },
  },
  {
    id: 'user_email',
    numeric: false,
    order: true,
    disablePadding: false,
    label: 'User',
    style: {
      width: 100,
    },
  },
  {
    id: 'pricing_model',
    numeric: false,
    order: true,
    disablePadding: false,
    label: 'Pricing model',
    style: {
      width: 100,
    },
  },
  {
    id: 'max_daily',
    numeric: true,
    disablePadding: false,
    label: 'Daily spending',
    style: {
      width: 50,
    },
  },
  {
    id: 'format_id',
    numeric: true,
    disablePadding: false,
    label: 'Ad format',
    style: {
      width: 30,
    },
  },
  {
    order: true,
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'Price',
    style: {
      width: 20,
    },
  },
  {
    id: 'actions',
    label: '',
    style: {
      width: 80,
    },
  },
];

export default tableHeaderRows;
