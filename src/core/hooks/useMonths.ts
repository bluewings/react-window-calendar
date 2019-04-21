import { useMemo } from 'react';
import { differenceInMonths, getYear, getMonth, addMonths, startOfMonth, getDay, getDaysInMonth } from 'date-fns';

function useMonths(min: Date, max: Date) {
  return useMemo(() => {
    const numOfMonths = differenceInMonths(max, min) + 1;
    const baseMonth = new Date(getYear(min), getMonth(min), 15);
    const months = [...Array(numOfMonths)].map((e, i) => {
      const currMonth = addMonths(baseMonth, i);
      const year = getYear(currMonth);
      const month = getMonth(currMonth);
      const startDay = getDay(startOfMonth(currMonth));
      const daysInMonth = getDaysInMonth(currMonth);
      const numOfWeeks = Math.ceil((startDay + daysInMonth) / 7);
      const headerSpaceRequired = startDay < 3;
      return {
        date: new Date(year, month),
        year,
        month,
        startDay,
        daysInMonth,
        numOfWeeks,
        headerSpaceRequired,
      };
    });
    return months;
  }, [min, max]);
}

export default useMonths;
