import * as React from 'react';
import { WindowGrid } from 'react-window-grid';
import { FunctionComponent, useMemo, useEffect, SyntheticEvent, useState, useRef } from 'react';
import {
  // useColumns,
  // useEventHandlers,
  // useRows,
  useDates,
  useClassNames,
  useCalendar,
  useEventHandlers,
  useFormats,
  useMonths,
  useStrings,
  useWeekdays,
  useTheme,
} from '../../hooks';
import { format, addDays } from 'date-fns';
import { css } from 'emotion';
import { DateInput } from '../../hooks/useDates';
import { ClassNames } from '../../hooks/useClassNames';
import { ThemeFunction } from '../../hooks/useTheme';
import { CalendarStrings } from '../../hooks/useStrings';
import { IFormatDay, IFormatMonthDayYear, IFormatMonthYear, IFormatYear } from '../../hooks/useFormats';

import styles from './WindowCalendar.module.scss';

enum Direction {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}

enum DateRangeType {
  DAY = 'day',
  RANGE = 'range',
  WEEK = 'week',
  MONTH = 'month',
}

type WindowCalendarProps = {
  scrollTop?: number;
  scrollLeft?: number;
  width?: number;
  height?: number;

  columns?: any;
  columnCount: number;
  columnWidth: number | Function;

  rows?: any;
  rowCount: number;
  rowHeight: number | Function;

  fixedTopCount?: number;
  fixedLeftCount?: number;
  fixedRightCount?: number;
  fixedBottomCount?: number;
  overscanCount?: number;

  fillerColumn?: 'none' | 'append' | 'stretch' | 'shrink';
  fillerRow?: 'none' | 'append' | 'stretch' | 'shrink';
  /** 스크롤되는 뷰포트 너비가 특정값 이하로 떨어지면 fixedColumn 이 무효화된다. */
  minVisibleScrollViewWidth: number;
  minVisibleScrollViewHeight: number;

  containerStyle?: any;
  guideline?: boolean;

  min?: DateInput;
  minDate?: DateInput;
  max?: DateInput;

  maxDate?: DateInput;

  scrollSnap?: boolean;

  dateRangeType?: DateRangeType;

  direction: Direction;

  numOfCalendars?: number;
  gutter?: number;

  // https://docs.microsoft.com/en-us/dotnet/api/system.windows.forms.datavisualization.charting.daterangetype?view=netframework-4.8

  // ??? https://developers.google.com/ad-manager/api/reference/v201902/ReportService.DateRangeType

  // https://developer.microsoft.com/en-us/fabric#/components/Calendar

  //   formatDay
  // (date: Date) => string
  // Callback to apply formatting to the days in the Day Picker calendar
  // formatMonthDayYear
  // (date: Date, strings?: ICalendarStrings) => string
  // Callback to apply formatting to mmmm d, yyyy formated dates
  // formatMonthYear
  // (date: Date, strings?: ICalendarStrings) => string
  // Callback to apply formatting to the month and year in the Day Picker header
  // formatYear
  // (date: Date) => string

  formatDay?: IFormatDay | string;
  formatMonthDayYear?: IFormatMonthDayYear;
  formatMonthYear?: IFormatMonthYear;
  formatYear?: IFormatYear;

  onSelectDate?: Function;

  weekdaysHeight?: number;
  weekHeight?: number;
  classNames?: ClassNames;
  theme?: ThemeFunction;
  strings?: CalendarStrings;
};

const compareDate = (a: Date, b: Date) => {
  const c = a.valueOf();
  const d = b.valueOf();
  if (a === b) {
    return 0;
  }
  return a > b ? 1 : -1;
};

function useSelected(_selected: any, dateRangeType: any) {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    // if ()
    // if ()
    if (dateRangeType === DateRangeType.RANGE && _selected && _selected.length === 2) {
      // @ts-ignore
      setSelected([_selected.map((e) => new Date(e))]);
    }

    // console.log({ dateRangeType, _selected });
  }, [JSON.stringify(_selected), dateRangeType]);

  // console.log('> selected', selected);

  return [selected, setSelected];
}

