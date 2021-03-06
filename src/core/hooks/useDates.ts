import { useMemo } from 'react';
import { startOfMonth, endOfMonth, startOfDay } from 'date-fns';

export type DateInput = Date | string | undefined;

const DEFAULT_MIN_DATE = new Date(1970, 0);
const DEFAULT_MAX_DATE = new Date(2050, 11);

function getDate(date: DateInput, defaultValue: Date): Date {
  if (typeof date === 'string') {
    return new Date(date);
  } else if (date && date.constructor === Date) {
    return date;
  }
  return defaultValue;
}

function useDates(min: DateInput, minDate: DateInput, max: DateInput, maxDate: DateInput): Date[] {
  const _min = useMemo(() => startOfMonth(getDate(min, DEFAULT_MIN_DATE)), [min && min.toString()]);
  const _max = useMemo(() => endOfMonth(getDate(max, DEFAULT_MAX_DATE)), [max && max.toString()]);
  const _minDate = useMemo(() => startOfDay(getDate(minDate, _min)), [minDate && minDate.toString()]);
  const _maxDate = useMemo(() => startOfDay(getDate(maxDate, _max)), [maxDate && maxDate.toString()]);
  const today = useMemo(() => startOfDay(new Date()), []);
  return [_min, _minDate, _max, _maxDate, today];
}

export default useDates;
