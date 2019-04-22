import { useMemo } from 'react';

export type ClassNamesProps = {
  WEEKDAYS?: string;

  COL_ODD?: string;
  COL_EVEN?: string;
  COL_FIRST?: string;
  COL_LAST?: string;

  ROW_ODD?: string;
  ROW_EVEN?: string;
  ROW_FIRST?: string;
  ROW_LAST?: string;

  SECTION?: string;
  HORIZONTAL?: string;
  VERTICAL?: string;
  SECTION_RIGHT?: string;
  MONTH_OVERLAY?: string;
  MONTH_TITLE?: string;

  GUIDELINE?: string;
  MONTH?: string;
  DAY?: string;
  CALENDAR?: string;
  WEEK?: string;

  // [key: string]: string | StringAnyMap;
};

export type ClassNames = {
  WEEKDAYS: string;

  COL_ODD: string;
  COL_EVEN: string;
  COL_FIRST: string;
  COL_LAST: string;

  ROW_ODD: string;
  ROW_EVEN: string;
  ROW_FIRST: string;
  ROW_LAST: string;

  SECTION: string;
  HORIZONTAL: string;
  VERTICAL: string;
  SECTION_RIGHT: string;
  MONTH_OVERLAY: string;
  MONTH_TITLE: string;

  GUIDELINE: string;
  MONTH: string;
  DAY: string;
  CALENDAR: string;
  WEEK: string;

  SCROLL_TOP: string;
  SCROLL_LEFT: string;
  SCROLL_RIGHT: string;
  SCROLL_BOTTOM: string;

  IS_SCROLLING: string;
  IS_NOT_SCROLLING: string;

  [key: string]: string | StringAnyMap;
};

const CLASSNAMES = {
  WEEKDAYS: 'weekdays',
  CALENDAR: 'calendar',
  MONTH_TITLE: 'month-title',
  MONTH_OVERLAY: 'month-overlay',
  MONTH: 'month',
  WEEK: 'week',
  DAY: 'day',
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
  DAY_DISABLED: 'day-disabled',
  DAY_TODAY: 'day-today',
  DAY_SELECTED: 'day-selected',
  DAY_SELECTED_START: 'day-selected-start',
  DAY_SELECTED_END: 'day-selected-end',
  WEEKDAY_SUN: 'weekday-sun',
  WEEKDAY_MON: 'weekday-mon',
  WEEKDAY_TUE: 'weekday-tue',
  WEEKDAY_WED: 'weekday-wed',
  WEEKDAY_THU: 'weekday-thu',
  WEEKDAY_FRI: 'weekday-fri',
  WEEKDAY_SAT: 'weekday-sat',

  // WEEKDAYS: 'cell',

  COL_ODD: 'col-odd',
  COL_EVEN: 'col-even',
  COL_FIRST: 'col-first',
  COL_LAST: 'col-last',

  // ROW_ODD: 'row-odd',
  ROW_ODD: 'row-odd',
  ROW_EVEN: 'row-even',
  ROW_FIRST: 'row-first',
  ROW_LAST: 'row-last',

  SECTION: 'section',

  SECTION_RIGHT: 'section-right',

  GUIDELINE: 'guideline',

  SCROLL_TOP: 'scroll-top',
  SCROLL_LEFT: 'scroll-left',
  SCROLL_RIGHT: 'scroll-right',
  SCROLL_BOTTOM: 'scroll-bottom',

  IS_SCROLLING: 'is-scrolling',
  IS_NOT_SCROLLING: 'is-not-scrolling',

  // HORIZONTAL: 'section-top',
  // ROW_EVEN: '',
};

function useClassNames(classNames: any) {
  const hash = useMemo(() => {
    return JSON.stringify(classNames);
  }, [classNames]);

  return useMemo(() => {
    return Object.keys(classNames || {}).reduce(
      (accum, key) => {
        return {
          ...accum,
          [key]: classNames[key],
        };
      },
      { ...CLASSNAMES },
    );
    // return JSON.stringify(classNames);
  }, [hash]);
}

export default useClassNames;
