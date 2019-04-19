import { useMemo } from 'react';

const defaultStrings = {
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
};

function useStrings(strings: any) {
  return useMemo(
    () =>
      Object.keys(defaultStrings).reduce((accum, key) => {
        // @ts-ignore
        let values: string[] = [...defaultStrings[key]];
        if (strings && Array.isArray(strings[key])) {
          values = [...strings[key], ...values.slice(strings[key].length)];
        }
        return { ...accum, [key]: values };
      }, {}),
    [strings],
  );
}

export default useStrings;