const WindowCalendar: FunctionComponent<WindowCalendarProps> = (props) => {
  const [min, minDate, max, maxDate, today]: Date[] = useDates(props.min, props.minDate, props.max, props.maxDate);

  // const min = useMemo(() => {
  //   return props.min || new Date(2000, 0);
  // }, [props.min]);

  // const max = useMemo(() => {
  //   return props.max || new Date(2050, 11);
  // }, [props.max]);

  const weekdaysHeight = props.weekdaysHeight || 30;
  const weekHeight = props.weekHeight || 30;

  const numOfCalendars = props.numOfCalendars || 4;
  const gutter = props.gutter || 20;

  const direction = props.direction || Direction.VERTICAL;

  const classNames = useClassNames(props.classNames);

  const [clientWidth, setClientWidth] = useState(0);

  const theme = useTheme(props.theme, classNames, {
    weekdaysHeight,
    weekHeight,
    clientWidth,
    direction,
    gutter,
  });

  const strings = useStrings(props.strings);

  const [formatDay, formatMonthDayYear, formatMonthYear, formatYear] = useFormats(
    props.formatDay,
    props.formatMonthDayYear,
    props.formatMonthYear,
    props.formatYear,
    strings,
  );

  const [allMonths, findMonth] = useMonths(min, max);

  // @ts-ignore
  const thisMonth = findMonth(today);

  const weekdays = useWeekdays(classNames, strings);

  // console.log(windowGridProps);
  // let tmpD = new Date()
  // tmpD = addDays(tmpD, 3);

  // @ts-ignore
  const [selected, setSelected] = useSelected(props.selected, props.dateRangeType);

  const [calendar, isEnabled] = useCalendar({
    classNames,
    formatDay,
    formatMonthYear,
    direction,
    weekdays,
    minDate,
    maxDate,
    today,
    selected,
  });

  // console.log('> strings', strings);

  const Calendar = ({
    rowIndex,
    columnIndex,
    className,
    style,
  }: {
    rowIndex: number;
    columnIndex: number;
    className: string;
    style: any;
  }) => {
    let children;

    if (direction === Direction.HORIZONTAL) {
      const _month = allMonths[columnIndex];
      children = calendar(_month);
    } else {
      if (rowIndex === 0) {
        children = weekdays;
      } else {
        const _rowIndex = rowIndex - 1;
        // @ts-ignore
        const _month = allMonths[_rowIndex];
        children = calendar(_month);
      }
    }

    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  };

  // const HEIGHT = 40;

  const rowHeight = useMemo(() => {
    return (rowIndex: number) => {
      // console.log(2)
      // console.log(rowIndex);
      if (rowIndex === 0) {
        return weekdaysHeight;
      }
      const _rowIndex = rowIndex - 1;

      const { numOfWeeks, headerSpaceRequired } = allMonths[_rowIndex];

      return (numOfWeeks + (headerSpaceRequired ? 1 : 0)) * weekHeight;
      // return 200;
    };
  }, [allMonths, weekdaysHeight, weekHeight]);
  // return null;

  const [isScrolling, setIsScrolling] = useState(false);
  const [rowIdx, setRowIdx] = useState(0);

  // @ts-ignore
  const tmp = useRef<{ last: { scrollTop: number; eventTime: number } }>({});

  const [velo, setVelo] = useState();

  const handleScroll = (scrollInfo: any) => {
    if (isScrolling !== scrollInfo.isScrolling) {
      setIsScrolling(scrollInfo.isScrolling);
    }
    if (rowIdx !== scrollInfo.rowStartIndex - 1) {
      setRowIdx(scrollInfo.rowStartIndex - 1);
    }
    // @ts-ignore
    if (scrollInfo.isScrolling && tmp.current && tmp.current.last && tmp.current.last.isScrolling) {
      setVelo(
        Math.abs(
          ~~(
            ((scrollInfo.scrollTop - tmp.current.last.scrollTop) /
              (scrollInfo.eventTime - tmp.current.last.eventTime)) *
            1000
          ),
        ),
      );
    } else {
      setVelo(null);
    }
    // @ts-ignore
    tmp.current.last = scrollInfo;
  };

  const [scrollbarHeight, setScrollbarHeight] = useState(0);

  const handleResize = (size: any) => {
    if (clientWidth !== size.clientWidth) {
      setClientWidth(size.clientWidth);
    }
    if (scrollbarHeight !== size.scrollbarHeight) {
      setScrollbarHeight(size.scrollbarHeight);
    }
    // console.log(sizeInfo);
  };
  // format()
  let aaa = '';

  if (rowIdx >= 0) {
    const { year, month } = allMonths[rowIdx];
    aaa = formatMonthYear({ year, month });
  }

  // const inputEl = useRef(null);

  // const handleClick = () => {
  //   console.log(inputEl.current);

  //   inputEl.current.scrollTo({ rowIndex: 100, duration: 500, easing: 'easeInOutCubic' });
  // };

  const months = allMonths.length;

  let windowGridProps;

  // console.log(thisMonth)

  if (direction === Direction.HORIZONTAL) {
    // console.log('> scrollbarHeight', scrollbarHeight);
    windowGridProps = {
      // fixedTopCount: 1,
      columnCount: months,
      columnWidth: clientWidth / numOfCalendars,
      rowCount: 1,
      rowHeight: 100,
      defaultColumnIndex: thisMonth.monthIndex,

      height: weekHeight * 7 + weekdaysHeight + scrollbarHeight,
      fillerRow: 'stretch',
      scrollSnap: true,
    };
  } else {
    windowGridProps = {
      fixedTopCount: 1,
      rowCount: months + 1,
      rowHeight: rowHeight,
      columnCount: 1,
      columnWidth: 100,
      // width: 280,

      height: props.height || 400,
      defaultRowIndex: thisMonth.monthIndex + 1,
      fillerColumn: 'stretch',
    };
  }

  const rootClassName = [
    styles.root,

    direction === Direction.HORIZONTAL ? classNames.HORIZONTAL : classNames.VERTICAL,
  ].join(' ');

  const updateSelected = useRef<Function>();

  updateSelected.current = (date: Date) => {
    // let next = [date];
    let next;

    if (props.dateRangeType === DateRangeType.RANGE) {
      // @ts-ignore
      let prev = selected[0] || [];
      if (prev && prev.length < 2) {
        next = [[...prev, date].sort(compareDate)];
      } else {
        next = [[date]];
      }
    } else {
      next = [date];
    }
    // @ts-ignore
    setSelected(next);
    return next;
  };

  // useEffect(() => {

  //   // if (selected) {
  //   props.onSelectDate && props.onSelectDate(selected)
  //   // }

  // }, [selected]);

  // React.useEffect(())

  // const [hover, setHover] = useState(null);

  // const hoverRef = useRef();
  // hoverRef.current = hover;

  const ownEvents = useMemo(() => {
    return {
      // mouseover: {
      //   [`.${classNames.DAY}`]: (event, ui) => {
      //     return;

      //     console.log('mouseover', ui.date);
      //     console.log(hoverRef.current);
      //     if (
      //       ui.date &&
      //       hoverRef.current &&
      //       typeof hoverRef.current.toString === 'function' &&
      //       hoverRef.current.toString() === ui.date.toString()
      //     ) {
      //       return;
      //     }
      //     setHover(ui.date);
      //   },
      // },
      // mouseout: {
      //   // [`.${classNames.DAY}`]: (event, ui) => {
      //   '*': (event, ui) => {
      //     return;

      //     console.log('mouseout', ui.date);
      //     if (hoverRef.current) {
      //       setHover(null);
      //     }
      //     // setHove
      //   },
      // },
      click: {
        [`.${classNames.DAY}`]: (event: SyntheticEvent, ui: any) => {
          // console.log()
          // console.log(ui);
          // console.log(isEnabled(ui.date));
          if (ui && ui.date && isEnabled(ui.date)) {
            // props.onSelectDate()
            // props.onSelectDate(ui.date);
            if (updateSelected.current) {
              const next = updateSelected.current(ui.date);
              if (props.onSelectDate) {
                props.onSelectDate(next);
              }
            }
          }
          // console.log(event, ui);
        },
      },
    };
  }, []);

  const eventHandlers = useEventHandlers({ ...ownEvents });

  return (
    <>
      {/* <p onClick={handleClick}>
        {velo} {isScrolling ? 'scrolling' : 'no-scrolling'} - {aaa}
      </p> */}
      {/* <pre>{JSON.stringify(hover)}&nbsp;</pre> */}
      <div className={theme}>
        <div className={rootClassName}>
          <div {...eventHandlers}>
            <WindowGrid
              scrollSnap={props.scrollSnap}
              onScroll={handleScroll}
              onResize={handleResize}
              {...windowGridProps}
              guideline={false}
              overscanCount={2}
            >
              {Calendar}
            </WindowGrid>
          </div>
          <div
            className={classNames.MONTH_OVERLAY + ' ' + styles.overlayGradient}
            style={{ opacity: velo > 500 ? 1 : 0 }}
          >
            <div>{aaa}</div>
            <div />
          </div>
        </div>
        {/* <pre>{JSON.stringify(selected, null, 2)}</pre> */}
      </div>
    </>
  );
};

export default WindowCalendar;
