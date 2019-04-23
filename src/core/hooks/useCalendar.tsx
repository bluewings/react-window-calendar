import * as React from 'react';
import { useMemo } from 'react';
import { startOfDay } from 'date-fns';
import _default from 'react-window-grid/dist/components/WindowGrid/WindowGrid';

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
    isSelectedStart: _isSelectedStart,
    isSelectedEnd: _isSelectedEnd,
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
    const isSelectedStart = isSelected && _isSelectedStart(day);
    const isSelectedEnd = isSelected && _isSelectedEnd(day);
    const isToday = _isToday(day);
    const className = [
      classNames.DAY,
      isDisabled && classNames.DAY_DISABLED,
      isToday && classNames.DAY_TODAY,
      isSelected && classNames.DAY_SELECTED,
      isSelectedStart && classNames.DAY_SELECTED_START,
      isSelectedEnd && classNames.DAY_SELECTED_END,
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
      isSelectedStart,
      isSelectedEnd,
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
              <div>{formatDay({ year, month, day, dateIndex })}</div>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
};

const DateFixed = (() => {
  const timezoneOffset = new Date().getTimezoneOffset();
  return (date: Date): Date => {
    const offsetDiff = timezoneOffset - date.getTimezoneOffset();
    if (offsetDiff) {
      const newDate = new Date(date);
      newDate.setMinutes(newDate.getMinutes() + offsetDiff);
      return newDate;
    }
    return date;
  };
})();

const getDateIndex = (() => {
  const MILLISEC_PER_DAY = 1000 * 60 * 60 * 24;
  const baseTimestamp = DateFixed(new Date(1970, 0, 1)).valueOf();
  return (date: Date) => (DateFixed(startOfDay(date)).valueOf() - baseTimestamp) / MILLISEC_PER_DAY;
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

  const { indices, ranges } = selected.reduce(
    (accum, _e) => {
      if (Array.isArray(_e)) {
        // if (e.length === 2) {

        // let _ranges =

        // let tmp = e.length === 1
        let e = _e.length === 1 ? [_e[0], _e[0]] : _e;
        return {
          ...accum,
          ranges: [...accum.ranges, [getDateIndex(e[0]), getDateIndex(e[1])]],
        };
        // }
        // return accum;
      }
      return {
        ...accum,
        indices: [...accum.indices, getDateIndex(_e)],
      };

      // return accum;
    },
    {
      indices: [],
      ranges: [],
    },
  );

  console.log(indices);
  console.log(ranges);

  // console.log(_selected);
  let isSelected = (e: any) => false;
  let isSelectedStart = (e: any) => false;
  let isSelectedEnd = (e: any) => false;
  if (indices && indices.length > 0) {
    isSelected = ({ dateIndex }) => {
      return indices.find((e) => {
        return dateIndex === e;
      });
    };
  } else if (ranges && ranges.length > 0) {
    let _ranges = ranges.map((e) => {
      return e.length === 1 ? [e[0], e[0]] : e;
    });
    isSelected = ({ dateIndex }) => {
      return _ranges.find(([e1, e2]) => {
        return e1 <= dateIndex && dateIndex <= e2;
      });
    };

    isSelectedStart = ({ dateIndex }) => {
      return _ranges.find(([e1]) => {
        return e1 === dateIndex;
      });
    };
    isSelectedEnd = ({ dateIndex }) => {
      return _ranges.find(([e1, e2]) => {
        return e2 === dateIndex;
      });
    };
  }

  return useMemo(() => {
    const opt = {
      classNames,
      formatDay,
      formatMonthYear,
      direction,
      weekdays,
      isDisabled,
      isToday,
      isSelected,
      isSelectedStart,
      isSelectedEnd,
    };

    return (month) => {
      // console.log(month);

      return Calendar(month, opt);
    };
  }, [classNames, formatDay, formatMonthYear, direction, weekdays, isSelected, isSelectedStart, isSelectedEnd]);
}

export default useCalendar;

export { getDateIndex };
