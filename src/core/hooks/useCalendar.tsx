import * as React from 'react';
import { useMemo } from 'react';
import { startOfDay } from 'date-fns';
// import _default from 'react-window-grid/dist/components/WindowGrid/WindowGrid';
import { MonthInfo } from './useMonths';

const NUM_OF_DAYS_IN_WEEK = 7;

const identity = (e: any) => e;

const emptyArray = (size: number): any[] => new Array(size).fill((e: any) => null);

const Calendar = (
  _month: MonthInfo,
  {
    classNames,
    formatDay,
    formatMonthYear,
    direction,
    weekdays,
    isDisabled: _isDisabled,
    isEnabled: _isEnabled,
    isSelected: _isSelected,
    isToday: _isToday,
    isSelectedStart: _isSelectedStart,
    isSelectedEnd: _isSelectedEnd,
  }: {
    classNames: any;
    formatDay: Function;
    formatMonthYear: Function;
    direction: any;
    weekdays: any;
    isDisabled: Function;
    isEnabled: Function;
    isSelected: Function;
    isToday: Function;
    isSelectedStart: Function;
    isSelectedEnd: Function;
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

  const fillerCount = (NUM_OF_DAYS_IN_WEEK - ((startDay + daysInMonth) % NUM_OF_DAYS_IN_WEEK)) % NUM_OF_DAYS_IN_WEEK;

  const days = [
    ...emptyArray(startDay).map(() => ({ day: '', dateIndex: firstDateIndex - 0.5 })),
    ...emptyArray(daysInMonth).map((_, i) => ({ day: i + 1, dateIndex: firstDateIndex + i })),
    ...emptyArray(fillerCount).map(() => ({ day: '', dateIndex: firstDateIndex + daysInMonth - 0.5 })),
  ].map((day, i) => {
    const weekday = i % NUM_OF_DAYS_IN_WEEK;
    const isDisabled = _isDisabled(day);
    const isEnabled = _isEnabled(day);
    const isSelected = _isSelected(day);
    const isSelectedStart = isSelected && _isSelectedStart(day);
    const isSelectedEnd = isSelected && _isSelectedEnd(day);
    const isToday = _isToday(day);
    const className = [
      classNames.CELL,
      day.day > 0 && classNames.DAY,
      isDisabled && classNames.DAY_DISABLED,
      isEnabled && classNames.DAY_ENABLED,
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
      isEnabled,
      isSelected,
      isSelectedStart,
      isSelectedEnd,
      isToday,
    };
  });

  const weeks = emptyArray(days.length / NUM_OF_DAYS_IN_WEEK).map((_) => days.splice(0, NUM_OF_DAYS_IN_WEEK));

  // const hdrStyle = ;

  return (
    <div className={classNames.MONTH} data-year={year} data-month={month}>
      <div
        className={classNames.MONTH_TITLE}
        style={{
          position: _month.headerSpaceRequired || direction === 'horizontal' ? 'relative' : 'absolute',
        }}
      >
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
  return (date: Date) => Math.round((DateFixed(startOfDay(date)).valueOf() - baseTimestamp) / MILLISEC_PER_DAY);
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
}: {
  classNames: any;
  formatDay: any;
  formatMonthYear: any;
  direction: any;
  weekdays: any;
  minDate: Date;
  maxDate: Date;
  today: Date;
  selected: any;
  // }):  [(month: MonthInfo) => JSX.Element, (date: Date) => boolean] {
}): [(month: MonthInfo) => JSX.Element, (date: Date) => boolean] {
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

  const isEnabled = ({ day, dateIndex }: { day: any; dateIndex: number }) => {
    return !isDisabled({ dateIndex }) && day > 0;
    // return true;
  };

  const isEnabled_ = (date: Date) => {
    const dateIndex = getDateIndex(date);
    // console.log(date, dateIndex);

    return isEnabled({ day: date.getDate(), dateIndex });
    // return true;
  };

  // const isEnabled_ = ({ day, dateIndex }: { dateIndex: number }) => {
  //   return !isDisabled({ dateIndex }) && day > 0
  //   // return true;
  // };

  const isToday = ({ dateIndex }: { dateIndex: number }) => {
    return todayIndex === dateIndex;
  };

  const { indices, ranges } = selected.reduce(
    (accum: any, _e: any) => {
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

  // console.log(indices);
  // console.log(ranges);

  // console.log(_selected);
  let isSelected = (e: any) => false;
  let isSelectedStart = (e: any) => false;
  let isSelectedEnd = (e: any) => false;
  if (indices && indices.length > 0) {
    isSelected = ({ dateIndex }) => {
      return indices.find((e: number) => {
        return dateIndex === e;
      });
    };
  } else if (ranges && ranges.length > 0) {
    let _ranges = ranges.map((e: any) => {
      return e.length === 1 ? [e[0], e[0]] : e;
    });
    isSelected = ({ dateIndex }) => {
      return _ranges.find(([e1, e2]: [any, any]) => {
        return e1 <= dateIndex && dateIndex <= e2;
      });
    };

    isSelectedStart = ({ dateIndex }) => {
      return _ranges.find(([e1]: [any]) => {
        return e1 === dateIndex;
      });
    };
    isSelectedEnd = ({ dateIndex }) => {
      return _ranges.find(([e1, e2]: [any, any]) => {
        return e2 === dateIndex;
      });
    };
  }

  const calendar = useMemo(() => {
    const opt = {
      classNames,
      formatDay,
      formatMonthYear,
      direction,
      weekdays,
      isDisabled,
      isEnabled,
      isToday,
      isSelected,
      isSelectedStart,
      isSelectedEnd,
    };

    return (month: MonthInfo) => {
      // console.log(month);

      return Calendar(month, opt);
    };
  }, [
    classNames,
    formatDay,
    formatMonthYear,
    direction,
    weekdays,
    isEnabled,
    isSelected,
    isSelectedStart,
    isSelectedEnd,
  ]);

  return [calendar, isEnabled_];
}

export default useCalendar;

export { getDateIndex };
