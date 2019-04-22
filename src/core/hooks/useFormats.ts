import { useMemo } from 'react';
import { format } from 'date-fns';

interface IFormatDay {
  (
    { year, month, day, dateIndex }: { year: number; month: number; day: number; dateIndex: number },
    strings?: any,
  ): string;
}

interface IFormatMonthDayYear {
  (
    { year, month, day, dateIndex }: { year: number; month: number; day: number; dateIndex: number },
    strings?: any,
  ): string;
}

interface IFormatMonthYear {
  ({ year, month }: { year: number; month: number }, strings?: any): string;
}

interface IFormatYear {
  ({ year }: { year: number }, strings?: any): string;
}

const formatDay: IFormatDay = ({ year, month, day, dateIndex }, strings) => `${day}`;
// const formatDay: IFormatDay = ({ year, month, day, dateIndex }, strings) => ` ${dateIndex ? dateIndex : ''}`;
const formatMonthDayYear: IFormatMonthDayYear = ({ year, month, day }, strings) => `${day}`;
const formatMonthYear: IFormatMonthYear = ({ year, month }, strings) => `${strings.shortMonths[month]} ${year}`;
const formatYear: IFormatYear = ({ year }, strings) => `${year}`;

const defaultFormats = {
  formatDay,
  formatMonthDayYear,
  formatMonthYear,
  formatYear,
};

function useFormat(customFormat: Function | string, defaultFormat: Function, strings: any): any {
  return useMemo(() => {
    let formatFunc = defaultFormat;
    if (typeof customFormat === 'function') {
      formatFunc = customFormat;
    } else if (typeof customFormat === 'string' && customFormat.trim()) {
      formatFunc = (_: any) =>
        format(new Date(_.year, _.month || 0, typeof _.day === 'undefined' ? 1 : _.day), customFormat);
    }
    return (data: any) => formatFunc(data, strings);
  }, [customFormat, defaultFormat, strings]);
}

function useFormats(
  formatDay: IFormatDay | string,
  formatMonthDayYear: IFormatMonthDayYear | string,
  formatMonthYear: IFormatMonthYear | string,
  formatYear: IFormatYear | string,
  strings: any,
): [IFormatDay, IFormatMonthDayYear, IFormatMonthYear, IFormatYear] {
  return [
    useFormat(formatDay, defaultFormats.formatDay, strings),
    useFormat(formatMonthDayYear, defaultFormats.formatMonthDayYear, strings),
    useFormat(formatMonthYear, defaultFormats.formatMonthYear, strings),
    useFormat(formatYear, defaultFormats.formatYear, strings),
  ];
}

export default useFormats;
