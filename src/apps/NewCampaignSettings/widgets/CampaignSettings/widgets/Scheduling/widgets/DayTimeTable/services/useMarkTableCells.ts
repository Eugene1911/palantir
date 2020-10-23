import { useCallback, useEffect, useRef, useState } from 'react';
import useStyles from '../useStyles';
import {
  DayTimeRangeStatuses,
  FULL,
} from '../../../constants/dayTimeRanges';

export const useMarkTableCells = (
  saveNewCells,
  saveOneHour,
): { [key: string]: (event: unknown) => void } => {
  // флаг показывает, зажата ли кнопка мыши
  const [isPressed, setIsPressed] = useState<boolean>(false);
  // флаг показывает, двигается ли зажатый курсор
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const classes = useStyles();
  // первая ячейка, от которой двигается курсор
  const firstCell = useRef<{ x: number; y: number } | undefined>();

  const handleMouseDown = useCallback(
    event => {
      setIsPressed(true);
      // если нажали на ячейку, то запоминаем ее как первую
      if (event.target.classList.contains(classes.box)) {
        firstCell.current = {
          x: +event.target.getAttribute('data-x'),
          y: +event.target.getAttribute('data-y'),
        };
      }
    },
    [setIsPressed, classes],
  );

  const handleMouseUp = useCallback(
    event => {
      // если была нажата ячейка
      if (firstCell.current) {
        const activeCells = document.getElementsByClassName(
          classes.activeBox,
        );
        // если выделили ВСЕ ячейки, то сразу проставляем статус ALL и ничего не расчитываем
        if (activeCells.length === FULL.length) {
          saveNewCells(FULL, DayTimeRangeStatuses.ALL);
          setIsPressed(false);
          setIsMoving(false);
          return;
        }

        // если было выделение нескольких ячеек
        if (isMoving) {
          let resultString = '';
          const cells = document.getElementsByClassName(classes.box);
          // проходимся по всем ячейкам, и составляем 1 строку из всех часов
          Array.from(cells).forEach((cell): void => {
            if (cell.classList.contains(classes.activeBox)) {
              resultString += '1';
            } else {
              resultString += '0';
            }
          });
          saveNewCells(resultString, DayTimeRangeStatuses.CUSTOM);
        } else {
          // если был клик на ячейку, то выставляем только 1 час по его координатам
          const currentX = +event.target.getAttribute('data-x');
          const currentY = +event.target.getAttribute('data-y');
          saveOneHour(currentX, currentY);
        }
        firstCell.current = undefined;
      }
      // сбрасываем все флаги
      setIsPressed(false);
      setIsMoving(false);
    },
    [
      setIsPressed,
      setIsMoving,
      classes,
      isMoving,
      saveNewCells,
      saveOneHour,
    ],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    return (): void => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseDown, handleMouseUp]);

  const handleMouseEnter = (event): void => {
    // если зажата кнопка мыши И
    // курсор идет через ячейку И
    // первое нажатие было на ячейку таблицы
    if (
      isPressed &&
      event.target.classList.contains(classes.box) &&
      firstCell.current
    ) {
      const currentX = +event.target.getAttribute('data-x');
      const currentY = +event.target.getAttribute('data-y');
      // определяем координаты прямоугольника, который получается от
      // первой нажатой клетки до текущей, где сейчас курсор
      const minX = Math.min(currentX, firstCell.current.x);
      const minY = Math.min(currentY, firstCell.current.y);
      const maxX = Math.max(currentX, firstCell.current.x);
      const maxY = Math.max(currentY, firstCell.current.y);
      const cells = document.getElementsByClassName(classes.box);
      // цикл по всем ячейкам таблицы
      Array.from(cells).forEach((cell): void => {
        const x = +cell.getAttribute('data-x');
        const y = +cell.getAttribute('data-y');

        // если координата ячейки попадает в расчитанный прямоугольник
        if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
          // то делаем ее закрашенной
          cell.classList.add(classes.activeBox);
        } else {
          // иначе делаем белой
          cell.classList.remove(classes.activeBox);
        }
      });

      // проставляем флаг, что идет движение курсора, а не клик
      setIsMoving(true);
    }
  };

  return { handleMouseEnter };
};
