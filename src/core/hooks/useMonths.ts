import { useMemo } from 'react';
import { differenceInMonths, getYear, getMonth, addMonths, startOfMonth, getDay, getDaysInMonth } from 'date-fns';
import { getDateIndex } from './useCalendar';

// const DateFixed = (() => {
//   const timezoneOffset = new Date().getTimezoneOffset();
//   return (...args: any[]): Date => {
//     // @ts-ignore
//     const date = new Date(...args);
//     const offsetDiff = timezoneOffset - date.getTimezoneOffset();
//     if (offsetDiff) {
//       date.setMinutes(date.getMinutes() + offsetDiff);
//     }
//     return date;
//   };
// })();

type MonthInfo = {
  year: number;
  month: number;
  startDay: number;
  daysInMonth: number;
  firstDateIndex: number;
  monthIndex: number;
  numOfWeeks: number;
  headerSpaceRequired: boolean;
};

function useMonths(min: Date, max: Date): [MonthInfo[], Function] {
  return useMemo(() => {
    const numOfMonths = differenceInMonths(max, min) + 1;
    const baseMonth = new Date(getYear(min), getMonth(min), 15);
    const months: MonthInfo[] = [...Array(numOfMonths)].map((e, i) => {
      const currMonth = addMonths(baseMonth, i);
      const year = getYear(currMonth);
      const month = getMonth(currMonth);
      const firstDay = startOfMonth(currMonth);
      const startDay = getDay(firstDay);
      const daysInMonth = getDaysInMonth(currMonth);
      const numOfWeeks = Math.ceil((startDay + daysInMonth) / 7);
      const headerSpaceRequired = startDay < 3;
      const firstDateIndex = getDateIndex(firstDay);
      return {
        date: new Date(year, month),
        year,
        month,
        startDay,
        daysInMonth,
        firstDateIndex,
        monthIndex: i,
        numOfWeeks,
        headerSpaceRequired,
      };
    });
    const monthDict: any = months.reduce(
      (accum, curr) => ({
        ...accum,
        [curr.firstDateIndex]: curr,
      }),
      {},
    );
    // console.log(monthDict);
    // const

    // console.log(
    const keys = Object.keys(monthDict)
      .map((e) => parseInt(e, 10))
      .sort();

    const minIndex = keys[0];
    const [maxIndex] = keys.slice(-1);

    // console.log({ minIndex, maxIndex });

    // console;

    const getTargetMonth = (date: Date) => {
      let index = getDateIndex(startOfMonth(date));
      // console.log({ minIndex, index, maxIndex });
      index = Math.min(Math.max(index, minIndex), maxIndex);
      // console.log(index);

      // if (index < minIndex) {
      //   return
      // }

      // // let

      // console.log(index)

      // console.log(monthDict.length);

      // const indexc
      // console
      return monthDict[index];
    };
    return [months, getTargetMonth];
  }, [min, max]);
}

export default useMonths;
