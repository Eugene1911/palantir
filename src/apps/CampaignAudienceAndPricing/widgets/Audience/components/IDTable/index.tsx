import React from 'react';
import uuid from 'react-uuid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import Box from '@material-ui/core/Box';
import useStyles from './useStyles';

export interface IRowItem {
  item: string | JSX.Element;
  isDisabled: boolean;
}

interface IIDTableProps {
  leftColumns: string[];
  rightColumns: Array<string | JSX.Element>;
  rowsSections: IRowItem[][][];
  // withCheckbox?: boolean;
}

function IDTable(props?: IIDTableProps): JSX.Element {
  const { leftColumns, rightColumns, rowsSections } = props;
  const classes = useStyles();

  return (
    <TableContainer>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <>
              {leftColumns.map(title => {
                return (
                  <TableCell key={title} align="left">
                    {title}
                  </TableCell>
                );
              })}
              {rightColumns.map(title => {
                return (
                  <TableCell key={uuid()} align="right">
                    {title}
                  </TableCell>
                );
              })}
            </>
          </TableRow>
        </TableHead>

        <TableBody>
          {rowsSections.map(section => {
            return (
              <React.Fragment key={uuid()}>
                {section.map((row, rowIndex) => {
                  return (
                    <TableRow key={uuid()}>
                      {row.map(({ item, isDisabled }, itemIndex) => {
                        return (
                          <TableCell
                            key={uuid()}
                            color={isDisabled ? 'textSecondary' : ''}
                            className={
                              rowIndex < section.length - 1
                                ? classes.noBorderCell
                                : ''
                            }
                            align={
                              itemIndex >= leftColumns.length
                                ? 'right'
                                : 'left'
                            }
                          >
                            <Box
                              className={
                                isDisabled ? classes.disabledCell : ''
                              }
                            >
                              {item}
                            </Box>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default IDTable;
