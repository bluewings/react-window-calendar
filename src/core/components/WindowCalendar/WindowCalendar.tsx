import * as React from 'react';
import { WindowGrid } from 'react-window-grid';
import { FunctionComponent, useMemo, SyntheticEvent, useState, useRef } from 'react';
import { useColumns, useEventHandlers, useRows } from '../../hooks';
import { format, addMonths, differenceInMonths } from 'date-fns';
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

const WindowCalendar: FunctionComponent<WindowCalendarProps> = (props) => {
  let { minDate, maxDate } = props;

  minDate = minDate || new Date(2018, 0, 15)
  maxDate = maxDate || new Date(2020, 11, 15)

  const months = differenceInMonths(maxDate, minDate) + 1;

  const Cell = ({ rowIndex, columnIndex, className, style }) => (
    <div className={className} style={style} data-row-index={rowIndex} data-column-index={columnIndex}>
      

      {format(
        addMonths(minDate, rowIndex),

        'YYYY-MM'
      )}
      {/* {rowIndex} */}
    </div>
  );

  const rowHeight = () => {
    return 100;
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
