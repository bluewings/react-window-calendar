import * as React from 'react';
import { WindowGrid } from 'react-window-grid';
import { FunctionComponent, useMemo, SyntheticEvent, useState, useRef } from 'react';
import { useColumns, useEventHandlers, useRows } from '../../hooks';
import { format, addMonths, differenceInMonths,
  getYear,
  getMonth,
  startOfMonth,
  endOfMonth,
  getDay,
  getDaysInMonth,


} from 'date-fns';
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

};

const Calendar = (year, month) => {

  const mid = new Date(year, month, 15);
  const start = startOfMonth(mid);
  const end = endOfMonth(mid);
  const dayStart = getDay(start);
  const daysInMonth = getDaysInMonth(mid)

  const lists = [];

  let rows = [];

  // console.log(daysInMonth)
  for (let i = 0; i < dayStart; i = i + 1) {
    rows.push({
      day: '.'
    });
  }

  for (let i = 1; i <= daysInMonth; i = i + 1) {

    rows.push({
      day: i
    });
    if ((dayStart+ i) % 7 === 0 && rows.length > 0) {
      lists.push(rows);
      rows = [];
    }
  }

  if (rows.length > 0) {
    lists.push(rows);
    rows = [];
  }

// console.lo

  return (
    <>
    <h4>{`${year}-${month + 1} ${dayStart} `}</h4>
    <table width='100%'>
    {
      lists.map((e, i) => {
        return (
          
          <tr>
          {
e.map(f => {
  return <td> {f.day} </td>
})

          }
          </tr>
        )
      })
    }
    </table>
    </>
  )
}

const WindowCalendar: FunctionComponent<WindowCalendarProps> = (props) => {
  let { minDate, maxDate } = props;

  minDate = minDate || new Date(2000, 0)
  maxDate = maxDate || new Date(2050, 11)

  const months = differenceInMonths(maxDate, minDate) + 1;

  const Cell = ({ rowIndex, columnIndex, className, style }) => {



    // {format(
    //   addMonths(minDate, rowIndex),

    //   'YYYY-MM'
    // )}
    // {/* {rowIndex} */}

    const newD = addMonths(minDate, rowIndex);
    const year = getYear(newD);
    const month = getMonth(newD);

    return (
      <div className={className} style={style} data-row-index={rowIndex} data-column-index={columnIndex}>


      {Calendar(year, month)}
        
  
      </div>
    );
  }

  const rowHeight = () => {
    return 250;
  }

  // console.log(months)
  return (
    <>
    <h3>{months}</h3>
    <pre>{JSON.stringify({minDate, maxDate})}</pre>
    <WindowGrid
      width={400}
      height={500}
    
      rowCount={months}
      rowHeight={rowHeight}
      columnCount={1}
      columnWidth={100}
      fillerColumn='stretch'
      fitToGrid
    >
      {Cell}

    </WindowGrid>
    </>
  //   <WindowGrid
  //   rowCount={100}
  //   rowHeight=
  //   {...props}
  //   rowCount={rows.length}
  //   fixedTopCount={fixedTopCount}
  //   columnCount={columns.length}
  //   columnWidth={columnWidth}
  // >
  //   {Cell}
  // </WindowGrid>
  )

};

export default WindowCalendar;
