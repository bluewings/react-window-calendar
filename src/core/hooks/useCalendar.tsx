import * as React from 'react';
import { useMemo } from 'react';
import { format } from 'date-fns';

const identity = (e) => e;

const Calendar = (_month, { classNames, formatDay, formatMonthYear, direction, weekdays, isDisabled, isToday }) => {
  const { year, month, startDay, daysInMonth, firstDateIndex } = _month;
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
      dateIndex: firstDateIndex - 0.5,
      weekday: days.length,
    });
  }

  for (let i = 1; i <= daysInMonth; i = i + 1) {
    days.push({
      day: i,
      dateIndex: firstDateIndex + i - 1,
      weekday: days.length,
    });
    if ((startDay + i) % 7 === 0 && days.length > 0) {
      weeks.push(days);
      days = [];
    }
  }

  if (days.length > 0) {
    weeks.push([
      ...days,
      ...[...Array(7 - days.length)].map((e) => ({
        day: '',

        dateIndex: firstDateIndex + daysInMonth - 0.5,
      })),
    ]);
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

  // const yyyymm = ;
  return (
    <>
      <div className={classNames.MONTH}>
        <div className={classNames.MONTH_TITLE} style={hdrStyle}>
          {formatMonthYear({ year, month })}
        </div>

        {direction === 'horizontal' && weekdays}

        {weeks.map((days, i) => (
          <ul className={classNames.WEEK}>
            {days.map((e) => {
              const { day, dateIndex, weekday } = e;
              // const disabled = isDisabled(new Date(year, month, day ));
              const disabled = isDisabled(e);
              const today = isToday(e);

              const dayClassName = [
                classNames.DAY,
                disabled && classNames.DAY_DISABLED,
                today && classNames.DAY_TODAY,
                weekdayClassNames[e.weekday],
              ]
                .filter(identity)
                .join(' ');

              return <li className={dayClassName}> {formatDay({ year, month, day, dateIndex })} </li>;
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

const getDateIndex = (() => {
  const MILLISEC_PER_DAY = 1000 * 60 * 60 * 24;
  const baseTimestamp = new Date(1970, 0, 1).valueOf();
  return (date: Date) => {
    return Math.round((date.valueOf() - baseTimestamp) / MILLISEC_PER_DAY);
  };
})();

function useCalendar({ classNames, formatDay, formatMonthYear, direction, weekdays, minDate, maxDate, today }) {
  console.log({
    minDate,
    maxDate,
  });

  const minDateIndex = getDateIndex(minDate);
  const maxDateIndex = getDateIndex(maxDate);
  const todayIndex = getDateIndex(today);
  // const maxDateIndex = getDateIndex(maxDate);

  console.log(minDateIndex, maxDateIndex);

  const isDisabled = ({ dateIndex }) => {
    if (minDateIndex <= dateIndex && dateIndex <= maxDateIndex) {
      return false;
    }
    return true;
  };

  const isToday = ({ dateIndex }) => {
    return todayIndex === dateIndex;
  };
  return useMemo(() => {
    const opt = { classNames, formatDay, formatMonthYear, direction, weekdays, isDisabled, isToday };

    return (month) => {
      // console.log(month);

      return Calendar(month, opt);
    };
  }, [classNames, formatDay, formatMonthYear, direction, weekdays]);
}

export default useCalendar;

export { getDateIndex };
