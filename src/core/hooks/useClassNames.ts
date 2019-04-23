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
  WEEKDAYS: 'rwc-weekdays',
  CALENDAR: 'rwc-calendar',
  MONTH_TITLE: 'rwc-month-title',
  MONTH_OVERLAY: 'rwc-month-overlay',
  MONTH: 'rwc-month',
  WEEK: 'rwc-week',
  DAY: 'rwc-day',
  HORIZONTAL: 'rwc-horizontal',
  VERTICAL: 'rwc-vertical',
  CELL: 'rwc-cell',
  DAY_DISABLED: 'rwc-day-disabled',
  DAY_ENABLED: 'rwc-day-enabled',
  DAY_TODAY: 'rwc-day-today',
  DAY_SELECTED: 'rwc-day-selected',
  DAY_SELECTED_START: 'rwc-day-selected-start',
  DAY_SELECTED_END: 'rwc-day-selected-end',
  WEEKDAY_SUN: 'rwc-weekday-sun',
  WEEKDAY_MON: 'rwc-weekday-mon',
  WEEKDAY_TUE: 'rwc-weekday-tue',
  WEEKDAY_WED: 'rwc-weekday-wed',
  WEEKDAY_THU: 'rwc-weekday-thu',
  WEEKDAY_FRI: 'rwc-weekday-fri',
  WEEKDAY_SAT: 'rwc-weekday-sat',

  // WEEKDAYS: 'rwc-cell',

  COL_ODD: 'rwc-col-odd',
  COL_EVEN: 'rwc-col-even',
  COL_FIRST: 'rwc-col-first',
  COL_LAST: 'rwc-col-last',

  // ROW_ODD: 'rwc-row-odd',
  ROW_ODD: 'rwc-row-odd',
  ROW_EVEN: 'rwc-row-even',
  ROW_FIRST: 'rwc-row-first',
  ROW_LAST: 'rwc-row-last',

  SECTION: 'rwc-section',

  SECTION_RIGHT: 'rwc-section-right',

  GUIDELINE: 'rwc-guideline',

  SCROLL_TOP: 'rwc-scroll-top',
  SCROLL_LEFT: 'rwc-scroll-left',
  SCROLL_RIGHT: 'rwc-scroll-right',
  SCROLL_BOTTOM: 'rwc-scroll-bottom',

  IS_SCROLLING: 'rwc-is-scrolling',
  IS_NOT_SCROLLING: 'rwc-is-not-scrolling',

  // HORIZONTAL: 'rwc-section-top',
  // ROW_EVEN: 'rwc-',
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
