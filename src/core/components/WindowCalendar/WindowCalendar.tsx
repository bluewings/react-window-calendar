import * as React from 'react';
import { WindowGrid } from 'react-window-grid';
import { FunctionComponent, useMemo, SyntheticEvent, useState, useRef } from 'react';
import { useColumns, useEventHandlers, useRows, useMonths } from '../../hooks';
import { format, addMonths, differenceInMonths,
  getYear,
  getMonth,
  startOfMonth,
  endOfMonth,
  getDay,
  getDaysInMonth,


} from 'date-fns';
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

};

const Calendar = (year, month, _month) => {

  const mid = new Date(year, month, 15);
  const start = startOfMonth(mid);
  const end = endOfMonth(mid);
  const dayStart = getDay(start);
  const daysInMonth = getDaysInMonth(mid)

  const lists = [];

  let rows = [];

  const rowscount = Math.ceil((dayStart + daysInMonth) / 7);

  // console.log(daysInMonth)
  for (let i = 0; i < dayStart; i = i + 1) {
    rows.push({
      day: ''
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

const hdrStyle = {
  position: _month.useDivider ? 'relative' : 'absolute',
  display: 'flex',
  height: 40,
  fontSize: 14,
  fontWeight: 700,
  paddingLeft: 12,
  alignItems   : 'center',
  background:"#ddd",
  boxSizing: 'border-box'
}
// const yyyymm = format(new Date(year,month), 'MMM YYYY')
const yyyymm = format(new Date(year,month), 'YYYY년 M월')
return (
    <>
    <div style={hdrStyle}>{yyyymm}</div>
    <table width='100%' border='0' cellPadding={0} cellSpacing={0}>
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

const rootStyle = css({
  position: 'relative',
  h4: {
    height: 40,
    lineHeight: '40px',
    fontSize: 14,
    fontWeight: 700,

    padding: 0,
    margin: 0
  },
  table: {

    border: 'none',
    td: {
      height: 40,
      padding: 0,
      textAlign: 'center',
      fontSize: 14,
      background: '#eee'
      // borderLeft: '1px solid black',
      // borderBottom: '1px solid black',


    }
  }
})

const WindowCalendar: FunctionComponent<WindowCalendarProps> = (props) => {
  // let { minDate, maxDate } = props;


  const minDate = useMemo(() => {
    return props.minDate || new Date(2000, 0);
  }, [props.minDate])

  const maxDate = useMemo(() => {
    return props.maxDate || new Date(2050, 11);
  }, [props.maxDate])

  const allMonths = useMonths(minDate, maxDate);



  // useMonths

  const months = differenceInMonths(maxDate, minDate) + 1;




  const Cell = ({ rowIndex, columnIndex, className, style }) => {



    // {format(
    //   addMonths(minDate, rowIndex),

    //   'YYYY-MM'
    // )}
    // {/* {rowIndex} */}
    if (rowIndex === 0) {
      return 'S_M_T_W_T_F_S'
    }
    const _rowIndex = rowIndex - 1;
    const newD = addMonths(minDate, _rowIndex);
    const year = getYear(newD);
    const month = getMonth(newD);

    

    const _month = allMonths[_rowIndex];

    return (
      <div className={className} style={style} data-row-index={rowIndex} data-column-index={columnIndex}>


      {Calendar(year, month, _month)}
        
  
      </div>
    );
  }

  // const rowHeight = () => {
  //   return 250;
  // }

  const HEIGHT = 40;

  const rowHeight = useMemo(() => {

    return (rowIndex) => {
      // console.log(2)
      // console.log(rowIndex);
      if (rowIndex === 0) {
        return HEIGHT;
      }
      const _rowIndex = rowIndex - 1;

      const { numOfWeeks, useDivider } = allMonths[_rowIndex];



      return (numOfWeeks + (useDivider ? 1 : 0)) * HEIGHT;
      // return 200;
    }

  }, [allMonths]);
  // return null;

  const [isScrolling, setIsScrolling] = useState(false);

  const handleScroll = (scrollInfo) => {
    // console.log(scrollInfo);
    if (isScrolling !== scrollInfo.isScrolling) {
      setIsScrolling(scrollInfo.isScrolling);
    }
  }

  

  // console.log(months)
  return (
    <>
    <h3>{months}</h3>
    <h3>{isScrolling ? 'scrolling' : 'no-scrolling'}</h3>
    <pre>{JSON.stringify({minDate, maxDate})}</pre>
    <div className={rootStyle}>
    <WindowGrid
      width={300}
      height={500}
      fixedTopCount={1}
    
      rowCount={months}
      rowHeight={rowHeight}
      columnCount={1}
      columnWidth={100}
      fillerColumn='stretch'
      fitToGrid
      onScroll={handleScroll}
    >
      {Cell}

    </WindowGrid>
    </div>
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
