import { useMemo } from 'react';
import { differenceInMonths,
  getYear,
  getMonth,
  addMonths,
  startOfMonth,
  getDay,
  getDaysInMonth,

} from 'date-fns';

function useMonths(minDate, maxDate) {




  const numOfMonths = differenceInMonths(maxDate, minDate) + 1;

  const stdMonth = new Date(getYear(minDate), getMonth(minDate), 15);

  console.time();

  const months = [...Array(numOfMonths)].map((e, i) => {
    const aaa = addMonths(stdMonth, i);

    // const start = getDay(startOfMonth(aaa));
    const year = getYear(aaa);
    const month = getMonth(aaa);
    const startDay = getDay(startOfMonth(aaa));
    const daysInMonth = getDaysInMonth(aaa);
    const numOfWeeks = Math.ceil((startDay + daysInMonth) / 7);

    const useDivider = startDay < 3;


    return {
      year,
      month,
      startDay,
      daysInMonth,
      numOfWeeks,
      useDivider,
      // year: getYear(aaa),
      // month: getMonth(aaa),
      // startDay: getDay(startOfMonth(aaa)),
      // daysInMonth: getDaysInMonth(aaa),
      // numOfWeeks,
    }
  })


  console.log(numOfMonths, months);
  console.timeEnd();

  return months;




}

export default useMonths;
