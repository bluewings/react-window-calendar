import * as React from 'react';
import { useMemo } from 'react';
import { format } from 'date-fns';

const identity = (e) => e;

const Calendar = (_month, { classNames, formatDay, formatMonthYear, direction, weekdays, isDisabled }) => {
  const { year, month, startDay, daysInMonth } = _month;
  // const mid = new Date(year, month, 15);
  // const start = startOfMonth(mid);
  // const end = endOfMonth(mid);
  // const startDay = getDay(start);
  // const daysInMonth = getDaysInMonth(mid);

  const weekdayClassNames = [
    classNames.WEEKDAY_SUN,
    classNames.WEEKDAY_MON,
    classNames.WEEKDAY_TUE,
    classNames.WEEKDAY_WED,
    classNames.WEEKDAY_THU,
    classNames.WEEKDAY_FRI,
    classNames.WEEKDAY_SAT,
  ];

  const weeks = [];

  let days = [];

  // console.log(daysInMonth)
  for (let i = 0; i < startDay; i = i + 1) {
    days.push({
      day: '',
      weekday: days.length,
    });
  }

  for (let i = 1; i <= daysInMonth; i = i + 1) {
    days.push({
      day: i,
      weekday: days.length,
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
    position: _month.headerSpaceRequired || direction === 'horizontal' ? 'relative' : 'absolute',
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

  const yyyymm = formatMonthYear({ year, month });
  return (
    <>
      <div className={classNames.MONTH}>
        <div className={classNames.MONTH_TITLE} style={hdrStyle}>
          {yyyymm}
        </div>

        {direction === 'horizontal' && weekdays}

        {weeks.map((days, i) => (
          <ul className={classNames.WEEK}>
            {days.map((e) => {
              const disabled = isDisabled(new Date(year, month, e.day));

              const dayClassName = [classNames.DAY, disabled && classNames.DAY_DISABLED, weekdayClassNames[e.weekday]]
                .filter(identity)
                .join(' ');

              return <li className={dayClassName}> {e.day} </li>;
            })}
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

function useCalendar({ classNames, formatDay, formatMonthYear, direction, weekdays, minDate, maxDate }) {
  console.log({
    minDate,
    maxDate,
  });
  const isDisabled = (date) => {
    if (minDate < date && date < maxDate) {
      return false;
    }
    return true;
  };
  return useMemo(() => {
    const opt = { classNames, formatDay, formatMonthYear, direction, weekdays, isDisabled };

    return (month) => {
      // console.log(month);

      return Calendar(month, opt);
    };
  }, [classNames, formatDay, formatMonthYear, direction, weekdays]);
}

export default useCalendar;
