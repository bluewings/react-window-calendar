import { useMemo } from 'react';
import { css } from 'emotion';
import { ClassNames } from './useClassNames';

export type ThemeFunction = (classNames: ClassNames) => StringAnyMap;

function defaultTheme(_: ClassNames, { weekdaysHeight }) {
  return css({
    position: 'relative',
    boxSizing: 'border-box',
    fontSize: 13,
    [_.WEEKDAYS]: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: 0,
      padding: 0,
      height: weekdaysHeight,
      boxSizing: 'border-box',
      borderBottom: '1px solid silver',
      '>li': {
        display: 'flex',
        flexBasis: 0,
        flexGrow: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        listStyle: 'none',
        textAlign: 'center',
        height: weekdaysHeight,
      },
    },
    [_.MONTH]: {
      border: '5px solid red',
    },
    // [_.WEEKDAYS]: {
    //   boxSizing: 'border-box',
    //   overflow: 'hidden',
    //   background: '#fff',
    // },
    // [_.MONTH]: {
    //   height: 5,
    //   background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 100%)',
    // },
    // [_.WEEK]: {
    //   height: 5,
    //   background: 'linear-gradient(to top, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 100%)',
    // },
    // [_.DAY]: {
    //   width: 5,
    //   background: 'linear-gradient(to right, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 100%)',
    // },
    // [_.CALENDAR]: {
    //   width: 5,
    //   background: 'linear-gradient(to left, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 100%)',
    // },
    // [_.SCROLL_TOP]: {
    //   [_.MONTH]: { opacity: 0 },
    // },
    // [_.SCROLL_BOTTOM]: {
    //   [_.WEEK]: { opacity: 0 },
    // },
    // [_.SCROLL_LEFT]: {
    //   [_.DAY]: { opacity: 0 },
    // },
    // [_.SCROLL_RIGHT]: {
    //   [_.CALENDAR]: { opacity: 0 },
    // },
  });
}

function useTheme(theme: ThemeFunction | undefined, classNames: ClassNames, styleProps: any) {
  const dotClassNames: any = useMemo(
    () => Object.keys(classNames).reduce((accum, key) => ({ ...accum, [key]: `.${classNames[key]}` }), {}),
    [classNames],
  );

  return useMemo(
    () =>
      [defaultTheme(dotClassNames, styleProps), theme && css(theme(dotClassNames, styleProps))]
        .filter((e) => e)
        .join(' '),
    [theme, dotClassNames, styleProps],
  );
}

export default useTheme;
