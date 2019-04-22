import * as React from 'react';
import { WindowGrid } from 'react-window-grid';
import { FunctionComponent, useMemo, SyntheticEvent, useState, useRef } from 'react';
import {
  // useColumns,
  // useEventHandlers,
  // useRows,
  useDates,
  useClassNames,
  useCalendar,
  useFormats,
  useMonths,
  useStrings,
  useWeekdays,
  useTheme,
} from '../../hooks';
import { format } from 'date-fns';
import { css } from 'emotion';
import { DateInput } from '../../hooks/useDates';

import styles from './WindowCalendar.module.scss';

type ScrollEvent = SyntheticEvent<HTMLDivElement>;

enum Direction {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}

// type WindowCalendarProps222 = {
//   scrollTop?: number;
//   scrollLeft?: number;
//   width?: number;
//   height?: number;

//   columns?: any;
//   columnCount: number;
//   columnWidth: number | Function;

//   rows?: any;
//   rowCount: number;
//   rowHeight: number | Function;

//   fixedTopCount?: number;
//   fixedLeftCount?: number;
//   fixedRightCount?: number;
//   fixedBottomCount?: number;
//   overscanCount?: number;

//   fillerColumn?: 'none' | 'append' | 'stretch' | 'shrink';
//   fillerRow?: 'none' | 'append' | 'stretch' | 'shrink';
//   /** 스크롤되는 뷰포트 너비가 특정값 이하로 떨어지면 fixedColumn 이 무효화된다. */
//   minVisibleScrollViewWidth: number;
//   minVisibleScrollViewHeight: number;

//   containerStyle?: any;
//   guideline?: boolean;
// };

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

  dateRangeType: string;

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

  formatDay?: Function;
  formatMonthDayYear?: Function;
  formatMonthYear?: Function;
  formatYear?: Function;
};

const rootStyle = css({
  position: 'relative',
  h4: {
    height: 40,
    lineHeight: '40px',
    fontSize: 14,
    fontWeight: 700,

    padding: 0,
    margin: 0,
  },
  table: {
    border: 'none',
    td: {
      height: 40,
      padding: 0,
      textAlign: 'center',
      fontSize: 14,
      // background: '#eee',
      // borderLeft: '1px solid black',
      // borderBottom: '1px solid black',
    },
  },
});

const WindowCalendar: FunctionComponent<WindowCalendarProps> = (props) => {
  const [min, minDate, max, maxDate] = useDates(props.min, props.minDate, props.max, props.maxDate);

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

  const allMonths = useMonths(min, max);

  const weekdays = useWeekdays(classNames, strings);

  const calendar = useCalendar({
    classNames,
    formatDay,
    formatMonthYear,
    direction,
    weekdays,
    minDate,
    maxDate,
  });

  // console.log('> strings', strings);

  const Cell = ({ rowIndex, columnIndex, className, style }) => {
    let children;

    if (direction === Direction.HORIZONTAL) {
      const _month = allMonths[columnIndex];
      children = calendar(_month);
    } else {
      if (rowIndex === 0) {
        children = weekdays;
      } else {
        const _rowIndex = rowIndex - 1;
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
    return (rowIndex) => {
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

  const tmp = useRef({});

  const [velo, setVelo] = useState();

  const handleScroll = (scrollInfo) => {
    if (isScrolling !== scrollInfo.isScrolling) {
      setIsScrolling(scrollInfo.isScrolling);
    }
    if (rowIdx !== scrollInfo.rowStartIndex - 1) {
      setRowIdx(scrollInfo.rowStartIndex - 1);
    }
    if (scrollInfo.isScrolling && tmp.current.last && tmp.current.last.isScrolling) {
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
    tmp.current.last = scrollInfo;
  };

  const [scrollbarHeight, setScrollbarHeight] = useState(0);

  const handleResize = (size) => {
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

  const inputEl = useRef(null);

  const handleClick = () => {
    console.log(inputEl.current);

    inputEl.current.scrollTo({ rowIndex: 100, duration: 500, easing: 'easeInOutCubic' });
  };

  const months = allMonths.length;

  let windowGridProps = {
    fixedTopCount: 1,
    rowCount: months,
    rowHeight: rowHeight,
    columnCount: 1,
    columnWidth: 100,
    width: 280,
    height: 400,
    fillerColumn: 'stretch',
  };

  if (direction === Direction.HORIZONTAL) {
    console.log('> scrollbarHeight', scrollbarHeight);
    windowGridProps = {
      // fixedTopCount: 1,
      columnCount: months,
      columnWidth: clientWidth / numOfCalendars,
      rowCount: 1,
      rowHeight: 100,
      height: weekHeight * 7 + weekdaysHeight + scrollbarHeight,
      fillerRow: 'stretch',
      scrollSnap: true,
    };
  }

  const rootClassName = [
    styles.root,

    direction === Direction.HORIZONTAL ? classNames.HORIZONTAL : classNames.VERTICAL,
  ].join(' ');

  return (
    <>
      {/* <p onClick={handleClick}>
        {velo} {isScrolling ? 'scrolling' : 'no-scrolling'} - {aaa}
      </p> */}
      <div className={theme}>
        <div className={rootClassName}>
          <div className={rootStyle}>
            <WindowGrid
              ref={inputEl}
              // width={700}

              scrollSnap={props.scrollSnap}
              onScroll={handleScroll}
              onResize={handleResize}
              {...windowGridProps}
              guideline={false}
            >
              {Cell}
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
      </div>
    </>
  );
};

export default WindowCalendar;
