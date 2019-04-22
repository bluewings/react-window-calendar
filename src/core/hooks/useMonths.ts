import { useMemo } from 'react';
import { differenceInMonths, getYear, getMonth, addMonths, startOfMonth, getDay, getDaysInMonth } from 'date-fns';

function useMonths(min: Date, max: Date) {
  const MILLISEC_PER_DAY = 1000 * 60 * 60 * 24;
  return useMemo(() => {
    const numOfMonths = differenceInMonths(max, min) + 1;
    const baseTimestamp = new Date(1970, 0, 1).valueOf();
    const baseMonth = new Date(getYear(min), getMonth(min), 15);
    const months = [...Array(numOfMonths)].map((e, i) => {
      const currMonth = addMonths(baseMonth, i);
      const year = getYear(currMonth);
      const month = getMonth(currMonth);
      const firstDay = startOfMonth(currMonth);
      const startDay = getDay(firstDay);
      const daysInMonth = getDaysInMonth(currMonth);
      const numOfWeeks = Math.ceil((startDay + daysInMonth) / 7);
      const headerSpaceRequired = startDay < 3;
      const firstDayIndex = Math.round((firstDay.valueOf() - baseTimestamp) / MILLISEC_PER_DAY);
      return {
        date: new Date(year, month),
        year,
        month,
        startDay,
        daysInMonth,
        firstDayIndex,
        numOfWeeks,
        headerSpaceRequired,
      };
    });
    return months;
  }, [min, max]);
}

export default useMonths;
