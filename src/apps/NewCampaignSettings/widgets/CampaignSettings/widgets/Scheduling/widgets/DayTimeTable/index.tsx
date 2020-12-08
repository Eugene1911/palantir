import React, { useCallback } from 'react';
import { inject, observer } from 'mobx-react';
import uuid from 'react-uuid';
import cn from 'classnames';

import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { TSchedulingModel } from '../../stores/SchedulingStore';
import {
  ALL_HOURS,
  DaysOfTheWeek,
} from '../../constants/dayTimeRanges';
import { useMarkTableCells } from './services/useMarkTableCells';

import useStyles from './useStyles';

interface IDayTimeTableProps {
  scheduling?: TSchedulingModel;
}

const DayTimeTable = ({
  scheduling,
}: IDayTimeTableProps): JSX.Element => {
  const classes = useStyles();
  const { handleMouseEnter } = useMarkTableCells(
    scheduling.setDayTimeRange,
    scheduling.setDayTimeHour,
  );

  const checkIsActiveCell = useCallback(
    (x: number, y: number): boolean => {
      return !!Number(
        scheduling.dayTimeRange[y * ALL_HOURS.length + x],
      );
    },
    [scheduling.dayTimeRange],
  );

  return (
    <>
      <Table className={classes.head}>
        <TableHead>
          {DaysOfTheWeek.map(day => (
            <TableRow key={day}>
              <TableCell className={classes.headCell} align="right">
                {day}
              </TableCell>
            </TableRow>
          ))}
        </TableHead>
      </Table>
      <Table className={classes.table}>
        <TableBody>
          {DaysOfTheWeek.map((day, y) => (
            <TableRow key={day}>
              {Array.from(ALL_HOURS).map((hour, x) => (
                <TableCell
                  className={classes.hour}
                  key={uuid()}
                  align="left"
                >
                  <Box
                    onMouseEnter={handleMouseEnter}
                    className={cn(classes.box, {
                      [classes.activeBox]: checkIsActiveCell(x, y),
                    })}
                    data-x={x}
                    data-y={y}
                  >
                    {x}
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default inject(({ newCampaignSettings }) => ({
  scheduling: newCampaignSettings.scheduling,
}))(observer(DayTimeTable));
