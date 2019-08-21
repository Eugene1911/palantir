import React from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import ContentLoader from 'react-content-loader';

const COUNT_ROWS = 10;

const TableLoaderRow = props => {
  // const random = Math.random() * (1 - 0.7) + 0.7;

  return (
    <ContentLoader
      width='100'
      height='15'
      speed={2}
      primaryColor='#d9d9d9'
      secondaryColor='#ecebeb'
      {...props}
    >
      <rect x='0' y='0' rx='1' ry='26' width='100%' height='18' />
    </ContentLoader>
  );
};

const TableLoader = props => (
  <>
    {Array(COUNT_ROWS)
      .fill('')
      .map((e, index) => (
        <TableMain
          {...props}
          style={{ opacity: Number(2 / index).toFixed(1) }}
          key={Math.random(index)}
        />
      ))}
  </>
);

const TableMain = ({ cols, style }) => (
  <TableBody style={style}>
    <TableRow>
      {Array(cols)
        .fill('')
        .map((e, index) => (
          <TableCell key={Math.random(index)}>
            <TableLoaderRow
              key={Math.random(index)}
              style={{
                width: '100%',
                height: '18px',
                maxWidth: '100%',
              }}
            />
          </TableCell>
        ))}
    </TableRow>
  </TableBody>
);

export default TableLoader;
