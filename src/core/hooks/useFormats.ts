import { useMemo } from 'react';
import { format } from 'date-fns';

const defaultFormats = {
  formatDay: (date, strings) => {
    return '?';
  },
  formatMonthDayYear: (date, strings) => {
    return date;
  },
  formatMonthYear: (date: Date, strings: any) => `${strings.shortMonths[date.getMonth()]} ${date.getFullYear()}`,
  formatYear: (date: Date, strings: any) => date.getFullYear(),
};

function useFormat(customFormat, defaultFormat, strings) {
  return useMemo(() => {
    let formatFunc = defaultFormat;
    if (typeof customFormat === 'function') {
      formatFunc = customFormat;
    } else if (typeof customFormat === 'string' && customFormat.trim()) {
      formatFunc = (date: Date) => format(date, customFormat);
    }
    return (date: Date) => formatFunc(date, strings);
  }, [customFormat, defaultFormat, strings]);
}

function useFormats(
  formatDay: Function | string,
  formatMonthDayYear: Function | string,
  formatMonthYear: Function | string,
  formatYear: Function | string,
  strings: any,
) {
  return [
    useFormat(formatDay, defaultFormats.formatDay, strings),
    useFormat(formatMonthDayYear, defaultFormats.formatMonthDayYear, strings),
    useFormat(formatMonthYear, defaultFormats.formatMonthYear, strings),
    useFormat(formatYear, defaultFormats.formatYear, strings),
  ];

  // useMemo(() => {
  //   return (date) => {

  //     return formatDay(date, strings);
}

export default useFormats;
