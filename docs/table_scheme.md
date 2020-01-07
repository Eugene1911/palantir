# Table scheme

Scheme for describe implement of stats table.

## Table scheme example

```
  {
    name: 'Date',
    field: 'day',
    id: 'date',
    prefix: '$',
    sufix: '%',
    numeric: false,
    order: true,
    filters: [
        statsDateFormat('dd.MM.yyyy')
    ],
    calculated: [
        statsCalculatesECPC
    ],
    style: {
        fontSize: '12px',
        width: '200px',
    },
  },
```

## Descriptions of table scheme fields

| Name         | Type            | Description                                                                                    |
| ------------ | :-------------- | :--------------------------------------------------------------------------------------------- |
| `name`       | String          | Name of table column                                                                           |
| `field`      | String          | Name of field from data stats                                                                  |
| `id`         | String          | Name of order direction                                                                        |
| `prefix`     | String          | Prefix for stats value, (`$,%, etc.`)                                                          |
| `sufix`      | String          | Sufix for stats value, (`$,%, etc.`)                                                           |
| `numeric`    | boolean         | Рas a field of type number                                                                     |
| `order`      | boolean         | Has a order column, by `id` field                                                              |
| `filters`    | Array<Function> | List of filter which apply to status field (`dateFormat, numberToFixed, etc.`)                 |
| `calculated` | Array<Function> | List of calculate functions which apply to status field (`calculatesECPC, calculateCtr, etc.`) |
| `style`      | Object          | Styles for table and head of table, in cssInJs style                                           |
