import * as React from 'react';
import { useMemo } from 'react';
import { startOfDay } from 'date-fns';

const NUM_OF_DAYS_IN_WEEK = 7;

const identity = (e: any) => e;

const emptyArray = (size: number): any[] => new Array(size).fill((e: any) => null);

const Calendar = (
  _month,
  {
    classNames,
    formatDay,
    formatMonthYear,
    direction,
    weekdays,
    isDisabled: _isDisabled,
    isSelected: _isSelected,
    isToday: _isToday,
  },
) => {
  const { year, month, startDay, daysInMonth, firstDateIndex } = _month;
  const weekdayClassNames = [
    classNames.WEEKDAY_SUN,
    classNames.WEEKDAY_MON,
    classNames.WEEKDAY_TUE,
    classNames.WEEKDAY_WED,
    classNames.WEEKDAY_THU,
    classNames.WEEKDAY_FRI,
    classNames.WEEKDAY_SAT,
  ];

  const hdrStyle = {
    position: _month.headerSpaceRequired || direction === 'horizontal' ? 'relative' : 'absolute',
  };

  const fillerCount = (NUM_OF_DAYS_IN_WEEK - ((startDay + daysInMonth) % NUM_OF_DAYS_IN_WEEK)) % NUM_OF_DAYS_IN_WEEK;

  const days = [
    ...emptyArray(startDay).map(() => ({ day: '', dateIndex: firstDateIndex - 0.5 })),
    ...emptyArray(daysInMonth).map((_, i) => ({ day: i + 1, dateIndex: firstDateIndex + i })),
    ...emptyArray(fillerCount).map(() => ({ day: '', dateIndex: firstDateIndex + daysInMonth - 0.5 })),
  ].map((day, i) => {
    const weekday = i % NUM_OF_DAYS_IN_WEEK;
    const isDisabled = _isDisabled(day);
    const isSelected = _isSelected(day);
    const isToday = _isToday(day);
    const className = [
      classNames.DAY,
      isDisabled && classNames.DAY_DISABLED,
      isToday && classNames.DAY_TODAY,
      isSelected && classNames.DAY_SELECTED,
      weekdayClassNames[weekday],
    ]
      .filter(identity)
      .join(' ');
    return {
      ...day,
      weekday,
      className,
      isDisabled,
      isSelected,
      isToday,
    };
  });

  const weeks = emptyArray(days.length / NUM_OF_DAYS_IN_WEEK).map((_) => days.splice(0, NUM_OF_DAYS_IN_WEEK));

  return (
    <div className={classNames.MONTH} data-year={year} data-month={month}>
      <div className={classNames.MONTH_TITLE} style={hdrStyle}>
        {formatMonthYear({ year, month })}
      </div>

      {direction === 'horizontal' && weekdays}

      {weeks.map((days, i) => (
        <ul className={classNames.WEEK}>
          {days.map(({ day, dateIndex, className }) => (
            <li className={className} data-day={day}>
              {formatDay({ year, month, day, dateIndex })}
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
};

const getDateIndex = (() => {
  const MILLISEC_PER_DAY = 1000 * 60 * 60 * 24;
  const baseTimestamp = new Date(1970, 0, 1).valueOf();
  return (date: Date) => Math.round((startOfDay(date).valueOf() - baseTimestamp) / MILLISEC_PER_DAY);
})();

function useCalendar({
  classNames,
  formatDay,
  formatMonthYear,
  direction,
  weekdays,
  minDate,
  maxDate,
  today,
  selected,
}) {
  // console.log({
  //   minDate,
  //   maxDate,
  // });

  const minDateIndex = getDateIndex(minDate);
  const maxDateIndex = getDateIndex(maxDate);
  const todayIndex = getDateIndex(today);

  const isDisabled = ({ dateIndex }: { dateIndex: number }) => {
    if (minDateIndex <= dateIndex && dateIndex <= maxDateIndex) {
      return false;
    }
    return true;
  };

  const isToday = ({ dateIndex }: { dateIndex: number }) => {
    return todayIndex === dateIndex;
  };

  const selectedIndices = selected.map((e: any) => getDateIndex(e));

  // console.log(_selected);
  let isSelected = (e: any) => false;
  if (selectedIndices && selectedIndices.length > 0) {
    isSelected = ({ dateIndex }) => {
      return selectedIndices.find((e) => {
        return dateIndex === e;
      });
    };
  }

  return useMemo(() => {
    const opt = { classNames, formatDay, formatMonthYear, direction, weekdays, isDisabled, isToday, isSelected };

    return (month) => {
      // console.log(month);

      return Calendar(month, opt);
    };
  }, [classNames, formatDay, formatMonthYear, direction, weekdays, isSelected]);
}

export default useCalendar;

export { getDateIndex };
