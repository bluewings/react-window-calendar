import * as React from 'react';
import { useMemo } from 'react';
import { format } from 'date-fns';

const Calendar = (_month, { classNames, formatDay, formatMonthYear }) => {
  const { year, month, startDay, daysInMonth } = _month;
  // const mid = new Date(year, month, 15);
  // const start = startOfMonth(mid);
  // const end = endOfMonth(mid);
  // const startDay = getDay(start);
  // const daysInMonth = getDaysInMonth(mid);

  const weeks = [];

  let days = [];

  // console.log(daysInMonth)
  for (let i = 0; i < startDay; i = i + 1) {
    days.push({
      day: '',
    });
  }

  for (let i = 1; i <= daysInMonth; i = i + 1) {
    days.push({
      day: i,
    });
    if ((startDay + i) % 7 === 0 && days.length > 0) {
      weeks.push(days);
      days = [];
    }
  }

  if (days.length > 0) {
    weeks.push([...days, ...[...Array(7 - days.length)].map((e) => ({ day: '' }))]);
    days = [];
  }

  // console.lo

  const hdrStyle = {
    position: _month.headerSpaceRequired ? 'relative' : 'absolute',
    // display: 'flex',
    // height: 40,
    // fontSize: 14,
    // fontWeight: 700,
    // paddingLeft: 12,
    // alignItems: 'center',
    // background: '#ddd',
    // boxSizing: 'border-box',
  };
  // const yyyymm = format(new Date(year,month), 'MMM YYYY')
  // const yyyymm = format(new Date(year, month), 'YYYY년 M월');

  const yyyymm = formatMonthYear(new Date(year, month));
  return (
    <>
      <div className={classNames.MONTH}>
        <div className={classNames.MONTH_TITLE} style={hdrStyle}>
          {yyyymm}
        </div>

        {weeks.map((days, i) => (
          <ul className={classNames.WEEK}>
            {days.map((e) => (
              <li className={classNames.DAY}> {e.day} </li>
            ))}
          </ul>
        ))}
        {/* <table width="100%" border="0" cellPadding={0} cellSpacing={0}>
          {lists.map((e, i) => {
            return (
              <tr>
                {e.map((f) => {
                  return <td> {f.day} </td>;
                })}
              </tr>
            );
          })}
        </table> */}
      </div>
    </>
  );
};

function useCalendar(classNames, formatDay, formatMonthYear) {
  return useMemo(() => {
    const opt = { classNames, formatDay, formatMonthYear };

    return (month) => {
      // console.log(month);

      return Calendar(month, opt);
    };
  }, [classNames, formatDay, formatMonthYear]);
}

export default useCalendar;
