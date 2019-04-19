import * as React from 'react';
import { WindowGrid } from 'react-window-grid';
import { FunctionComponent, useMemo, SyntheticEvent, useState, useRef } from 'react';
import {
  useColumns,
  useEventHandlers,
  useRows,
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

type ScrollEvent = SyntheticEvent<HTMLDivElement>;

type WindowCalendarProps222 = {
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
};

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

  minDate?: string;
  maxDate?: string;

  scrollSnap?: boolean;

  dateRangeType: string;

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
  // let { minDate, maxDate } = props;

  const minDate = useMemo(() => {
    return props.minDate || new Date(2000, 0);
  }, [props.minDate]);

  const maxDate = useMemo(() => {
    return props.maxDate || new Date(2020, 11);
  }, [props.maxDate]);

  const weekdaysHeight = props.weekdaysHeight || 30;
  const weekHeight = props.weekHeight || 60;

  const classNames = useClassNames(props.classNames);

  const theme = useTheme(props.theme, classNames, {
    weekdaysHeight,
    weekHeight,
  });

  const strings = useStrings(props.strings);

  const [formatDay, formatMonthDayYear, formatMonthYear, formatYear] = useFormats(
    props.formatDay,
    props.formatMonthDayYear,
    props.formatMonthYear,
    props.formatYear,
    strings,
  );

  const allMonths = useMonths(minDate, maxDate);

  const calendar = useCalendar(classNames, formatDay, formatMonthYear);

  console.log('> strings', strings);

  const weekdays = useWeekdays(classNames, strings);

  const Cell = ({ rowIndex, className, style }) => {
    let children;
    if (rowIndex === 0) {
      // children = 'S_M_T_W_T_F_S';
      children = weekdays;
    } else {
      const _rowIndex = rowIndex - 1;
      const _month = allMonths[_rowIndex];
      children = calendar(_month);
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

  // format()
  let aaa = '';

  if (rowIdx >= 0) {
    const { year, month } = allMonths[rowIdx];
    aaa = format(new Date(year, month), 'YYYY년 M월');
  }

  const inputEl = useRef(null);

  const handleClick = () => {
    console.log(inputEl.current);

    inputEl.current.scrollTo({ rowIndex: 100, duration: 500, easing: 'easeInOutCubic' });
  };

  const months = allMonths.length;

  return (
    <>
      <p onClick={handleClick}>
        {velo} {isScrolling ? 'scrolling' : 'no-scrolling'} - {aaa}
      </p>
      <div className={theme}>
        <div className={rootStyle}>
          <WindowGrid
            ref={inputEl}
            width={300}
            height={500}
            fixedTopCount={1}
            rowCount={months}
            rowHeight={rowHeight}
            columnCount={1}
            columnWidth={100}
            fillerColumn="stretch"
            scrollSnap={props.scrollSnap}
            onScroll={handleScroll}
          >
            {Cell}
          </WindowGrid>
        </div>
      </div>
    </>
  );
};

export default WindowCalendar;
