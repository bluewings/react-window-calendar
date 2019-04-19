import * as React from 'react';
import { useMemo } from 'react';
import { CalendarStrings } from './useStrings';

function useWeekdays(classNames, { shortDays }: CalendarStrings) {
  return useMemo(() => {
    return (
      <ul className={classNames.WEEKDAYS}>
        {shortDays.map((day: string) => (
          <li>{day}</li>
        ))}
      </ul>
    );
  }, [shortDays]);
}

export default useWeekdays;
