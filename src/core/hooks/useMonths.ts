import { useMemo } from 'react';
import { differenceInMonths, getYear, getMonth, addMonths, startOfMonth, getDay, getDaysInMonth } from 'date-fns';

function useMonths(minDate: Date, maxDate: Date) {
  return useMemo(() => {
    const numOfMonths = differenceInMonths(maxDate, minDate) + 1;
    const baseMonth = new Date(getYear(minDate), getMonth(minDate), 15);
    const months = [...Array(numOfMonths)].map((e, i) => {
      const currMonth = addMonths(baseMonth, i);
      const year = getYear(currMonth);
      const month = getMonth(currMonth);
      const startDay = getDay(startOfMonth(currMonth));
      const daysInMonth = getDaysInMonth(currMonth);
      const numOfWeeks = Math.ceil((startDay + daysInMonth) / 7);
      const headerSpaceRequired = startDay < 3;
      return {
        year,
        month,
        startDay,
        daysInMonth,
        numOfWeeks,
        headerSpaceRequired,
      };
    });
    return months;
  }, [minDate, maxDate]);
}

export default useMonths;
