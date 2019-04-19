import * as React from 'react';
import { useMemo } from 'react';
import { format } from 'date-fns';

const Calendar = (_month, { formatDay, formatMonthYear }) => {
  const { year, month, startDay, daysInMonth } = _month;
  const mid = new Date(year, month, 15);
  // const start = startOfMonth(mid);
  // const end = endOfMonth(mid);
  // const startDay = getDay(start);
  // const daysInMonth = getDaysInMonth(mid);

  const lists = [];

  let rows = [];

  const rowscount = Math.ceil((startDay + daysInMonth) / 7);

  // console.log(daysInMonth)
  for (let i = 0; i < startDay; i = i + 1) {
    rows.push({
      day: '',
    });
  }

  for (let i = 1; i <= daysInMonth; i = i + 1) {
    rows.push({
      day: i,
    });
    if ((startDay + i) % 7 === 0 && rows.length > 0) {
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
    position: _month.headerSpaceRequired ? 'relative' : 'absolute',
    display: 'flex',
    height: 40,
    fontSize: 14,
    fontWeight: 700,
    paddingLeft: 12,
    alignItems: 'center',
    // background: '#ddd',
    boxSizing: 'border-box',
  };
  // const yyyymm = format(new Date(year,month), 'MMM YYYY')
  // const yyyymm = format(new Date(year, month), 'YYYY년 M월');

  const yyyymm = formatMonthYear(new Date(year, month));
  return (
    <>
      <div style={hdrStyle}>{yyyymm}</div>
      <table width="100%" border="0" cellPadding={0} cellSpacing={0}>
        {lists.map((e, i) => {
          return (
            <tr>
              {e.map((f) => {
                return <td> {f.day} </td>;
              })}
            </tr>
          );
        })}
      </table>
    </>
  );
};

function useCalendar(formatDay, formatMonthYear) {
  return useMemo(() => {
    const opt = { formatDay, formatMonthYear };

    return (month) => {
      // console.log(month);

      return Calendar(month, opt);
    };
  }, [formatDay, formatMonthYear]);
}

export default useCalendar;
